"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { splitText } from "@/animations/splitText";
import { Button } from "@/components/ui/Button";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { LiveClock } from "@/components/ui/LiveClock";
import { SITE, HERO_WORDS } from "@/constants/site";
import { EASE } from "@/constants/motion";
import { useIsTouch, useReducedMotion } from "@/hooks/useMediaQuery";
import { useLoading, useSmoothScroll } from "@/providers";

/**
 * Built as one interpolated string rather than several JSX children: SplitType
 * splits each text node separately, so a `{value},` pattern would leave the comma
 * as its own "word" with a space in front of it.
 */
const LEDE = `React, TypeScript and Next.js App Router. Eight years of component libraries and data-heavy dashboards for platforms with real users and real consequences — from ${SITE.location}.`;

/**
 * Hero.
 *
 * The entrance is one GSAP timeline rather than a set of independent tweens, so
 * every element's arrival is expressed relative to the others and the whole
 * sequence can be retimed from a single place. It is gated on `isRevealing` from
 * the preloader, which means the type starts moving *behind* the closing overlay
 * — the page feels already alive when the overlay clears rather than starting
 * from a standstill.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement>(null);

  const { isRevealing } = useLoading();
  const { scrollTo } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  // ── Entrance timeline ────────────────────────────────────────────────────
  useGSAP(
    () => {
      if (!isRevealing) return;

      const headline = headlineRef.current;
      const lede = ledeRef.current;
      if (!headline || !lede) return;

      // Reduced motion: nothing is pre-hidden anywhere in this section (every
      // entrance is a `from` tween), so returning early leaves the hero in its
      // finished state with no work done.
      if (prefersReducedMotion) return;

      // Word-level splitting on the headline: characters would be too busy at
      // this size, lines too coarse to feel choreographed.
      const split = splitText(headline, "words");
      // Both splits happen before the timeline is built — the timeline needs the
      // generated nodes to exist when it queries them.
      const ledeSplit = splitText(lede, "lines");

      const timeline = gsap.timeline({
        defaults: { ease: EASE.out, duration: 1.1 },
      });

      timeline
        .from("[data-hero-eyebrow]", { yPercent: 120, autoAlpha: 0, duration: 0.9 })
        .from(
          split.targets,
          { yPercent: 115, autoAlpha: 0, duration: 1.35, stagger: 0.055 },
          0.1,
        )
        .from(
          ledeSplit.targets,
          { yPercent: 110, duration: 1, stagger: 0.08 },
          0.55,
        )
        .from(
          "[data-hero-cta]",
          { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.09 },
          0.75,
        )
        .from(
          "[data-hero-meta]",
          { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.07 },
          0.85,
        )
        .from("[data-hero-indicator]", { autoAlpha: 0, duration: 0.8 }, 1.1);

      return () => {
        timeline.kill();
        split.revert();
        ledeSplit.revert();
      };
    },
    { dependencies: [isRevealing, prefersReducedMotion] },
  );

  // ── Pointer parallax ─────────────────────────────────────────────────────
  useGSAP(
    () => {
      const target = parallaxRef.current;
      if (!target || prefersReducedMotion || isTouch) return;

      // quickTo reuses one tween for the whole pointer stream — see useMagnetic.
      const moveX = gsap.quickTo(target, "x", { duration: 1.1, ease: "power3.out" });
      const moveY = gsap.quickTo(target, "y", { duration: 1.1, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        // Deliberately small: the type should drift, not swim.
        moveX(nx * -26);
        moveY(ny * -18);
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { dependencies: [prefersReducedMotion, isTouch] },
  );

  // ── Scroll-out: the hero recedes as the next section arrives ─────────────
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const tween = gsap.to(parallaxRef.current, {
        yPercent: -12,
        autoAlpha: 0.15,
        scale: 0.97,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => tween.kill();
    },
    { dependencies: [prefersReducedMotion] },
  );

  // ── Rotating discipline word ─────────────────────────────────────────────
  useGSAP(
    () => {
      const host = wordsRef.current;
      if (!host || prefersReducedMotion) return;

      const words = Array.from(host.children) as HTMLElement[];
      gsap.set(words, { yPercent: 100, autoAlpha: 0 });
      gsap.set(words[0], { yPercent: 0, autoAlpha: 1 });

      const timeline = gsap.timeline({ repeat: -1, delay: 1.6 });

      words.forEach((word, index) => {
        const next = words[(index + 1) % words.length];
        timeline
          .to(word, { yPercent: -100, autoAlpha: 0, duration: 0.7, ease: EASE.out })
          .fromTo(
            next,
            { yPercent: 100, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: EASE.out },
            "<",
          )
          .to({}, { duration: 1.9 });
      });

      return () => timeline.kill();
    },
    { dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      id="home"
      ref={rootRef}
      aria-label="Introduction"
      /* Vertical padding is viewport-height aware (not just width aware) so the
         bottom meta rail stays above the fold on short laptop screens, where a
         width-only scale would push it off. */
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pb-8 pt-[clamp(5.5rem,13vh,8rem)] sm:pb-12"
    >
      <div ref={parallaxRef} className="container-wide flex flex-1 flex-col justify-center">
        {/* Eyebrow */}
        <div className="mb-7 overflow-hidden sm:mb-9">
          <div
            data-hero-eyebrow
            data-hero-item
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="relative flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-ink-200">
                {SITE.availability}
              </span>
            </span>
            <span className="label-meta">
              {SITE.role} · {SITE.specialism}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          /* The `min(10vw,15vh)` term is the important part: on a wide but short
             viewport the headline is limited by height, so it can't grow tall
             enough to push the rest of the hero off screen. */
          className="text-display max-w-[15ch] text-[clamp(2.7rem,min(10vw,15vh),9rem)] text-white"
        >
          Frontends that hold up in production.
        </h1>

        {/* Lede + CTAs */}
        <div className="mt-9 flex flex-col gap-10 sm:mt-12 lg:flex-row lg:items-end lg:justify-between">
          <p
            ref={ledeRef}
            className="max-w-md text-[1.02rem] leading-relaxed text-ink-200 sm:text-[1.12rem]"
          >
            {LEDE}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span data-hero-cta>
              <Button
                size="lg"
                withArrow
                onClick={() => scrollTo("#work", -8)}
                aria-label="View selected work"
              >
                View work
              </Button>
            </span>
            <span data-hero-cta>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("#contact", -8)}
              >
                Start a project
              </Button>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom meta rail */}
      <div className="container-wide mt-10 sm:mt-14">
        <div className="rule-fade mb-5" />
        <div className="flex items-end justify-between gap-6">
          <dl className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {/* Centre-aligned rather than baseline-aligned: the rotating word sits
                in an absolutely-positioned stack, which has no text baseline for
                the label to align to. */}
            <div data-hero-meta className="flex items-center gap-2">
              <dt className="label-meta">Focus</dt>
              <dd className="relative block h-6 w-[7.5rem] overflow-hidden">
                <span ref={wordsRef} className="absolute inset-0 block">
                  {HERO_WORDS.map((word) => (
                    <span
                      key={word}
                      className="absolute inset-0 block text-sm leading-6 text-white"
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </dd>
            </div>

            <div data-hero-meta className="flex items-baseline gap-2">
              <dt className="label-meta">Based in</dt>
              <dd className="text-sm text-white">{SITE.location}</dd>
            </div>

            <div data-hero-meta className="hidden items-baseline gap-2 sm:flex">
              <dt className="label-meta">Local time</dt>
              <dd className="text-sm text-white">
                <LiveClock />
              </dd>
            </div>
          </dl>

          <div data-hero-indicator className="hidden sm:block">
            <ScrollIndicator />
          </div>
        </div>
      </div>
    </section>
  );
}
