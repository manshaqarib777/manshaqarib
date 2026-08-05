"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { HoverPreview } from "@/components/projects/HoverPreview";
import { HorizontalShowcase } from "@/components/projects/HorizontalShowcase";
import { PROJECTS } from "@/constants/projects";
import { SITE } from "@/constants/site";

/**
 * Work.
 *
 * Two passes over the same material, deliberately: an editorial index that reads
 * like a contents page (with a pointer-following preview), then a pinned
 * horizontal strip that lets the imagery speak on its own. The index is the
 * scannable route to a case study; the strip is the browsing route.
 *
 * `activeSlug` lives here rather than in each row so only one preview can ever be
 * live, and the preview component itself never re-mounts.
 */
export function Projects() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative py-28 sm:py-36 lg:py-44"
    >
      <div className="container-wide">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          titleId="work-heading"
          title="Platforms in production, and what actually changed."
          description="Real systems with real users behind them — fintech, marketplaces, security. Each one shipped, stayed shipped, and moved a number someone was accountable for."
        />
      </div>

      <div className="container-wide mt-16 lg:mt-24">
        <ul className="border-t border-white/[0.08]">
          {PROJECTS.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={index}
              onActivate={setActiveSlug}
            />
          ))}
        </ul>

        <Reveal variant="fade-up" className="mt-12 flex flex-wrap gap-3">
          <Button href={`mailto:${SITE.email}`} variant="outline" withArrow>
            Ask about NDA work
          </Button>
          <Button
            href="https://github.com/manshaqarib777"
            external
            variant="ghost"
            withArrow
          >
            More on GitHub
          </Button>
        </Reveal>
      </div>

      {/* Full-bleed: intentionally escapes the container. */}
      <HorizontalShowcase projects={PROJECTS} />

      <HoverPreview projects={PROJECTS} activeSlug={activeSlug} />
    </section>
  );
}
