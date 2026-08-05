"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useMediaQuery";

/**
 * A sentence that brightens word by word as it passes through the viewport.
 *
 * The words are real text nodes in the server-rendered HTML, so the sentence is
 * readable — and selectable — before any JS runs. The tween only touches
 * opacity; under reduced motion it never runs and CSS leaves every word at full
 * strength.
 */
export function ScrubLine({ text }: { text: string }) {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion) return;

      const words = root.querySelectorAll<HTMLSpanElement>(".scrub-word");
      if (!words.length) return;

      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 1,
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.4,
        },
      });
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true },
  );

  return (
    <p className="scrub-line" ref={rootRef}>
      {/* `aria-label` is not honoured on a <p>, so the intact sentence is
          exposed as real (visually hidden) text and the split words — which are
          only a rendering trick — are hidden from assistive tech. */}
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, index) => (
        <span className="scrub-word" key={`${word}-${index}`} aria-hidden="true">
          {word}
        </span>
      ))}
    </p>
  );
}
