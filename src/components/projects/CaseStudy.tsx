"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";
import { gsap, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Counter } from "@/components/ui/Counter";
import { imageMask, parallax } from "@/animations/reveal";
import { EASE } from "@/constants/motion";
import { useLoading } from "@/providers";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import type { Project } from "@/types";
import { padIndex } from "@/lib/utils";

interface CaseStudyProps {
  project: Project;
  next: Project;
}

/**
 * Case study.
 *
 * The entrance is one timeline so the page arrives as a composed shot: meta rail
 * first, then the title's lines, then the cover unmasking while its image
 * counter-scales. Sequencing these separately would make the page assemble in
 * whatever order the triggers happened to fire.
 *
 * Every metric value is parsed for a leading number so figures count up while the
 * unit ("+38%", "0.8s") stays intact — the animation follows the content rather
 * than the content being shaped to fit the animation.
 */
export function CaseStudy({ project, next }: CaseStudyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const coverFrameRef = useRef<HTMLDivElement>(null);
  const coverImageRef = useRef<HTMLDivElement>(null);
  const { isRevealing } = useLoading();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!isRevealing || prefersReducedMotion) return;

      const timeline = gsap.timeline({
        defaults: { ease: EASE.out, duration: 1 },
      });

      timeline
        .from("[data-case-meta]", {
          y: 24,
          autoAlpha: 0,
          stagger: 0.07,
          duration: 0.9,
        })
        .from("[data-case-actions]", { y: 20, autoAlpha: 0 }, 0.3);

      const cover = coverFrameRef.current
        ? imageMask(coverFrameRef.current, coverImageRef.current, {
            start: "top 95%",
            delay: 0.15,
          })
        : null;

      const drift = coverImageRef.current
        ? parallax(coverImageRef.current, {
            amount: 90,
            trigger: coverFrameRef.current,
          })
        : null;

      return () => {
        timeline.kill();
        cover?.kill();
        drift?.kill();
      };
    },
    { dependencies: [isRevealing, prefersReducedMotion] },
  );

  return (
    <div ref={rootRef}>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="container-wide pt-32 sm:pt-40 lg:pt-48">
        <div data-case-meta className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            href="/#work"
            className="label-meta transition-colors hover:text-white"
          >
            ← All work
          </Link>
          <span className="h-px w-8 bg-white/18" aria-hidden />
          <span className="label-meta text-ink-200">{project.discipline}</span>
        </div>

        <TextReveal
          as="h1"
          granularity="lines"
          onScroll={false}
          play={isRevealing || prefersReducedMotion}
          delay={0.15}
          className="text-display mt-8 max-w-[16ch] text-[clamp(2.8rem,10vw,8.5rem)] text-white"
        >
          {project.title}
        </TextReveal>

        <p
          data-case-meta
          className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-ink-200 sm:text-[1.15rem]"
        >
          {project.summary}
        </p>

        <div
          data-case-actions
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          {project.liveUrl && (
            <Button href={project.liveUrl} external size="md" withArrow>
              <span className="flex items-center gap-2">
                <FiExternalLink aria-hidden /> Live site
              </span>
            </Button>
          )}
          {project.repoUrl && (
            <Button href={project.repoUrl} external size="md" variant="outline">
              <span className="flex items-center gap-2">
                <FiGithub aria-hidden /> Source
              </span>
            </Button>
          )}
        </div>

        {/* Fact rail */}
        <dl
          data-case-meta
          className="mt-14 grid gap-x-8 gap-y-8 border-y border-white/[0.07] py-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: "Client", value: project.client },
            { label: "Role", value: project.role },
            { label: "Year", value: project.year },
            { label: "Discipline", value: project.discipline },
          ].map((fact) => (
            <div key={fact.label} className="flex flex-col gap-2">
              <dt className="label-meta">{fact.label}</dt>
              <dd className="text-[0.98rem] text-white">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ── Cover ─────────────────────────────────────────────────────────── */}
      <div className="container-wide mt-14 sm:mt-20">
        <div
          ref={coverFrameRef}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900"
          style={{ clipPath: "inset(0% 0% 0% 0% round 1rem)" }}
        >
          <div ref={coverImageRef} className="absolute inset-[-6%]">
            <Image
              src={project.cover}
              alt={`${project.title} — cover`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── Metrics ───────────────────────────────────────────────────────── */}
      {/* Only rendered when there are figures worth standing behind — projects
          without hard numbers skip the block rather than pad it. A wrapping flex
          row (not a fixed grid) means one metric and three both look deliberate. */}
      {project.metrics.length > 0 && (
        <section aria-label="Outcomes" className="container-wide mt-20 sm:mt-28">
          <Reveal
            variant="fade-up"
            stagger={{ selector: "[data-metric]", amount: 0.1 }}
            className="flex flex-wrap gap-x-16 gap-y-10 border-y border-white/[0.07] py-12"
          >
            {project.metrics.map((metric) => (
              <div key={metric.label} data-metric className="flex flex-col gap-2">
                <p className="text-display text-[clamp(2.2rem,5vw,3.6rem)] text-white">
                  <MetricValue value={metric.value} />
                </p>
                <p className="text-[0.82rem] uppercase tracking-[0.14em] text-ink-400">
                  {metric.label}
                </p>
              </div>
            ))}
          </Reveal>
        </section>
      )}

      {/* ── Chapters + gallery, interleaved ──────────────────────────────── */}
      <div className="container-wide mt-20 flex flex-col gap-20 sm:mt-28 sm:gap-28">
        {project.chapters.map((chapter, index) => (
          <section
            key={chapter.heading}
            className="grid gap-8 lg:grid-cols-12 lg:gap-16"
          >
            <div className="lg:col-span-4">
              <Reveal variant="fade-up">
                <div className="flex items-baseline gap-4 lg:sticky lg:top-28">
                  <span className="label-meta">{padIndex(index)}</span>
                  <h2 className="text-2xl tracking-[-0.02em] text-white sm:text-3xl">
                    {chapter.heading}
                  </h2>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
              {chapter.body.map((paragraph, paragraphIndex) => (
                <TextReveal
                  key={paragraph.slice(0, 24)}
                  as="p"
                  granularity="lines"
                  delay={paragraphIndex * 0.05}
                  className="text-[1.02rem] leading-relaxed text-ink-200 sm:text-[1.1rem]"
                >
                  {paragraph}
                </TextReveal>
              ))}

              {/* One gallery plate per chapter, where one exists. */}
              {project.gallery[index] && (
                <GalleryPlate
                  src={project.gallery[index]}
                  alt={`${project.title} — ${chapter.heading}`}
                />
              )}
            </div>
          </section>
        ))}
      </div>

      {/* ── Stack ─────────────────────────────────────────────────────────── */}
      <section className="container-wide mt-24 sm:mt-32">
        <Reveal variant="fade-up" className="flex flex-col gap-6">
          <span className="label-meta">Built with</span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} className="px-4 py-2 text-[0.72rem]">
                {tech}
              </Badge>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Next project ──────────────────────────────────────────────────── */}
      <section className="mt-28 border-t border-white/[0.07] sm:mt-36">
        <Link
          href={`/work/${next.slug}`}
          className="group block py-16 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400 sm:py-24"
        >
          <div className="container-wide flex flex-col gap-6">
            <span className="label-meta">Next project</span>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-display text-[clamp(2.4rem,8vw,6.5rem)] text-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
                {next.title}
              </h2>
              <span
                aria-hidden
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-white/40 group-hover:bg-white group-hover:text-ink-950"
              >
                <FiArrowRight className="h-5 w-5" />
              </span>
            </div>
            <p className="max-w-xl text-ink-400">{next.excerpt}</p>
          </div>
        </Link>
      </section>
    </div>
  );
}

/**
 * Splits a metric like "700+", "100,000+", "2×" or "30%" into its leading number
 * and its unit, so the number can count up while the unit stays put. Anything
 * without a leading number (e.g. "Millions") renders unchanged.
 *
 * The digit group accepts commas so an already-grouped figure is captured whole —
 * without that, "100,000+" would count to 100 and print ",000+" beside it.
 */
function MetricValue({ value }: { value: string }) {
  const match = value.match(/^([^\d-]*)(-?[\d.,]+)(.*)$/);
  if (!match) return <>{value}</>;

  const [, prefix, digits, suffix] = match;
  const numeric = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(numeric) || !Number.isInteger(numeric)) {
    return <>{value}</>;
  }

  return <Counter value={numeric} prefix={prefix} suffix={suffix} />;
}

/** Gallery image with its own mask reveal. */
function GalleryPlate({ src, alt }: { src: string; alt: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !frameRef.current) return;
      const mask = imageMask(frameRef.current, imageRef.current);
      return () => mask.kill();
    },
    { dependencies: [prefersReducedMotion] },
  );

  return (
    <div
      ref={frameRef}
      className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900"
      style={{ clipPath: "inset(0% 0% 0% 0% round 1rem)" }}
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 92vw, 58vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}
