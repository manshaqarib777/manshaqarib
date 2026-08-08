"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Keeps ScrollTrigger's cached measurements honest.
 *
 * ScrollTrigger measures element positions once and caches them. Two things
 * invalidate those measurements without firing a resize event, and each one
 * silently breaks every trigger below the change:
 *
 *  1. Web fonts swapping in — line counts change, so everything below reflows.
 *  2. Client-side navigation — an entirely new document height.
 *
 * Refreshing on each is far cheaper than the alternative of never trusting the
 * cache (`ScrollTrigger.config({ autoRefreshEvents })` would rerun on far more).
 *
 * A third trigger used to be listed here — a full-page loader unmounting — keyed
 * off a `LoadingProvider` flag that nothing ever flipped. The home page's
 * `SiteLoader` owns its own timing and releases the scroll itself, and its
 * unmount does not change document height, so the dependency was dead weight.
 */
export function ScrollRefresher() {
  const pathname = usePathname();

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

  // Route changes. A double rAF lets the browser finish layout for the new
  // content before positions are re-measured.
  useEffect(() => {
    let frame = 0;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
