"use client";

import { useEffect, useState } from "react";
import { SECTION_IDS } from "@/constants/nav";

/**
 * Tracks which section owns the viewport, for the nav's active indicator.
 *
 * IntersectionObserver is used instead of a ScrollTrigger per section: it runs
 * off the main thread, and a single observer with a mid-viewport root margin is
 * enough to resolve "the section you're reading" without competing with the
 * scroll-driven animations for frame time.
 */
export function useActiveSection(ids: string[] = SECTION_IDS) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport among those visible.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // A band across the middle of the screen: a section counts as active only
      // once it actually dominates the view.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
