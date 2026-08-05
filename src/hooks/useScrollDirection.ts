"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollDirectionOptions {
  /** Ignore jitter below this many px of travel. */
  threshold?: number;
  /** Distance from the top where the navbar is always considered "at top". */
  topOffset?: number;
}

/**
 * Scroll direction with hysteresis, for the scroll-aware navbar.
 *
 * Lenis scrolls the window for real, so plain `scrollY` is authoritative here.
 * The threshold prevents the navbar flickering when a trackpad emits a couple
 * of opposing pixels mid-gesture.
 */
export function useScrollDirection({
  threshold = 8,
  topOffset = 64,
}: ScrollDirectionOptions = {}) {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [isAtTop, setIsAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setIsAtTop(y < topOffset);

      if (Math.abs(y - lastY.current) < threshold) return;
      setDirection(y > lastY.current ? "down" : "up");
      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, topOffset]);

  return { direction, isAtTop };
}
