"use client";

import { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/providers";
import { BRAND } from "@/content/home";

/**
 * The full-screen intro.
 *
 * All the motion lives in `src/styles/home.css`, keyed off `data-phase`; this component
 * owns only the clock. Three phases, in order:
 *
 *   counting  digits climb on the near-black ground
 *   entering  the cream panel slides up over them, banners fly in from the sides
 *   exiting   the panel lifts away and the page is revealed behind it
 *
 * The count is a fixed 2s timer rather than real asset progress — the
 * deliberate: it means the intro is the same length every visit
 * instead of vanishing on a warm cache, at the cost of the digits not meaning
 * anything. (The `/` route's preloader takes the honest route and tracks
 * `useAssetLoader` instead; the two are deliberately different.)
 */

/**
 * Phase timings, in ms.
 *
 * These were 2000 / 2500 / 1000 — five and a half seconds of full-screen intro
 * before a first-time visitor could read a word. For a portfolio that is a real
 * cost: the reader is usually deciding between several tabs, and the intro is
 * the one part of the page that cannot be skimmed past.
 *
 * The whole choreography still plays, at 3.35s. `hold` is not arbitrary: the
 * banners land at `count + 200 + 1150` (their delay plus duration, in
 * `home.css`), which is exactly when `exit` begins — so the panel starts lifting
 * on the frame the banners come to rest, rather than either freezing them or
 * waiting on them. Move one and move the other.
 */
const TIMING = {
  full: { count: 1200, hold: 1350, exit: 800 },
  reduced: { count: 240, hold: 80, exit: 180 },
} as const;

/**
 * One-shot suppression: either the class on `<html>` or the
 * session key, and the key is cleared as it is read so it only ever skips once.
 * Nothing in this app sets either yet — it exists so a future client-side
 * navigation back to this route can arrive without replaying the intro.
 */
const SKIP_CLASS = "skip-home-loader";
const SKIP_KEY = "portfolio-skip-home-loader";

/**
 * Whether the intro has already played in this document.
 *
 * Module scope, deliberately: it survives every client-side navigation and dies
 * with the document. Which is exactly the rule wanted — the intro is a greeting
 * for arriving at the site, not something to sit through again on the way back
 * from a case study. Now that those navigations go through the router rather
 * than reloading the page, this component re-mounts on every return to `/`, and
 * without this it would replay all five and a half seconds each time.
 *
 * A real reload resets the module, so a refresh still gets the intro.
 */
let hasPlayed = false;

/**
 * Twelve repeats, space-joined. The track translates up to 140vw, so it has to
 * be wider than that travel plus the viewport or its tail edge scrolls in.
 */
const TRACK = Array.from({ length: 12 }, () => BRAND).join(" ");

type Phase = "counting" | "entering" | "exiting";

export function SiteLoader() {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<Phase>("counting");
  const [visible, setVisible] = useState(true);

  /* Lenis has to be stopped as well as `overflow` set, which is the one place
     an overlay is not enough on its own: Lenis drives `window.scrollTo`, so
     `overflow: hidden` alone would leave the page scrolling behind the overlay.
     Held in a ref so the effect below can stay dependency-free and run once. */
  const scroll = useRef({ stop: () => {}, start: () => {} });
  const { stop, start } = useSmoothScroll();
  scroll.current = { stop, start };

  useEffect(() => {
    let skip = hasPlayed || document.documentElement.classList.contains(SKIP_CLASS);
    try {
      skip ||= window.sessionStorage.getItem(SKIP_KEY) === "true";
    } catch {
      // Private-mode Safari throws on any `sessionStorage` access.
    }
    if (skip) {
      try {
        window.sessionStorage.removeItem(SKIP_KEY);
      } catch {
        // As above — a failed clear only means the next load skips too.
      }
      setVisible(false);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    // Reduced motion compresses the sequence to ~0.5s rather than dropping it:
    // the visitor still gets the beat, without a full-screen wipe.
    const { count, hold, exit } = reduced ? TIMING.reduced : TIMING.full;

    const { stop: stopScroll, start: startScroll } = scroll.current;
    stopScroll();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    hasPlayed = true;
    const started = performance.now();
    let frame = 0;
    let toExiting = 0;
    let toGone = 0;

    const release = () => {
      document.body.style.overflow = previousOverflow;
      startScroll();
    };

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - started) / count);
      // Same integer lands on many frames, and React bails on an unchanged
      // value — so this is ~100 renders of a tiny subtree, not one per frame.
      setPercent(Math.round(ratio * 100));
      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      setPhase("entering");
      toExiting = window.setTimeout(() => {
        setPhase("exiting");
        toGone = window.setTimeout(() => {
          release();
          setVisible(false);
        }, exit);
      }, hold);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(toExiting);
      window.clearTimeout(toGone);
      release();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="site-loader"
      data-phase={phase}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Both children are `aria-hidden`: the container's label is the whole
          announcement, rather than a number ticking or the wordmark twelve
          times over. */}
      <div className="site-loader-progress" aria-hidden="true">
        {percent}%
      </div>

      <div className="site-loader-page-up" aria-hidden="true">
        <div className="site-loader-banners">
          {/* Exactly two, counter-rotated. `:first-child` / `:last-child` in the
              stylesheet is what gives each its direction, so the count is
              load-bearing — a third would inherit the first's animation. */}
          <div className="site-loader-banner">
            <div className="site-loader-banner-track">{TRACK}</div>
          </div>
          <div className="site-loader-banner">
            <div className="site-loader-banner-track">{TRACK}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
