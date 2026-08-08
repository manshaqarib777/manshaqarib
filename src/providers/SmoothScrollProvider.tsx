"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface SmoothScrollContextValue {
  /** Pause the scroll — used while a full-screen overlay is up. */
  stop: () => void;
  /** Resume it. */
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(
  null,
);

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error(
      "useSmoothScroll must be used inside <SmoothScrollProvider>",
    );
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
 *
 * The context deliberately exposes nothing but `stop`/`start`. It used to also
 * publish scroll progress and velocity, which meant a React state update on
 * every scroll frame — a re-render of the provider and every consumer, once per
 * frame, for values that had no readers left. Anything that needs the scroll
 * position reads it from ScrollTrigger, which is already measuring it.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      // 0.7, down from 1.15. Every frame of the glide costs a `window.scrollTo`
      // and a `ScrollTrigger.update()`, so a long tail keeps the whole page
      // painting well after the gesture ends — measured at ~40% of frames over
      // 32ms while scrolling, against 27% with Lenis out entirely. Shortening
      // the tail keeps the smoothing but stops paying for it as long.
      duration: 0.7,
      // Exponential ease-out: immediate response, long soft tail.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    const onLenisScroll = () => ScrollTrigger.update();
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

  // Stable across the provider's life, so consumers never re-render for this.
  const value = useMemo<SmoothScrollContextValue>(
    () => ({
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
