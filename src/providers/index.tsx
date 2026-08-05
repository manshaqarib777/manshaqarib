"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { CursorProvider } from "./CursorProvider";
import { LoadingProvider } from "./LoadingProvider";

/**
 * Provider order matters: smooth scroll is the outermost because the preloader
 * (inside LoadingProvider's tree) needs to lock and release it.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <LoadingProvider>
        <CursorProvider>{children}</CursorProvider>
      </LoadingProvider>
    </SmoothScrollProvider>
  );
}

export { useSmoothScroll } from "./SmoothScrollProvider";
export { useCursor, useCursorProps } from "./CursorProvider";
export { useLoading } from "./LoadingProvider";
