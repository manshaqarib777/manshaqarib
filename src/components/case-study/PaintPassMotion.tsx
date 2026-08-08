"use client";

import { useEffect } from "react";

/**
 * Drives the paint pass in the product-story section.
 *
 * The section's idea is a single render head sweeping the stage: everything
 * above it is painted, everything below it is layout without paint. This
 * component owns exactly one number per beat — `--paint`, the head's offset into
 * that beat in pixels — plus `--lit`, which is 1 only while the head is inside
 * it. The stylesheet decides what to do with them: `.paint-veil` is clipped to
 * start at `--paint` and `.paint-head` is positioned at it. Nothing here touches
 * a style property directly, which is the same split the rest of this build uses
 * for its pointer effects.
 *
 * A sibling with no markup of its own, for the reason `HomeMotion` is one:
 * the section stays a server component and ships in the initial HTML, and this
 * is the only piece of it that needs JavaScript.
 *
 * Three details are deliberate:
 *
 *  - The read runs on a rAF loop rather than a scroll listener. Lenis drives
 *    scrolling from `gsap.ticker`, so a scroll handler can land a frame behind
 *    the position it is measuring — which reads as the head lagging the page.
 *  - The loop only runs while the stage is near the viewport, gated by an
 *    IntersectionObserver, so an idle page pays nothing.
 *  - Every rect is read before any variable is written. Positioning the head
 *    writes `top`, so interleaving the two would invalidate layout between reads.
 *
 * Under reduced motion this never starts, and the stylesheet removes the veil
 * outright — the section's end state is simply a painted one.
 */

/** Where the head sits in the viewport, as a fraction of its height. */
const HEAD = 0.52;

export function PaintPassMotion() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".paint-stage");
    if (!stage) return;

    const beats = [...stage.querySelectorAll<HTMLElement>(".paint-beat")];
    if (!beats.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const write = () => {
      const head = window.innerHeight * HEAD;
      const measured = beats.map((beat) => {
        const { top, height } = beat.getBoundingClientRect();
        return Math.min(Math.max(head - top, 0), height) / (height || 1);
      });

      measured.forEach((progress, index) => {
        const beat = beats[index];
        // A percentage rather than a pixel offset: `clip-path: inset()` and
        // `top` both resolve it against the beat's own height, so the value
        // stays correct if the beat reflows between a read and a paint.
        beat.style.setProperty("--paint", `${(progress * 100).toFixed(3)}%`);
        beat.style.setProperty("--lit", progress > 0 && progress < 1 ? "1" : "0");
      });
    };

    const loop = () => {
      write();
      frame = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!frame) loop();
          return;
        }
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
          // One last pass so a beat left mid-paint settles at its end state
          // rather than freezing part-painted off screen.
          write();
        }
      },
      { rootMargin: "25% 0px" },
    );

    observer.observe(stage);
    write();

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
