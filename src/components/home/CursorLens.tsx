"use client";

import { useEffect } from "react";

/** What counts as interactive, and so makes the lens swell. */
const INTERACTIVE =
  "a, button, summary, input, textarea, select, [role='button'], [data-cursor]";

/**
 * The cream lens that follows the pointer.
 *
 * Position is published as CSS custom properties on `<html>` rather than written
 * to the element's own style, so the stylesheet decides everything about how the
 * lens looks and only the coordinates come from JS. `mix-blend-mode: difference`
 * in CSS is what inverts it against whatever it passes over — including the
 * header, which blends in `difference` itself.
 */
export function CursorLens() {
  useEffect(() => {
    // No pointer means nothing to follow; the CSS hides the lens on small
    // screens and under reduced motion, so this only guards the listeners.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    const body = document.body;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      // Coalesce to one update per frame: pointermove fires far faster than the
      // compositor can paint, and every extra write is wasted.
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const hit = document
          .elementFromPoint(event.clientX, event.clientY)
          ?.closest(INTERACTIVE);

        root.style.setProperty("--cursor-x", `${event.clientX}px`);
        root.style.setProperty("--cursor-y", `${event.clientY}px`);
        root.style.setProperty("--cursor-opacity", "1");
        body.classList.toggle("cursor-expanded", !!hit);

        frame = 0;
      });
    };

    const onLeave = () => {
      root.style.setProperty("--cursor-opacity", "0");
      body.classList.remove("cursor-expanded");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
      // Leave nothing behind: the class lives on <body>, outside this subtree.
      body.classList.remove("cursor-expanded");
      root.style.removeProperty("--cursor-opacity");
    };
  }, []);

  // The coordinates are read with inline fallbacks rather than from a property
  // declared on the shell: a value set there would shadow the one this effect
  // writes to `<html>`, and the lens would never move. The negative margin is
  // half the box, pulling the disc back so it centres on the pointer.
  // `body.cursor-expanded` drives the swell and stays in CSS — it keys off an
  // ancestor's state, which no utility can express.
  return (
    <div
      className="cursor-lens pointer-events-none fixed top-[var(--cursor-y,50vh)] left-[var(--cursor-x,50vw)] z-[2147483647] m-[-75px] size-[150px] overflow-hidden rounded-[50%] bg-[#f0e7dc] opacity-[var(--cursor-opacity,0)] mix-blend-difference [transform:scale(0.2)] [transition:transform_0.4s_ease-out,opacity_0.12s] [will-change:left,top,transform] to-sm:hidden motion-reduce:hidden"
      aria-hidden="true"
    />
  );
}
