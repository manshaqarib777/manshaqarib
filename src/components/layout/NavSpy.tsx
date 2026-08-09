"use client";

import { useEffect } from "react";

/**
 * Marks the header link for whichever section is currently being read.
 *
 * `SiteHeader` already draws that state — the amber dot, the 10px shift and the
 * dimming of the other links are all keyed off `aria-current="location"` in
 * `globals.css`, and the case pages pass a static `currentHref` to light it. The
 * home page passed nothing, so on the one route with three long sections the
 * marker never appeared at all: the nav told you what was there but never where
 * you were.
 *
 * This writes the attribute directly rather than lifting it into React state.
 * `SiteHeader` is a server component and the sections around it ship no client
 * JS; making the header interactive to move one attribute would pull the whole
 * page chrome across the boundary for something the DOM can express by itself.
 *
 * The attribute is the same one the CSS and the accessibility tree already read,
 * so the marker and the announcement stay a single fact.
 */
export function NavSpy({
  links,
}: {
  links: readonly { readonly href: string }[];
}) {
  useEffect(() => {
    // Only in-page anchors can be spied on.
    const targets = links
      .filter((link) => link.href.startsWith("#"))
      .map((link) => ({
        href: link.href,
        section: document.querySelector<HTMLElement>(link.href),
        anchor: document.querySelector<HTMLAnchorElement>(
          `.nav-links a[href="${link.href}"]`,
        ),
      }))
      .filter(
        (
          entry,
        ): entry is {
          href: string;
          section: HTMLElement;
          anchor: HTMLAnchorElement;
        } => Boolean(entry.section && entry.anchor),
      );

    if (!targets.length) return;

    // The section closest to the reading line wins, so a short section between
    // two tall ones still takes the marker as it passes.
    const READING_LINE = 0.38;

    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * READING_LINE;

      let best: (typeof targets)[number] | null = null;
      let bestDistance = Infinity;

      for (const target of targets) {
        const box = target.section.getBoundingClientRect();
        // Off screen entirely: not a candidate, however close its edge is.
        if (box.bottom < 0 || box.top > window.innerHeight) continue;

        const distance =
          box.top <= line && box.bottom >= line ? 0 : Math.abs(box.top - line);

        if (distance < bestDistance) {
          bestDistance = distance;
          best = target;
        }
      }

      for (const target of targets) {
        if (target === best) target.anchor.setAttribute("aria-current", "location");
        else target.anchor.removeAttribute("aria-current");
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      // Leave the header as it was found: the attribute lives outside this
      // component's subtree, so nothing else would clean it up.
      for (const target of targets) target.anchor.removeAttribute("aria-current");
    };
  }, [links]);

  return null;
}
