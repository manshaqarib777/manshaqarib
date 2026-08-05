"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SKILL_GROUPS } from "@/constants/skills";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { padIndex } from "@/lib/utils";

/**
 * The two ends of the scrub.
 *
 * `DIM` is deliberately very dark — it is a *passing* state, not a resting one.
 * Which is exactly why the markup renders every line white and lets GSAP dim it,
 * rather than the other way round: if the script never runs, the section is fully
 * legible instead of near-invisible.
 */
const DIM = "#2b3342";
const LIT = "#ffffff";

/**
 * Skills.
 *
 * Each skill is a display-size line that fills from dark grey to white as it
 * crosses a band in the upper half of the viewport, scrubbed against scroll
 * position — so scrolling back up un-fills it and the effect stays physically
 * tied to the gesture rather than firing once and finishing.
 *
 * One ScrollTrigger per line (not one for the section with a stagger): a stagger
 * would light lines on a timeline that only *approximates* where they are, so a
 * fast flick or a resize would desynchronise the fill from the text's actual
 * position on screen. Per-line triggers are always right by construction.
 *
 * `color` is a paint-only property here — no layout, no compositing surprises —
 * which is what makes ~18 concurrently-scrubbing lines affordable.
 */
export function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion) return;

      const lines = Array.from(
        root.querySelectorAll<HTMLElement>("[data-skill-line]"),
      );

      const tweens = lines.map((line) => {
        const bar = line
          .closest("[data-skill-row]")
          ?.querySelector<HTMLElement>("[data-skill-bar]");

        // The line and its proficiency rule share one scrub range, so they
        // resolve together instead of reading as two separate effects.
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: line,
            start: "top 82%",
            end: "top 46%",
            scrub: true,
          },
        });

        timeline.fromTo(
          line,
          { color: DIM },
          { color: LIT, ease: "none" },
          0,
        );

        if (bar) {
          timeline.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: Number(bar.dataset.skillBar ?? 0) / 100,
              ease: "none",
            },
            0,
          );
        }

        return timeline;
      });

      return () => {
        tweens.forEach((timeline) => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        });
      };
    },
    { dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      id="skills"
      ref={rootRef}
      aria-labelledby="skills-heading"
      className="relative py-28 sm:py-36 lg:py-44"
    >
      <div className="container-wide">
        <SectionHeading
          index="04"
          eyebrow="Capabilities"
          titleId="skills-heading"
          title="The stack, honestly rated."
          description="Percentages are a blunt instrument, so read them as confidence rather than credentials — where I'd happily own the hardest problem in the room, and where I'd want a specialist beside me."
        />

        <div className="mt-20 flex flex-col gap-16 lg:mt-28 lg:gap-24">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <div
              key={group.title}
              className="grid gap-8 border-t border-white/[0.07] pt-10 lg:grid-cols-12 lg:gap-16"
            >
              {/* Group label — sticky on desktop, so it stays with its list while
                  the lines scroll past and light up. */}
              <div className="lg:col-span-4">
                <Reveal variant="fade-up" distance={24}>
                  <div className="flex flex-col gap-3 lg:sticky lg:top-28">
                    <span className="label-meta">{padIndex(groupIndex)}</span>
                    <h3 className="text-2xl tracking-[-0.02em] text-white sm:text-[1.7rem]">
                      {group.title}
                    </h3>
                    <p className="max-w-xs text-[0.92rem] leading-relaxed text-ink-400">
                      {group.caption}
                    </p>
                  </div>
                </Reveal>
              </div>

              <ul className="flex flex-col lg:col-span-8">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    data-skill-row
                    className="relative flex items-baseline justify-between gap-6 py-4 sm:py-5"
                  >
                    <span
                      data-skill-line
                      /* Uppercase needs looser tracking than the display face's
                         default −0.035em, which is tuned for lowercase. */
                      className="text-display text-[clamp(1.5rem,4.6vw,3.2rem)] uppercase leading-[1.05] tracking-[-0.015em] text-white"
                    >
                      {skill.name}
                    </span>

                    <span className="shrink-0 font-mono text-[0.7rem] tabular-nums text-ink-400">
                      {skill.level}
                    </span>

                    {/* The row's bottom rule doubles as the proficiency track. */}
                    <span
                      role="progressbar"
                      aria-label={`${skill.name} proficiency`}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="absolute inset-x-0 bottom-0 block h-px overflow-hidden bg-white/[0.08]"
                    >
                      <span
                        data-skill-bar={skill.level}
                        className="block h-full origin-left bg-gradient-to-r from-accent-400 to-accent-300"
                        style={{
                          // Reduced motion gets the resting state, no scrub.
                          transform: prefersReducedMotion
                            ? `scaleX(${skill.level / 100})`
                            : undefined,
                        }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
