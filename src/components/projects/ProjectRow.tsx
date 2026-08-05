"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";
import { gsap, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types";
import { useCursor } from "@/providers";
import { useIsTouch, useReducedMotion } from "@/hooks/useMediaQuery";
import { cn, padIndex } from "@/lib/utils";

interface ProjectRowProps {
  project: Project;
  index: number;
  onActivate: (slug: string | null) => void;
}

/**
 * One row of the project index.
 *
 * The whole row is a single link to the case study; the live/repo links sit
 * inside it as separate anchors, so their clicks are stopped from bubbling to
 * avoid a double navigation.
 *
 * On desktop the row title slides right and dims its neighbours via the parent's
 * hover state; on touch the cover renders inline instead, since there is no
 * pointer to follow.
 */
export function ProjectRow({ project, index, onActivate }: ProjectRowProps) {
  const rowRef = useRef<HTMLLIElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { setCursor, resetCursor } = useCursor();
  const isTouch = useIsTouch();
  const prefersReducedMotion = useReducedMotion();

  // Row entrance — clip reveal from below, so rows unroll into place.
  useGSAP(
    () => {
      if (prefersReducedMotion || !rowRef.current) return;

      const tween = gsap.from(rowRef.current, {
        yPercent: 18,
        autoAlpha: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: rowRef.current, start: "top 92%", once: true },
      });

      return () => tween.kill();
    },
    { dependencies: [prefersReducedMotion] },
  );

  const onEnter = () => {
    onActivate(project.slug);
    if (!isTouch) setCursor({ variant: "text", label: "Case study" });
    if (!prefersReducedMotion && !isTouch) {
      gsap.to(titleRef.current, { x: 22, duration: 0.7, ease: "expo.out" });
    }
  };

  const onLeave = () => {
    onActivate(null);
    resetCursor();
    if (!prefersReducedMotion && !isTouch) {
      gsap.to(titleRef.current, { x: 0, duration: 0.7, ease: "expo.out" });
    }
  };

  return (
    <li
      ref={rowRef}
      className="group relative border-b border-white/[0.08]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link
        href={`/work/${project.slug}`}
        onFocus={onEnter}
        onBlur={onLeave}
        className="block py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400 sm:py-10"
        aria-label={`${project.title} — ${project.discipline}, ${project.year}. Read the case study.`}
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Index + title */}
          {/* Top-aligned, not baseline-aligned: against a 4.6rem title a shared
              baseline drops the index to the bottom of the row and reads like a
              mistake. */}
          <div className="flex items-start gap-5 lg:col-span-6">
            <span className="label-meta pt-[0.45em]">{padIndex(index)}</span>
            <h3
              ref={titleRef}
              className={cn(
                "text-display text-[clamp(2rem,6.4vw,4.6rem)] leading-[0.95] text-white",
                "transition-colors duration-500 lg:group-hover:text-white",
              )}
            >
              {project.title}
            </h3>
          </div>

          {/* Mobile / touch cover */}
          {isTouch && (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <Image
                src={project.cover}
                alt={`${project.title} cover`}
                fill
                sizes="90vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-col gap-3 lg:col-span-4">
            <p className="text-[0.95rem] text-ink-200">{project.excerpt}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
              {project.stack.length > 3 && (
                <Badge tone="accent">+{project.stack.length - 3}</Badge>
              )}
            </div>
          </div>

          {/* Year + arrow */}
          <div className="flex items-center justify-between gap-4 lg:col-span-2 lg:justify-end">
            <span className="label-meta">{project.year}</span>
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-white/40 group-hover:bg-white group-hover:text-ink-950"
            >
              <FiArrowUpRight />
            </span>
          </div>
        </div>
      </Link>

      {/* External links live outside the case-study link's flow. */}
      {(project.liveUrl || project.repoUrl) && (
        <div className="mb-8 flex flex-wrap items-center gap-2 lg:absolute lg:bottom-3 lg:left-[4.2rem] lg:mb-0 lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-ink-200 transition-colors hover:border-white/35 hover:text-white"
            >
              <FiExternalLink aria-hidden /> Live
              <span className="sr-only"> demo of {project.title}</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-ink-200 transition-colors hover:border-white/35 hover:text-white"
            >
              <FiGithub aria-hidden /> Code
              <span className="sr-only"> repository for {project.title}</span>
            </a>
          )}
        </div>
      )}
    </li>
  );
}
