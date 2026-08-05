"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { FiCheck } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EXPERIENCE } from "@/constants/experience";
import { EASE } from "@/constants/motion";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { padIndex } from "@/lib/utils";

/**
 * Experience timeline.
 *
 * The rail is two stacked lines: a static track and a gradient fill scaled by
 * scroll progress through the list. Nodes pop as the fill reaches them, driven by
 * their own triggers rather than by the fill's progress — cheaper than measuring,
 * and it stays correct at any viewport height.
 *
 * Layout is single-rail on all sizes (rail on the left) rather than the usual
 * alternating zig-zag: alternating reads as decoration on desktop and collapses
 * awkwardly on mobile, and a single rail keeps the reading order honest.
 */
export function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const rail = railRef.current;
      const fill = fillRef.current;
      if (!rail || !fill || prefersReducedMotion) return;

      const fillTween = gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rail,
            start: "top 72%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );

      const nodes = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-timeline-node]"),
      );

      const nodeTweens = nodes.map((node) =>
        gsap.fromTo(
          node,
          { scale: 0.2, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.7,
            ease: EASE.out,
            scrollTrigger: { trigger: node, start: "top 78%", once: true },
          },
        ),
      );

      return () => {
        fillTween.kill();
        nodeTweens.forEach((tween) => tween.kill());
      };
    },
    { dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      id="experience"
      ref={rootRef}
      aria-labelledby="experience-heading"
      className="relative py-28 sm:py-36 lg:py-44"
    >
      <div className="container-wide">
        <SectionHeading
          index="05"
          eyebrow="Experience"
          titleId="experience-heading"
          title="Eight years, four teams, one discipline."
        />

        <div ref={railRef} className="relative mt-16 lg:mt-24">
          {/* Rail: static track + scroll-driven fill. */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[7px] top-2 w-px bg-white/10 sm:left-[9px]"
          >
            <div
              ref={fillRef}
              className="h-full w-full origin-top bg-gradient-to-b from-accent-400 via-accent-500 to-transparent"
              style={{
                transform: prefersReducedMotion ? "scaleY(1)" : undefined,
              }}
            />
          </div>

          <ol className="flex flex-col">
            {EXPERIENCE.map((entry, index) => (
              <li
                key={`${entry.company}-${entry.period}`}
                className="relative pb-14 pl-10 last:pb-0 sm:pl-14"
              >
                {/* Node */}
                <span
                  data-timeline-node
                  aria-hidden
                  className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent-400/60 bg-ink-950 sm:h-[19px] sm:w-[19px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                </span>

                <Reveal variant="fade-up" delay={0.05} distance={28}>
                  <article className="group flex flex-col gap-4 rounded-2xl border border-transparent p-0 transition-colors duration-700 sm:-mx-6 sm:border-white/[0.05] sm:bg-ink-900/45 sm:p-6 sm:hover:border-white/12">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <div className="flex items-baseline gap-4">
                        <span className="label-meta">{padIndex(index)}</span>
                        <div>
                          <h3 className="text-xl tracking-[-0.02em] text-white sm:text-2xl">
                            {entry.role}
                          </h3>
                          <p className="mt-1 text-[0.95rem] text-accent-300">
                            {entry.company}
                          </p>
                        </div>
                      </div>

                      {/* Right-aligned once the row fits on one line; left-aligned
                          on narrow screens, where it wraps to its own line. */}
                      <div className="flex flex-col text-left sm:text-right">
                        <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-200">
                          {entry.period}
                        </span>
                        <span className="text-[0.72rem] uppercase tracking-[0.16em] text-ink-400">
                          {entry.location}
                        </span>
                      </div>
                    </div>

                    <p className="max-w-2xl text-[0.98rem] leading-relaxed text-ink-200">
                      {entry.summary}
                    </p>

                    <ul className="flex flex-col gap-2">
                      {entry.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-3 text-[0.92rem] text-ink-400"
                        >
                          <FiCheck
                            aria-hidden
                            className="mt-1 shrink-0 text-accent-400"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
