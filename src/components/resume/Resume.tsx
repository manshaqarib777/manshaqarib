"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { gsap, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";
import { SITE } from "@/constants/site";
import {
  ACHIEVEMENTS,
  CERTIFICATIONS,
  EDUCATION,
  RESUME_PDF,
  RESUME_ROLES,
  RESUME_SUMMARY,
  RESUME_SUMMARY_CONT,
  SKILL_MATRIX,
} from "@/constants/resume";
import { EASE } from "@/constants/motion";
import { useLoading } from "@/providers";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { padIndex } from "@/lib/utils";

const CONTACT = [
  { icon: FiMail, label: SITE.email, href: `mailto:${SITE.email}` },
  {
    icon: FiPhone,
    label: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
  },
  { icon: FiMapPin, label: SITE.location },
  {
    icon: FiLinkedin,
    label: "linkedin.com/in/manshaqarib",
    href: "https://linkedin.com/in/manshaqarib",
    external: true,
  },
  {
    icon: FiGithub,
    label: "github.com/manshaqarib777",
    href: "https://github.com/manshaqarib777",
    external: true,
  },
];

/**
 * Résumé page.
 *
 * Deliberately the *full* record, where the home page's timeline is an edited
 * highlight reel — someone who reaches this page has already decided they're
 * interested and wants detail, not persuasion.
 *
 * Shares the home page's shell, type scale, reveal primitives and motion
 * language, so it reads as the same site rather than a document bolted on. The
 * entrance timeline is gated on the preloader hand-off for the same reason the
 * hero's is: the page should already be moving as the overlay lifts.
 *
 * A print stylesheet in globals.css turns this into a clean paper document — a
 * résumé that can't be printed is a résumé with a missing feature.
 */
export function Resume() {
  const headerRef = useRef<HTMLElement>(null);
  const { isRevealing } = useLoading();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!isRevealing || prefersReducedMotion) return;

      const timeline = gsap.timeline({
        defaults: { ease: EASE.out, duration: 0.9 },
      });

      timeline
        .from("[data-resume-meta]", { y: 22, autoAlpha: 0, stagger: 0.06 })
        .from("[data-resume-contact]", { y: 16, autoAlpha: 0, stagger: 0.05 }, 0.25)
        .from("[data-resume-actions]", { y: 18, autoAlpha: 0 }, 0.45);

      return () => timeline.kill();
    },
    { dependencies: [isRevealing, prefersReducedMotion] },
  );

  return (
    <div className="resume-page">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="container-wide pt-32 sm:pt-40 lg:pt-48"
      >
        <div data-resume-meta className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/" className="label-meta transition-colors hover:text-white">
            ← Home
          </Link>
          <span className="h-px w-8 bg-white/18" aria-hidden />
          <span className="label-meta text-ink-200">Résumé</span>
        </div>

        <TextReveal
          as="h1"
          granularity="chars"
          onScroll={false}
          play={isRevealing || prefersReducedMotion}
          delay={0.1}
          className="text-display mt-8 text-[clamp(2.6rem,9vw,7.5rem)] text-white"
        >
          {SITE.name}
        </TextReveal>

        <p
          data-resume-meta
          className="mt-5 text-[1.05rem] text-accent-300 sm:text-[1.2rem]"
        >
          Senior React Developer · React.js · TypeScript · Redux Toolkit
        </p>

        {/* Contact rail */}
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {CONTACT.map((item) => (
            <li key={item.label} data-resume-contact>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="link-underline flex items-center gap-2.5 text-[0.92rem] text-ink-200 transition-colors hover:text-white"
                >
                  <item.icon aria-hidden className="shrink-0 text-ink-400" />
                  {item.label}
                </a>
              ) : (
                <span className="flex items-center gap-2.5 text-[0.92rem] text-ink-200">
                  <item.icon aria-hidden className="shrink-0 text-ink-400" />
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div
          data-resume-actions
          className="mt-10 flex flex-wrap items-center gap-3 print:hidden"
        >
          <Button href={RESUME_PDF} external size="md" withArrow>
            <span className="flex items-center gap-2">
              <FiDownload aria-hidden /> Download PDF
            </span>
          </Button>
          <Button href={`mailto:${SITE.email}`} variant="outline" size="md">
            Get in touch
          </Button>
        </div>

        {/* Summary */}
        <div className="mt-16 grid gap-6 border-y border-white/[0.07] py-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="label-meta">Professional summary</span>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-8">
            <TextReveal
              as="p"
              granularity="lines"
              className="text-[1.08rem] leading-relaxed text-white sm:text-[1.18rem]"
            >
              {RESUME_SUMMARY}
            </TextReveal>
            <TextReveal
              as="p"
              granularity="lines"
              delay={0.08}
              className="text-[1rem] leading-relaxed text-ink-200"
            >
              {RESUME_SUMMARY_CONT}
            </TextReveal>
            <Reveal variant="fade-up" delay={0.12}>
              <p className="text-[0.95rem] text-ink-400">
                Based in {SITE.location} with a transferable Iqama —{" "}
                <span className="text-accent-300">available immediately</span>.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ── Key achievements ──────────────────────────────────────────────── */}
      <section className="container-wide mt-24 sm:mt-32">
        <SectionHeading
          index="01"
          eyebrow="Key achievements"
          titleId="achievements-heading"
          title="Numbers someone else was accountable for."
        />

        <Reveal
          variant="fade-up"
          stagger={{ selector: "[data-achievement]", amount: 0.1 }}
          className="mt-14 flex flex-col divide-y divide-white/[0.07] border-y border-white/[0.07]"
        >
          {ACHIEVEMENTS.map((achievement) => (
            <div
              key={achievement.figure}
              data-achievement
              className="grid gap-4 py-8 sm:grid-cols-12 sm:gap-8"
            >
              <p className="text-display text-[clamp(2rem,5vw,3.2rem)] text-white sm:col-span-4">
                {achievement.figure}
              </p>
              <p className="max-w-2xl self-center text-[1rem] leading-relaxed text-ink-200 sm:col-span-8">
                {achievement.body}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Experience ────────────────────────────────────────────────────── */}
      <section className="container-wide mt-28 sm:mt-36">
        <SectionHeading
          index="02"
          eyebrow="Professional experience"
          titleId="experience-heading"
          title="Eight years, in full."
        />

        <div className="mt-14 flex flex-col gap-16 sm:gap-20">
          {RESUME_ROLES.map((role, roleIndex) => (
            <article
              key={`${role.company}-${role.period}`}
              className="grid gap-8 border-t border-white/[0.07] pt-10 lg:grid-cols-12 lg:gap-16"
            >
              {/* Role identity — sticky on desktop so it stays with its bullets. */}
              <div className="lg:col-span-4">
                <Reveal variant="fade-up" distance={22}>
                  <div className="flex flex-col gap-2 lg:sticky lg:top-28">
                    <span className="label-meta">{padIndex(roleIndex)}</span>
                    <h3 className="text-xl leading-snug tracking-[-0.02em] text-white sm:text-[1.4rem]">
                      {role.title}
                    </h3>
                    <p className="text-[1rem] text-accent-300">{role.company}</p>
                    {role.context && (
                      <p className="text-[0.88rem] text-ink-400">{role.context}</p>
                    )}
                    <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-200">
                      {role.period}
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className="flex flex-col gap-10 lg:col-span-8">
                <Reveal
                  variant="fade-up"
                  delay={0.06}
                  stagger={{ selector: "li", amount: 0.05 }}
                  as="ul"
                  className="flex flex-col gap-3.5"
                >
                  {role.bullets.map((bullet) => (
                    <li
                      key={bullet.slice(0, 40)}
                      className="flex gap-3.5 text-[0.98rem] leading-relaxed text-ink-200"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-accent-400"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </Reveal>

                {role.platforms && (
                  <Reveal
                    variant="fade-up"
                    delay={0.1}
                    stagger={{ selector: "[data-platform]", amount: 0.08 }}
                    className="flex flex-col gap-4"
                  >
                    <span className="label-meta">Platforms delivered</span>
                    <ul className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
                      {role.platforms.map((platform) => (
                        <li
                          key={platform.name}
                          data-platform
                          className="flex flex-col gap-1.5 py-4"
                        >
                          <div className="flex items-center gap-2.5">
                            {platform.url ? (
                              <a
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 text-[1rem] font-medium text-white"
                              >
                                <span className="link-underline">
                                  {platform.name}
                                </span>
                                <FiExternalLink
                                  aria-hidden
                                  className="text-ink-400 transition-colors group-hover:text-accent-300"
                                />
                              </a>
                            ) : (
                              <span className="text-[1rem] font-medium text-white">
                                {platform.name}
                              </span>
                            )}
                          </div>
                          <p className="max-w-2xl text-[0.94rem] leading-relaxed text-ink-400">
                            {platform.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Technical skills ──────────────────────────────────────────────── */}
      <section className="container-wide mt-28 sm:mt-36">
        <SectionHeading
          index="03"
          eyebrow="Technical skills"
          titleId="skills-matrix-heading"
          title="The full inventory."
          description="Grouped as the CV groups them — no ratings here, just what's actually been used in production."
        />

        <Reveal
          variant="fade-up"
          stagger={{ selector: "[data-skill-group]", amount: 0.07 }}
          className="mt-14 flex flex-col divide-y divide-white/[0.07] border-y border-white/[0.07]"
        >
          {SKILL_MATRIX.map((group) => (
            <div
              key={group.label}
              data-skill-group
              className="grid gap-4 py-7 sm:grid-cols-12 sm:gap-8"
            >
              <h3 className="label-meta pt-1 text-ink-200 sm:col-span-3">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2 sm:col-span-9">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Education & certifications ────────────────────────────────────── */}
      <section className="container-wide mt-28 sm:mt-36">
        <SectionHeading
          index="04"
          eyebrow="Education & certifications"
          titleId="credentials-heading"
          title="On paper."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="fade-up" className="lg:col-span-5">
            <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-8">
              <span className="label-meta">{EDUCATION.period}</span>
              <h3 className="text-xl tracking-[-0.02em] text-white sm:text-2xl">
                {EDUCATION.degree}
              </h3>
              <p className="text-[0.98rem] text-ink-200">
                {EDUCATION.institution}
              </p>
            </div>
          </Reveal>

          <Reveal
            variant="fade-up"
            delay={0.08}
            stagger={{ selector: "[data-cert]", amount: 0.08 }}
            className="lg:col-span-7"
          >
            <ul className="flex flex-col divide-y divide-white/[0.07] border-t border-white/[0.07]">
              {CERTIFICATIONS.map((certification) => (
                <li
                  key={certification.id}
                  data-cert
                  className="flex flex-col gap-1.5 py-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-[1.05rem] font-medium text-white">
                      {certification.name}
                    </h3>
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-200">
                      {certification.date}
                    </span>
                  </div>
                  <p className="text-[0.94rem] text-ink-400">
                    {certification.issuer}
                  </p>
                  <p className="font-mono text-[0.72rem] text-ink-400">
                    ID {certification.id}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Outro ─────────────────────────────────────────────────────────── */}
      <section className="mt-28 border-t border-white/[0.07] print:hidden sm:mt-36">
        <Link
          href="/#work"
          className="group block py-16 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400 sm:py-24"
        >
          <div className="container-wide flex flex-col gap-6">
            <span className="label-meta">See it in context</span>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-display text-[clamp(2.2rem,7vw,5.5rem)] text-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
                Selected work
              </h2>
              <span
                aria-hidden
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-white/40 group-hover:bg-white group-hover:text-ink-950"
              >
                <FiArrowRight className="h-5 w-5" />
              </span>
            </div>
            <p className="max-w-xl text-ink-400">
              Five platforms, with what actually changed on each.
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
}
