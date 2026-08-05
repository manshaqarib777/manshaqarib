"use client";

import { useEffect, useRef, useState } from "react";

interface AssetLoaderOptions {
  /** Image URLs to warm before the page is revealed. */
  images?: string[];
  /** Floor for the preloader so it never flashes on a fast connection (ms). */
  minDuration?: number;
}

/**
 * Real asset loading with an honest progress value.
 *
 * Progress is the fraction of tracked work completed: web fonts count as one
 * unit, each image as another. A `minDuration` floor keeps the preloader from
 * appearing and vanishing within 80ms on a warm cache, which looks like a
 * glitch rather than an intro.
 */
export function useAssetLoader({
  images = [],
  minDuration = 1200,
}: AssetLoaderOptions = {}) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const startRef = useRef(0);

  useEffect(() => {
    startRef.current = performance.now();

    let cancelled = false;
    let done = 0;
    const total = images.length + 1; // +1 for the font load

    const tick = () => {
      if (cancelled) return;
      done += 1;
      setProgress(Math.min(done / total, 1));
    };

    const loadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => resolve();
        // A missing asset must not deadlock the preloader.
        image.onerror = () => resolve();
        image.src = src;
      }).then(tick);

    const fonts =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready.then(() => undefined)
        : Promise.resolve();

    Promise.all([fonts.then(tick), ...images.map(loadImage)]).then(() => {
      if (cancelled) return;
      const elapsed = performance.now() - startRef.current;
      const wait = Math.max(0, minDuration - elapsed);
      window.setTimeout(() => {
        if (cancelled) return;
        setProgress(1);
        setIsComplete(true);
      }, wait);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDuration, images.join("|")]);

  return { progress, isComplete };
}
