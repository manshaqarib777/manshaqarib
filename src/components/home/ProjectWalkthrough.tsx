"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The media layer inside a project's cover frame: a still that resolves into a
 * scrolling walkthrough of the live site.
 *
 * This renders *inside* the existing `.project-visual-link` frame, so it keeps
 * that frame's rounding, tilt, scrim and sheen rather than introducing a second
 * treatment. `object-cover` means the clip fills the frame edge to edge instead
 * of letterboxing a 16:9 capture into a 16:7 box.
 *
 * Three things make six clips on one page affordable:
 *
 *  - `preload="none"`, so nothing is fetched until the clip nears the viewport.
 *  - The resting frame is a `next/image`, not the video's `poster` attribute,
 *    so it ships as AVIF/WebP rather than a full-size PNG.
 *  - Playback follows intersection: a clip plays on screen and pauses when it
 *    leaves, so at most one or two are ever decoding.
 *
 * Under `prefers-reduced-motion` nothing plays on its own and the still stands
 * in for the clip.
 */
export function ProjectWalkthrough({
  video,
  poster,
  title,
}: {
  video: string;
  poster: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // `play()` rejects if the browser declines autoplay. Muted plus
          // playsInline satisfies current policies, but a rejection must not
          // surface as an unhandled one either way.
          node.play().then(
            () => setActive(true),
            () => setActive(false),
          );
        } else {
          node.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Image
        className="size-full object-cover object-top [transition:transform_0.26s_var(--ease-silk),filter_0.22s_ease] will-change-transform"
        src={poster}
        alt={`${title} — the live site`}
        fill
        sizes="(max-width: 980px) 100vw, 52vw"
      />
      {/* `pointer-events-none` so the frame's own link still takes the click. */}
      <video
        ref={videoRef}
        className={`pointer-events-none absolute inset-0 size-full object-cover object-top transition-opacity duration-700 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        src={video}
        preload="none"
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    </>
  );
}
