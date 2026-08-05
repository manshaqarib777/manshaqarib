"use client";

import { useRef, type ElementType } from "react";
import type { PolymorphicTag } from "@/types/polymorphic";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { splitText, type SplitGranularity } from "@/animations/splitText";
import { DURATION, EASE, STAGGER } from "@/constants/motion";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  /** Plain text — required so the element can carry an accessible label. */
  children: string;
  /** Use a heading element when `granularity="chars"` (see the a11y note). */
  as?: ElementType;
  granularity?: SplitGranularity;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Scroll-triggered by default; set false to play on mount. */
  onScroll?: boolean;
  /**
   * Gate for mount-time reveals — the hero uses this so its timeline starts on
   * the preloader hand-off rather than on hydration.
   */
  play?: boolean;
  start?: string;
  /** Forwarded to the rendered element, for `aria-labelledby` wiring. */
  id?: string;
}

/**
 * Split-text reveal: lines, words or characters rising into a mask.
 *
 * Accessibility — character splitting produces one span per glyph, which some
 * screen readers spell out. In `chars` mode the original string is exposed as an
 * `aria-label` on the outer element and the split spans are hidden from the
 * accessibility tree, so assistive tech reads one clean phrase. Because
 * `aria-label` is only honoured on elements with a role, `chars` mode should be
 * used on headings (or another semantic element), not a bare `div`. Line and
 * word splitting need no such treatment — readers handle word spans correctly.
 *
 * Resize — the split is rebuilt on `ScrollTrigger.refreshInit`, since line
 * breaks move with the viewport and stale line masks would clip mid-word.
 */
export function TextReveal({
  children,
  as = "div",
  granularity = "lines",
  className,
  delay = 0,
  stagger,
  duration = DURATION.base,
  onScroll = true,
  play = true,
  start = "top 84%",
  id,
}: TextRevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const hideFromScreenReaders = granularity === "chars";
  const Tag = as as unknown as PolymorphicTag;

  useGSAP(
    () => {
      const root = rootRef.current;
      const text = textRef.current;
      if (!root || !text || !play) return;

      // Reduced motion: leave the DOM untouched, no split, nothing to animate.
      if (prefersReducedMotion) return;

      let split = splitText(text, granularity);

      const build = () =>
        gsap.from(split.targets, {
          yPercent: 118,
          // Lines rely purely on the mask; smaller pieces also fade.
          autoAlpha: granularity === "lines" ? 1 : 0,
          duration,
          delay,
          stagger:
            stagger ??
            (granularity === "chars"
              ? STAGGER.chars
              : granularity === "words"
                ? STAGGER.words
                : STAGGER.lines),
          ease: EASE.out,
          scrollTrigger: onScroll
            ? { trigger: root, start, once: true }
            : undefined,
        });

      let tween = build();

      const onRefreshInit = () => {
        tween.kill();
        split.revert();
        split = splitText(text, granularity);
        tween = build();
      };

      ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
        tween.kill();
        split.revert();
      };
    },
    {
      dependencies: [play, prefersReducedMotion, granularity],
      revertOnUpdate: true,
    },
  );

  return (
    <Tag
      ref={rootRef}
      id={id}
      className={cn(className)}
      aria-label={hideFromScreenReaders ? children : undefined}
    >
      <span
        ref={textRef}
        aria-hidden={hideFromScreenReaders ? "true" : undefined}
      >
        {children}
      </span>
    </Tag>
  );
}
