"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { clamp } from "@/lib/utils";

interface SmoothScrollContextValue {
  /** 0 → 1 progress through the whole document. */
  progress: number;
  /** Scroll velocity in px/frame; negative when scrolling up. */
  velocityRef: React.RefObject<number>;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used inside <SmoothScrollProvider>");
  }
  return context;
}

/**
 * Owns the single Lenis instance for the app and marries it to GSAP.
 *
 * Two details matter here:
 *  1. Lenis' own RAF loop is disabled (`autoRaf: false`) and driven from
 *     `gsap.ticker` instead, so scroll and ScrollTrigger run on one clock. Two
 *     loops would produce sub-frame drift and visible jitter on pinned sections.
 *  2. With `prefers-reduced-motion` we never construct Lenis at all — the user
 *     gets native scrolling, and ScrollTrigger keeps working untouched.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const velocityRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? clamp(window.scrollY / max) : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.15,
      // Exponential ease-out: immediate response, long soft tail.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    const onLenisScroll = ({
      progress: p,
      velocity,
    }: {
      progress: number;
      velocity: number;
    }) => {
      velocityRef.current = velocity;
      setProgress(clamp(p));
      ScrollTrigger.update();
    };

    lenis.on("scroll", onLenisScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    // Prevents GSAP from clamping delta time after a long frame, which would
    // otherwise make Lenis jump on tab refocus.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, offset = 0) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset,
          duration: 1.4,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
        return;
      }

      // Reduced-motion / no-Lenis fallback.
      const node =
        typeof target === "string" ? document.querySelector(target) : target;
      if (typeof target === "number") {
        window.scrollTo({ top: target + offset });
      } else if (node instanceof HTMLElement) {
        window.scrollTo({ top: node.offsetTop + offset });
      }
    },
    [],
  );

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  const value = useMemo<SmoothScrollContextValue>(
    () => ({ progress, velocityRef, scrollTo, stop, start }),
    [progress, scrollTo, stop, start],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
