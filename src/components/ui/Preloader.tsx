"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Logo } from "./Logo";
import { SITE } from "@/constants/site";
import { PROJECTS } from "@/constants/projects";
import { useAssetLoader } from "@/hooks/useAssetLoader";
import { useLoading, useSmoothScroll } from "@/providers";
import { useReducedMotion } from "@/hooks/useMediaQuery";

/** Only the covers are warmed: they are the first images the visitor will meet. */
const CRITICAL_IMAGES = PROJECTS.map((project) => project.cover);

/**
 * Full-screen preloader.
 *
 * The counter is tweened toward the *real* asset-loading progress rather than
 * faked on a timer, so it can stall mid-count on a slow connection — which is
 * honest, and reads as a real system rather than a decoration.
 *
 * Exit sequence (one GSAP timeline):
 *   counter + wordmark out → monogram lifts and fades → overlay wipes upward,
 *   with `beginReveal()` fired as the wipe starts so the hero's own entrance
 *   timeline runs *behind* the closing overlay instead of after it.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const [displayed, setDisplayed] = useState(0);
  const { progress, isComplete } = useAssetLoader({
    images: CRITICAL_IMAGES,
    minDuration: 1400,
  });
  const { isLoading, beginReveal, completeLoad } = useLoading();
  const { stop, start } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  // ── Lock scrolling for the duration ──────────────────────────────────────
  useEffect(() => {
    if (!isLoading) return;
    stop();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      start();
    };
  }, [isLoading, stop, start]);

  // ── Entrance ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) return;

    const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
    timeline
      .from(markRef.current, { scale: 0.86, autoAlpha: 0, duration: 1.1 })
      .from(
        metaRef.current?.children ? Array.from(metaRef.current.children) : [],
        { y: 18, autoAlpha: 0, duration: 0.9, stagger: 0.08 },
        0.25,
      );

    return () => {
      timeline.kill();
    };
  }, [prefersReducedMotion]);

  // ── Counter + progress bar follow real loading progress ──────────────────
  useEffect(() => {
    const proxy = { value: displayed };
    const tween = gsap.to(proxy, {
      value: progress * 100,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => setDisplayed(Math.round(proxy.value)),
    });

    gsap.to(barRef.current, {
      scaleX: progress,
      duration: 0.9,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
    };
    // `displayed` is intentionally excluded: including it would restart the
    // tween on every frame it updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // ── Exit ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isComplete) return;

    if (prefersReducedMotion) {
      beginReveal();
      completeLoad();
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onComplete: completeLoad,
    });

    timeline
      .to(metaRef.current, { autoAlpha: 0, y: -16, duration: 0.6 }, 0.15)
      .to(
        markRef.current,
        { y: -40, scale: 1.06, autoAlpha: 0, duration: 1, ease: "expo.out" },
        0.25,
      )
      .to(
        rootRef.current,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.25,
          onStart: beginReveal,
        },
        0.5,
      );

    return () => {
      timeline.kill();
    };
  }, [isComplete, prefersReducedMotion, beginReveal, completeLoad]);

  if (!isLoading) return null;

  return (
    <div
      ref={rootRef}
      // aria-live keeps screen-reader users informed of progress without the
      // decorative parts being announced.
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div
        ref={markRef}
        className="relative h-24 w-24 text-white/90 sm:h-28 sm:w-28"
      >
        <Logo animated={!prefersReducedMotion} />
      </div>

      <div
        ref={metaRef}
        className="mt-10 flex w-[min(88vw,26rem)] flex-col items-center gap-5"
      >
        <p className="text-xs font-medium uppercase tracking-[0.42em] text-white/45">
          {SITE.name}
        </p>

        <div className="relative h-px w-full overflow-hidden bg-white/12">
          <div
            ref={barRef}
            className="absolute inset-0 origin-left bg-white/80"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div
          className="flex w-full items-baseline justify-between text-xs uppercase tracking-[0.24em] text-white/45"
          role="status"
          aria-live="polite"
        >
          <span>{SITE.role}</span>
          <span ref={counterRef} className="tabular-nums text-white/85">
            {String(displayed).padStart(3, "0")}
            <span className="text-white/35">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
