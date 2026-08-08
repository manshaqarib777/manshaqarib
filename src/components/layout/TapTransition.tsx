"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * The case-study route transition.
 *
 * One gesture in two halves: clicking a case-study link grows a black panel up
 * from the bottom of the page, and once the destination is in place that same
 * panel shrinks away to the top — so the change reads as one continuous wipe
 * rather than two unrelated animations. The tapping hand is held over the whole
 * thing, which is what makes the pause feel deliberate.
 *
 * An earlier revision ran this across two documents: it stashed a flag in
 * `sessionStorage`, called `window.location.assign`, and let a pre-paint script
 * in the arriving document pick the second half up. That was a real page load on
 * every case study, and a second one coming back — which threw away the router,
 * the warm bundle, and the scroll position, and replayed the home page's intro
 * loader from scratch each time.
 *
 * This does the same animation with `router.push`, so both halves happen in one
 * document. Nothing has to survive a navigation, so there is no flag, no
 * pre-paint script and no reload — only the two class changes, sequenced.
 *
 * All the motion is in `globals.css` under `html.is-tap-*`; this owns the clock
 * and the class names, nothing else.
 */

/** Matches the departure animation in the stylesheet. */
const LEAVE_MS = 501;

/** Matches the arrival animation. Longer: the destination has more to reveal. */
const ARRIVE_MS = 1200;

const HAND_SRC = "/tap-animation.gif";

/**
 * Which destinations get the treatment. Deliberately narrow — the case studies
 * and nothing else. Every other link on the site keeps its normal navigation, so
 * this cannot turn an ordinary click into a half-second wait.
 */
const isTapTarget = (pathname: string) =>
  pathname.startsWith("/work/");

export function TapTransition() {
  const router = useRouter();

  useEffect(() => {
    const root = document.documentElement;

    // The curtain is hidden outright under reduced motion, so intercepting the
    // click would only add a delay before a navigation nobody sees animate.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let navTimer = 0;
    let settleTimer = 0;

    /**
     * Rewind the GIF.
     *
     * An animated GIF keeps playing from wherever it left off, so on the second
     * transition the hand would appear mid-tap. Clearing `src` and restoring it
     * on the next frame is the only reliable way to restart one — the frame gap
     * is what forces the decoder to start over.
     */
    const restartHand = () => {
      const img = document.querySelector<HTMLImageElement>(".tap-hand-asset");
      if (!img) return;
      const src = img.getAttribute("src") ?? HAND_SRC;
      img.removeAttribute("src");
      requestAnimationFrame(() => img.setAttribute("src", src));
    };

    /* Departure half. Capture phase, so this runs before any handler that might
       stop propagation on its own link. */
    const onClick = (event: MouseEvent) => {
      // Every guard here is a way the browser is being asked for something other
      // than a plain same-tab navigation: a new tab, a download, a save.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const link = (event.target as HTMLElement | null)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!link || link.target === "_blank" || link.hasAttribute("download"))
        return;

      const href = link.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (!isTapTarget(url.pathname)) return;
      // A second click while the panel is already closing would queue a second
      // navigation and restart the hand mid-tap.
      if (root.classList.contains("is-tap-transitioning")) return;

      event.preventDefault();
      root.classList.remove("is-tap-settled");
      root.classList.add("is-tap-transitioning");
      restartHand();

      navTimer = window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}`);

        /* Both class changes in one synchronous block, so no frame can paint
           between them. Leave a gap and the curtain briefly matches neither
           rule, falls back to its own `curtain-leave`, and flashes upward
           mid-transition. */
        root.classList.remove("is-tap-transitioning");
        root.classList.add("is-tap-arriving");
        restartHand();

        settleTimer = window.setTimeout(() => {
          root.classList.add("is-tap-settled");
          root.classList.remove("is-tap-arriving");
        }, ARRIVE_MS);
      }, LEAVE_MS);
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(navTimer);
      window.clearTimeout(settleTimer);
      root.classList.remove(
        "is-tap-transitioning",
        "is-tap-arriving",
        "is-tap-settled",
      );
    };
  }, [router]);

  return (
    <div className="transition-curtain" aria-hidden="true">
      <div className="tap-hand">
        {/* A plain `img`, not `next/image`: the restart above works by clearing
            and restoring `src`, which a managed component would fight, and an
            animated GIF is not something the optimiser should touch anyway. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tap-hand-asset" src={HAND_SRC} alt="" />
      </div>
    </div>
  );
}
