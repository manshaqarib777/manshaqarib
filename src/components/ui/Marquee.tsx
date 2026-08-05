"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. */
  speed?: number;
  reverse?: boolean;
  /** Scroll velocity nudges the marquee's speed for a hand-made feel. */
  scrollReactive?: boolean;
  className?: string;
  itemClassName?: string;
}

/**
 * Infinite horizontal marquee.
 *
 * The track holds two identical copies of the content and translates by exactly
 * -50%, so the seam always lands on a duplicate and never shows. The duplicate
 * is `aria-hidden` so screen readers read the list once.
 *
 * With `scrollReactive`, page scroll modulates the playback rate: scrolling down
 * speeds the marquee up, scrolling up slows or reverses it. That coupling is what
 * makes it feel connected to the page rather than decorative.
 */
export function Marquee({
  children,
  speed = 34,
  reverse = false,
  scrollReactive = true,
  className,
  itemClassName,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || prefersReducedMotion) return;

      const tween = gsap.to(track, {
        xPercent: reverse ? 50 : -50,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      if (reverse) gsap.set(track, { xPercent: -50 });
      if (!scrollReactive) return () => tween.kill();

      let lastY = window.scrollY;
      let raf = 0;

      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const delta = window.scrollY - lastY;
          lastY = window.scrollY;
          // Clamped so a fling never sends the track flying.
          const boost = gsap.utils.clamp(-3, 6, 1 + Math.abs(delta) * 0.06);
          gsap.to(tween, {
            timeScale: boost,
            duration: 0.4,
            overwrite: true,
            onComplete: () => {
              gsap.to(tween, { timeScale: 1, duration: 1.2 });
            },
          });
          raf = 0;
        });
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        if (raf) cancelAnimationFrame(raf);
        tween.kill();
      };
    },
    { dependencies: [speed, reverse, scrollReactive, prefersReducedMotion] },
  );

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        // Fade the marquee into the page at both edges.
        "[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div className={cn("flex shrink-0", itemClassName)}>{children}</div>
        <div className={cn("flex shrink-0", itemClassName)} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
