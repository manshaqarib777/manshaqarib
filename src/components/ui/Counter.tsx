"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Scroll-triggered number count-up.
 *
 * The tween drives a plain object and writes the rounded result to React state
 * once per frame. Tweening the DOM text directly would be marginally cheaper but
 * would put GSAP and React in conflict over the same text node.
 *
 * `tabular-nums` is essential: without it the number's width changes on every
 * frame and the surrounding layout jitters for the whole count.
 */
export function Counter({
  value,
  prefix,
  suffix,
  duration = 2,
  className,
}: CounterProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        setDisplayed(value);
        return;
      }

      const proxy = { value: 0 };
      gsap.to(proxy, {
        value,
        duration,
        ease: "power2.out",
        onUpdate: () => setDisplayed(Math.round(proxy.value)),
        scrollTrigger: { trigger: rootRef.current, start: "top 88%", once: true },
      });
    },
    { dependencies: [value, prefersReducedMotion] },
  );

  return (
    <span ref={rootRef} className={cn("tabular-nums", className)}>
      {prefix}
      {/* Grouped separators: a raw "100000" is unreadable at display size. */}
      {displayed.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
