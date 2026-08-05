"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Marquee } from "@/components/ui/Marquee";
import { imageMask, parallax } from "@/animations/reveal";
import { CREDENTIALS, PRINCIPLES, STATS } from "@/constants/experience";
import { TOOLBELT } from "@/constants/skills";
import { SITE } from "@/constants/site";
import { useReducedMotion } from "@/hooks/useMediaQuery";

/**
 * About.
 *
 * The portrait is the section's anchor: it reveals through a clip-path mask while
 * the image inside counter-scales, then drifts on a scrub as the section passes.
 * Everything else is progressive — index, title, prose, principles, stats — so
 * the section assembles itself as you read down it rather than arriving at once.
 */
export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !frameRef.current) return;

      const mask = imageMask(frameRef.current, imageRef.current, {
        start: "top 86%",
      });
      const drift = parallax(imageRef.current, {
        amount: 64,
        trigger: frameRef.current,
      });

      return () => {
        mask.kill();
        drift.kill();
      };
    },
    { dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      id="about"
      ref={rootRef}
      aria-labelledby="about-heading"
      className="relative py-28 sm:py-36 lg:py-44"
    >
      <div className="container-wide">
        <SectionHeading
          index="02"
          eyebrow="About"
          titleId="about-heading"
          title="Eight years of frontends for platforms that can't afford to break."
          className="max-w-5xl"
        />

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div
              ref={frameRef}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900"
              style={{ clipPath: "inset(0% 0% 0% 0% round 1rem)" }}
            >
              <div ref={imageRef} className="absolute inset-[-8%]">
                <Image
                  src="/portrait.svg"
                  alt={`${SITE.name}, ${SITE.role}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                  priority={false}
                />
              </div>

              {/* Caption plate — glass, only where it earns its keep. */}
              <div className="glass absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">{SITE.name}</p>
                  <p className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-400">
                    {SITE.role}
                  </p>
                </div>
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-400">
                  {SITE.location}
                </p>
              </div>
            </div>
          </div>

          {/* Prose + principles */}
          <div className="flex flex-col gap-12 lg:col-span-7">
            <div className="flex flex-col gap-6">
              <TextReveal
                as="p"
                granularity="lines"
                className="max-w-2xl text-[1.3rem] leading-[1.45] text-white sm:text-[1.6rem]"
              >
                Tax filings for 700+ financial institutions. A marketplace for
                100,000+ users. Debt recovery for 10,000+ businesses. The common
                thread is that being wrong has a cost.
              </TextReveal>

              <Reveal
                variant="fade-up"
                delay={0.1}
                stagger={{ selector: "p", amount: 0.12 }}
                className="flex max-w-2xl flex-col gap-5 text-[1rem] leading-relaxed text-ink-200 sm:text-[1.05rem]"
              >
                <p>
                  I build production frontends in React 19, TypeScript and Next.js
                  App Router — reusable component libraries and data-heavy
                  dashboards, end to end. Redux Toolkit and TanStack Query for
                  state, Radix and shadcn composition patterns for primitives, Zod
                  at the boundaries, REST and GraphQL behind JWT, OAuth and RBAC.
                </p>
                <p>
                  The parts I care most about are the unglamorous ones: whether the
                  component library is actually reused, whether the accessibility
                  work was specified or retrofitted, whether the performance claim
                  is measured. Those three decide if a frontend is still good in a
                  year.
                </p>
                <p>
                  On projects with no dedicated designer I&rsquo;ll design the
                  screens in Figma first and then build them — which is where this
                  site came from too.
                </p>
              </Reveal>
            </div>

            {/* Principles */}
            <Reveal
              variant="fade-up"
              stagger={{ selector: "[data-principle]", amount: 0.13 }}
              className="flex flex-col divide-y divide-white/[0.07] border-y border-white/[0.07]"
            >
              {PRINCIPLES.map((principle, index) => (
                <div
                  key={principle.title}
                  data-principle
                  className="group grid gap-2 py-6 sm:grid-cols-[auto_1fr] sm:gap-8"
                >
                  <span className="label-meta pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.01em] text-white transition-colors duration-500 group-hover:text-accent-300 sm:text-xl">
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[0.96rem] leading-relaxed text-ink-200">
                      {principle.body}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Education + certifications */}
        <Reveal
          variant="fade-up"
          stagger={{ selector: "[data-credential]", amount: 0.08 }}
          className="mt-20 grid gap-x-8 gap-y-8 border-t border-white/[0.07] pt-12 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CREDENTIALS.map((credential) => (
            <div
              key={credential.label}
              data-credential
              className="flex flex-col gap-1.5"
            >
              <span className="label-meta">{credential.meta}</span>
              <p className="text-[1rem] font-medium text-white">
                {credential.label}
              </p>
              <p className="text-[0.86rem] leading-relaxed text-ink-400">
                {credential.detail}
              </p>
            </div>
          ))}
        </Reveal>

        {/* Stats */}
        <Reveal
          variant="fade-up"
          stagger={{ selector: "[data-stat]", amount: 0.1 }}
          className="mt-16 grid grid-cols-2 gap-x-10 gap-y-10 border-t border-white/[0.07] pt-12 sm:mt-20 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} data-stat className="flex flex-col gap-2">
              {/* Capped below the column width: the widest figure here is
                  "100,000+", which at a larger size crowds the stat beside it. */}
              <p className="text-display text-[clamp(2.2rem,5vw,3.6rem)] text-white">
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="max-w-[16ch] text-[0.82rem] uppercase tracking-[0.14em] text-ink-400">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Toolbelt marquee — a full-bleed band, deliberately outside the grid. */}
      <div className="mt-20 border-y border-white/[0.06] py-6 sm:mt-28">
        <Marquee speed={40} itemClassName="items-center gap-12 pr-12">
          {TOOLBELT.map((tool) => (
            <span
              key={tool}
              className="flex items-center gap-12 whitespace-nowrap text-[clamp(1.1rem,2.4vw,1.7rem)] font-medium tracking-[-0.01em] text-ink-400"
            >
              {tool}
              <span className="h-1 w-1 rounded-full bg-accent-500" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
