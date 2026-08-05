"use client";

import { useSmoothScroll } from "@/providers";
import { useLoading } from "@/providers";

/**
 * Hairline reading-progress bar pinned to the top of the viewport.
 *
 * Driven by a CSS transform from the scroll provider's already-computed
 * progress value — no extra scroll listener, and no layout on any frame.
 */
export function ScrollProgress() {
  const { progress } = useSmoothScroll();
  const { isLoading } = useLoading();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-px"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-accent-500 via-accent-300 to-ember-400 transition-opacity duration-700"
        style={{
          transform: `scaleX(${progress})`,
          opacity: isLoading ? 0 : 1,
        }}
      />
    </div>
  );
}
