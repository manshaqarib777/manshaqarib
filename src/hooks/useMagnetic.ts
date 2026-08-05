"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion, useIsTouch } from "./useMediaQuery";

interface MagneticOptions {
  /** 0–1: how far the element follows the pointer across its own half-size. */
  strength?: number;
  /** Inner content moves further than the shell for a subtle parallax. */
  contentStrength?: number;
  /** Extra hit area in px around the element where the pull begins. */
  padding?: number;
}

/**
 * Magnetic hover. The element leans toward the pointer while it is inside the
 * (padded) bounds and springs back on exit.
 *
 * `gsap.quickTo` is used rather than a tween per mousemove event: it reuses one
 * tween and only updates its target value, which keeps a 60fps pointer stream
 * from allocating hundreds of tween objects.
 */
export function useMagnetic<T extends HTMLElement>({
  strength = 0.35,
  contentStrength = 0.55,
  padding = 0,
}: MagneticOptions = {}) {
  const shellRef = useRef<T | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || prefersReducedMotion || isTouch) return;

    const content = contentRef.current;
    const config = { duration: 0.5, ease: "power3.out" };

    const shellX = gsap.quickTo(shell, "x", config);
    const shellY = gsap.quickTo(shell, "y", config);
    const contentX = content ? gsap.quickTo(content, "x", config) : null;
    const contentY = content ? gsap.quickTo(content, "y", config) : null;

    const onMove = (event: PointerEvent) => {
      const bounds = shell.getBoundingClientRect();
      const relativeX = event.clientX - (bounds.left + bounds.width / 2);
      const relativeY = event.clientY - (bounds.top + bounds.height / 2);

      const withinX = Math.abs(relativeX) < bounds.width / 2 + padding;
      const withinY = Math.abs(relativeY) < bounds.height / 2 + padding;

      if (withinX && withinY) {
        shellX(relativeX * strength);
        shellY(relativeY * strength);
        contentX?.(relativeX * (contentStrength - strength));
        contentY?.(relativeY * (contentStrength - strength));
      } else {
        shellX(0);
        shellY(0);
        contentX?.(0);
        contentY?.(0);
      }
    };

    // Listening on the window (not the element) means the pull starts before the
    // pointer technically enters, which is what makes it feel magnetic.
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.killTweensOf([shell, content].filter(Boolean) as HTMLElement[]);
    };
  }, [strength, contentStrength, padding, prefersReducedMotion, isTouch]);

  return { shellRef, contentRef };
}
