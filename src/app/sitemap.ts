import type { MetadataRoute } from "next";
import { PROJECTS } from "@/constants/projects";
import { SITE } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/ashish-2`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...PROJECTS.map((project) => ({
      url: `${SITE.url}/work/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
