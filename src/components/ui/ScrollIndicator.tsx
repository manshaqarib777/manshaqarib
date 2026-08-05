"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  className?: string;
  label?: string;
}

/**
 * Hero scroll cue: a hairline rail with a dot that falls down it on a loop, and
 * fades away for good once the visitor has scrolled — the hint has done its job
 * and shouldn't linger.
 */
export function ScrollIndicator({
  className,
  label = "Scroll",
}: ScrollIndicatorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const loop = gsap.fromTo(
        dotRef.current,
        { yPercent: -120, autoAlpha: 0 },
        {
          yPercent: 320,
          autoAlpha: 1,
          duration: 1.9,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 0.35,
          // Fade back out at the end of each pass rather than snapping.
          onRepeat: () => gsap.set(dotRef.current, { autoAlpha: 0 }),
        },
      );

      const fade = gsap.to(rootRef.current, {
        autoAlpha: 0,
        y: 12,
        duration: 0.6,
        scrollTrigger: { start: 60, end: 220, scrub: true },
      });

      return () => {
        loop.kill();
        fade.kill();
      };
    },
    { dependencies: [prefersReducedMotion] },
  );

  return (
    <div
      ref={rootRef}
      className={cn("flex flex-col items-center gap-4", className)}
      aria-hidden="true"
    >
      <span className="label-meta [writing-mode:vertical-rl] tracking-[0.32em]">
        {label}
      </span>
      <span className="relative block h-16 w-px overflow-hidden bg-white/12">
        <span
          ref={dotRef}
          className="absolute left-0 top-0 block h-4 w-px bg-white/80"
        />
      </span>
    </div>
  );
}
