"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Copy helper with an auto-resetting "copied" flag for success micro-states. */
export function useCopyToClipboard(resetAfter = 2200) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(
          () => setCopied(false),
          resetAfter,
        );
        return true;
      } catch {
        // Clipboard API is unavailable over http:// or when permission is denied.
        return false;
      }
    },
    [resetAfter],
  );

  return { copied, copy };
}
