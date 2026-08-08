/**
 * Identity and SEO — the single source of truth for anything that names the
 * site rather than describing its content.
 *
 * Page copy does not live here; it lives with the section that renders it, in
 * `src/content`. This is only what metadata, the sitemap and robots.txt need.
 *
 * `url` feeds `metadataBase`, every canonical tag, the sitemap and robots.txt,
 * so it must be the real production domain.
 */
export const SITE = {
  name: "Mansha Qarib",
  role: "Senior React Developer",
  description:
    "Mansha Qarib — Senior React developer with 8+ years building production frontends in React 19, TypeScript and Next.js App Router. Component libraries and data-heavy dashboards for platforms serving 700+ financial institutions and 100,000+ users.",
  email: "manshaqarib@gmail.com",
  url: "https://manshaqarib.com",
  keywords: [
    "senior react developer",
    "react developer",
    "typescript",
    "next.js app router",
    "redux toolkit",
    "tanstack query",
    "frontend engineer",
    "design systems",
    "component libraries",
    "riyadh",
    "saudi arabia",
  ],
} as const;
