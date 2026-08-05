"use client";

import type { ReactNode } from "react";
import { TextReveal } from "./TextReveal";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Editorial index, e.g. "02". */
  index: string;
  eyebrow: string;
  title: string;
  /** Id for the generated `<h2>`, so sections can use `aria-labelledby`. */
  titleId?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

/**
 * Shared section header: index, eyebrow, split-line title, optional lede.
 * Using one component for all six sections is what keeps the vertical rhythm
 * identical down the page.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  titleId,
  description,
  align = "left",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal variant="fade-up" distance={20} duration={0.8}>
        <div className="flex items-center gap-4">
          <span className="label-meta">{index}</span>
          <span className="h-px w-10 bg-white/18" aria-hidden />
          <span className="label-meta text-ink-200">{eyebrow}</span>
        </div>
      </Reveal>

      <TextReveal
        as="h2"
        id={titleId}
        granularity="lines"
        className="text-display max-w-4xl text-[clamp(2.4rem,7vw,5.4rem)] text-white"
      >
        {title}
      </TextReveal>

      {description && (
        <Reveal variant="fade-up" delay={0.12}>
          <p
            className={cn(
              "max-w-2xl text-balance text-[1.02rem] leading-relaxed text-ink-200 sm:text-[1.1rem]",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}

      {children}
    </header>
  );
}
