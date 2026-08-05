/**
 * Single source of truth for identity + SEO.
 *
 * TODO before deploy: `url` must be your real domain — it feeds `metadataBase`,
 * every canonical tag, the sitemap and robots.txt.
 */
export const SITE = {
  name: "Mansha Qarib",
  /** Short mark used by the preloader + navbar logo. */
  initials: "MQ",
  role: "Senior React Developer",
  /** Longer form for the hero eyebrow and OG title. */
  specialism: "React · TypeScript · Next.js",
  description:
    "Mansha Qarib — Senior React developer with 8+ years building production frontends in React 19, TypeScript and Next.js App Router. Component libraries and data-heavy dashboards for platforms serving 700+ financial institutions and 100,000+ users.",
  location: "Riyadh, Saudi Arabia",
  /** IANA zone for the live clock. */
  timeZone: "Asia/Riyadh",
  timezone: "AST",
  email: "mansha.qarib777@gmail.com",
  phone: "+966 54 339 8604",
  availability: "Available immediately",
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

/** Rotating focus words in the hero's bottom meta rail. */
export const HERO_WORDS = [
  "React",
  "TypeScript",
  "Next.js",
  "Systems",
] as const;
