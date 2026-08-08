import type { MetadataRoute } from "next";
import { PROJECTS } from "@/content/projects";
import { getCaseStudy } from "@/content/case-studies";
import { SITE } from "@/content/site";

/**
 * Every URL the site actually serves, and no others.
 *
 * The projects come from `@/content/projects` — the same record the work section
 * and the case pages render from — And a project only appears here if it has
 * a written case study, because `/work/[slug]` sets `dynamicParams = false` and
 * would 404 on a slug it never built. A sitemap that lists a 404 is worse than a
 * short sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...PROJECTS.filter((project) => getCaseStudy(project.slug)).map(
      (project) => ({
        url: `${SITE.url}/work/${project.slug}`,
        lastModified,
        changeFrequency: "yearly" as const,
        priority: 0.8,
      }),
    ),
  ];
}
