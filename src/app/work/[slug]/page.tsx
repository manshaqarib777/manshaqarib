import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/styles/case-study.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CaseClosing } from "@/components/case-study/sections/CaseClosing";
import { CaseHero } from "@/components/case-study/sections/CaseHero";
import { CaseProduct } from "@/components/case-study/sections/CaseProduct";
import { CaseStoryIntro } from "@/components/case-study/sections/CaseStoryIntro";
import { getCaseStudy } from "@/content/case-studies";
import { PROJECTS } from "@/content/projects";

/**
 * A written case study.
 *
 * The facts come from `@/content/projects` — the same record the work section
 * renders from, so a metric is written once — and the narrative from
 * `@/content/case-studies`. Every narrative section is optional and renders only
 * when it has content, so a project without a screen-by-screen story simply has
 * no product section.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Only projects that have both facts and a written case study get a page. */
const CASE_SLUGS = PROJECTS.filter((project) => getCaseStudy(project.slug)).map(
  (project) => project.slug,
);

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.slug === slug);

  if (!project) return { title: "Case study not found" };

  return {
    title: `${project.title} — ${project.discipline}`,
    description: project.challenge,
    alternates: { canonical: `/work/${slug}` },
  };
}

/** The theme shell, kept in step with the one on the home page. */
const SHELL = [
  "portfolio case-page relative block bg-charcoal font-display",
  "tracking-[0px] text-ink [--fade-stop:#030508]",
  "[font-synthesis:none] [overflow-x:clip]",
].join(" ");

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.slug === slug);
  const study = project ? getCaseStudy(slug) : undefined;

  if (!project || !study) notFound();

  return (
    <main className={SHELL} data-case={slug} id="main">
      {/* Literally the same header as the home page. Reusing it keeps this the
          page's own chrome rather than a lookalike built for one route.

          Only the sections that actually rendered get a link: a case study with
          no screen-by-screen story would otherwise advertise an anchor that is
          not on the page. */}
      <SiteHeader
        brandHref="/"
        currentHref="#overview"
        links={[
          { label: "Overview", href: "#overview" },
          ...(study.screens?.length
            ? [{ label: "Product", href: "#product" }]
            : []),
          ...(study.decisions?.length
            ? [{ label: "Decisions", href: "#decisions" }]
            : []),
        ]}
      />

      <CaseHero project={project} study={study} />
      <CaseStoryIntro project={project} study={study} />
      <CaseProduct project={project} study={study} />
      <CaseClosing study={study} />
    </main>
  );
}
