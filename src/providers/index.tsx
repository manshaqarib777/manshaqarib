"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

/**
 * App-wide providers.
 *
 * Only one survives: smooth scroll. A cursor provider and a loading provider
 * used to sit alongside it, both belonging to the design this site replaced —
 * the cursor context had no consumers left at all, and the loading flags were
 * never flipped by anything, so `isLoading` was permanently `true`. Neither was
 * doing work; both are gone rather than kept as shapes something might one day
 * fill.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}

export { useSmoothScroll } from "./SmoothScrollProvider";
