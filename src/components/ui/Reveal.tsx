"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import type { PolymorphicTag } from "@/types/polymorphic";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE } from "@/constants/motion";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade"
  | "scale"
  | "rotate"
  | "clip-up"
  | "clip-left";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  start?: string;
  /**
   * Selector for children to stagger. When omitted the wrapper itself animates
   * as a single unit.
   */
  stagger?: { selector: string; amount?: number };
  play?: boolean;
}

/** The `from` state for each variant. */
const VARIANTS: Record<RevealVariant, gsap.TweenVars> = {
  "fade-up": { y: 40, autoAlpha: 0 },
  "fade-down": { y: -40, autoAlpha: 0 },
  fade: { autoAlpha: 0 },
  scale: { scale: 0.92, autoAlpha: 0, transformOrigin: "50% 60%" },
  rotate: { rotate: -3.5, y: 48, autoAlpha: 0, transformOrigin: "0% 100%" },
  "clip-up": { clipPath: "inset(100% 0% 0% 0%)" },
  "clip-left": { clipPath: "inset(0% 100% 0% 0%)" },
};

/**
 * Declarative scroll reveal. One ScrollTrigger per wrapper (not per child), so a
 * long page of staggered cards stays cheap.
 *
 * Reduced motion renders children in their final state with no trigger at all —
 * no hidden content is ever left behind if the animation is skipped.
 */
export function Reveal({
  children,
  as = "div",
  variant = "fade-up",
  className,
  delay = 0,
  duration = DURATION.base,
  distance,
  start = "top 84%",
  stagger,
  play = true,
}: RevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const Tag = as as unknown as PolymorphicTag;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !play || prefersReducedMotion) return;

      const targets = stagger
        ? Array.from(root.querySelectorAll<HTMLElement>(stagger.selector))
        : [root];

      if (!targets.length) return;

      const from = { ...VARIANTS[variant] };
      if (distance !== undefined && typeof from.y === "number") {
        // Preserve the variant's direction, override only the magnitude.
        from.y = from.y < 0 ? -distance : distance;
      }

      gsap.from(targets, {
        ...from,
        duration,
        delay,
        ease: EASE.out,
        stagger: stagger?.amount ?? 0.1,
        clearProps: "clipPath",
        scrollTrigger: { trigger: root, start, once: true },
      });
    },
    { dependencies: [play, prefersReducedMotion, variant], revertOnUpdate: true },
  );

  return (
    <Tag ref={rootRef} className={cn(className)}>
      {children}
    </Tag>
  );
}
