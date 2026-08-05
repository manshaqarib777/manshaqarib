"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "@/types";
import { useCursorProps } from "@/providers";
import { useIsMobile, useReducedMotion } from "@/hooks/useMediaQuery";

interface HorizontalShowcaseProps {
  projects: Project[];
}

/**
 * Pinned horizontal scroll strip.
 *
 * The section pins for exactly the track's overflow width, so vertical scroll
 * translates 1:1 into horizontal travel and the gesture never feels geared
 * wrong. `invalidateOnRefresh` recalculates that distance on resize — without it
 * the strip under- or over-shoots after any viewport change.
 *
 * On mobile the pin is skipped entirely in favour of native horizontal
 * scrolling with snap points: pinning fights the browser's own scroll on touch
 * and is the fastest way to make a page feel broken on a phone.
 */
export function HorizontalShowcase({ projects }: HorizontalShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const shouldPin = !isMobile && !prefersReducedMotion;

  // Two plates per project, not the whole gallery: the pin lasts exactly as long
  // as the track overflows, so every extra plate adds a viewport of scrolling the
  // visitor has to get through before the page moves on.
  const plates = projects.flatMap((project) =>
    [project.cover, project.gallery[0]]
      .filter(Boolean)
      .map((src, index) => ({ src, project, key: `${project.slug}-${index}` })),
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || !shouldPin) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // Pin for exactly the horizontal overflow: 1px of scroll = 1px of pan.
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [shouldPin, plates.length] },
  );

  return (
    <div
      ref={sectionRef}
      // Full viewport height while pinned, so the plates are vertically centred in
      // the window during the pan rather than sitting against its top edge.
      className={
        shouldPin
          ? "relative flex min-h-svh items-center overflow-hidden"
          : "relative overflow-hidden py-16 sm:py-20"
      }
      aria-label="Project imagery"
    >
      <div
        ref={trackRef}
        className={
          shouldPin
            ? "flex w-max items-center gap-5 px-5 will-change-transform sm:gap-7 sm:px-8 lg:px-12"
            : "flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:gap-7 sm:px-8 [&::-webkit-scrollbar]:hidden"
        }
      >
        {plates.map(({ src, project, key }, index) => (
          <Plate
            key={key}
            src={src}
            project={project}
            isLead={index % 3 === 0}
          />
        ))}
      </div>
    </div>
  );
}

function Plate({
  src,
  project,
  isLead,
}: {
  src: string;
  project: Project;
  isLead: boolean;
}) {
  const cursorProps = useCursorProps({
    variant: "text",
    label: project.title,
  });

  return (
    <Link
      href={`/work/${project.slug}`}
      {...cursorProps}
      className="group relative block shrink-0 snap-center overflow-hidden rounded-2xl border border-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400"
      style={{
        // Staggered plate sizes stop the strip reading as a uniform carousel.
        width: isLead ? "clamp(19rem, 62vw, 44rem)" : "clamp(15rem, 46vw, 30rem)",
        aspectRatio: isLead ? "16 / 10" : "4 / 5",
      }}
    >
      <Image
        src={src}
        alt={`${project.title} — ${project.discipline}`}
        fill
        sizes="(max-width: 640px) 62vw, 44rem"
        className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        loading="lazy"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent p-5">
        <div>
          <p className="text-base font-medium text-white sm:text-lg">
            {project.title}
          </p>
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-400">
            {project.discipline}
          </p>
        </div>
        <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-400">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
