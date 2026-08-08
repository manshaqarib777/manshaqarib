"use client";

import type { ReactNode } from "react";
import { ScrollRefresher } from "./ScrollRefresher";
import { TapTransition } from "./TapTransition";

/**
 * Chrome shared by every route.
 *
 * There used to be two designs living in one app: a set of routes that took a
 * shared navbar, footer, WebGL background, preloader and progress bar, and a
 * second set — listed here as `BARE_ROUTES` — that brought all of that itself
 * and opted out. Only the second design remains, so the branch is gone and with
 * it the shared chrome: the home page draws its own header, loader and cursor,
 * and the case studies draw the same header again.
 *
 * What is left is the part that was never decoration. The skip link is the first
 * tab stop on every page, and the scroll refresher keeps measurement correct
 * across navigations — both are correctness, not theme.
 *
 * `TapTransition` is mounted here rather than on each page for a reason that
 * only matters now that it navigates through the router: both halves of its wipe
 * run in one document, so the component has to outlive the route change it is
 * animating. Mounted per page it would unmount mid-transition, taking the
 * curtain with it.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <ScrollRefresher />
      <TapTransition />
      {children}
    </>
  );
}

/** First tab stop on every page. */
function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-charcoal"
    >
      Skip to content
    </a>
  );
}
