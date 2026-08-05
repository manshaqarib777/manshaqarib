"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useCursor } from "@/providers/CursorProvider";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/** Per-variant geometry for the trailing ring. */
const RING = {
  default: { size: 38, opacity: 1, border: 1 },
  hover: { size: 66, opacity: 1, border: 1 },
  text: { size: 104, opacity: 1, border: 0 },
  image: { size: 132, opacity: 1, border: 0 },
  drag: { size: 84, opacity: 1, border: 0 },
} as const;

/**
 * Two-layer custom cursor: a small dot that tracks the pointer almost exactly,
 * and a larger ring that lags behind it. The delta between the two is what
 * creates the sense of weight.
 *
 * Positioning uses `gsap.quickTo` on translate only — never `left`/`top` — so
 * the cursor stays on the compositor and can't trigger layout on any frame.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const { variant, label, image } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  // ── Position tracking ────────────────────────────────────────────────────
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    // GSAP owns the transform on these nodes, so centring is expressed as
    // xPercent/yPercent rather than a Tailwind `-translate-x-1/2` class (which
    // GSAP would overwrite). Percentages resolve against the element's own
    // size, so the ring stays centred as it resizes between variants.
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });

    let hasMoved = false;

    const onMove = (event: PointerEvent) => {
      if (!hasMoved) {
        // Snap on the first move so the cursor doesn't fly in from 0,0.
        gsap.set([dot, ring], { x: event.clientX, y: event.clientY });
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
        hasMoved = true;
        return;
      }
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onDown = () =>
      gsap.to(ring, { scale: 0.82, duration: 0.22, ease: "power3.out" });
    const onUp = () =>
      gsap.to(ring, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" });

    // Fade out when the pointer leaves the document entirely.
    const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  // ── Variant transitions ──────────────────────────────────────────────────
  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const config = RING[variant];
    const duration = prefersReducedMotion ? 0 : 0.5;

    gsap.to(ring, {
      width: config.size,
      height: config.size,
      borderWidth: config.border,
      duration,
      ease: "expo.out",
    });

    // The dot would sit on top of a label or preview image, so it hides in the
    // expanded modes.
    gsap.to(dot, {
      scale: variant === "default" || variant === "hover" ? 1 : 0,
      duration,
      ease: "expo.out",
    });

    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { autoAlpha: 0, y: 6 },
        { autoAlpha: 1, y: 0, duration, ease: "expo.out" },
      );
    }
  }, [variant, label, image, prefersReducedMotion]);

  const isMediaMode = variant === "image" || variant === "text";

  return (
    <>
      <div
        ref={ringRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center",
          "rounded-full border-white/60 opacity-0 will-change-transform",
          // Difference blending makes the ring legible over any background,
          // but it must be off in media modes or the preview inverts.
          isMediaMode
            ? "bg-white/10 backdrop-blur-md"
            : "mix-blend-difference bg-transparent",
        )}
        style={{
          width: RING.default.size,
          height: RING.default.size,
          borderWidth: 1,
        }}
      >
        {variant === "image" && image && (
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src={image}
              alt=""
              fill
              sizes="132px"
              className="object-cover"
              aria-hidden
            />
          </div>
        )}

        {label && variant !== "image" && (
          <div
            ref={labelRef}
            className="px-2 text-center text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white"
          >
            {label}
          </div>
        )}
      </div>

      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white opacity-0 mix-blend-difference will-change-transform"
      />
    </>
  );
}
