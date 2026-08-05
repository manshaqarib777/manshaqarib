"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { useLoading } from "@/providers";

/**
 * Keeps ScrollTrigger's cached measurements honest.
 *
 * ScrollTrigger measures element positions once and caches them. Three things
 * invalidate those measurements without triggering a resize event, and each one
 * silently breaks every trigger below the change:
 *
 *  1. Web fonts swapping in — line counts change, so everything below reflows.
 *  2. The preloader unmounting — the page's height changes when scroll unlocks.
 *  3. Client-side navigation — an entirely new document height.
 *
 * Refreshing on each is far cheaper than the alternative of never trusting the
 * cache (`ScrollTrigger.config({ autoRefreshEvents })` would rerun on far more).
 */
export function ScrollRefresher() {
  const pathname = usePathname();
  const { isLoading } = useLoading();

  // Fonts.
  useEffect(() => {
    if (!("fonts" in document)) return;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Preloader hand-off and route changes. A double rAF lets the browser finish
  // layout for the new content before positions are re-measured.
  useEffect(() => {
    let frame = 0;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, isLoading]);

  return null;
}
