import type { SkillGroup } from "@/types";

/**
 * Skill groups drawn from the CV's technical inventory.
 *
 * NOTE ON `level`: these 0–100 values are an editorial judgement, not a measured
 * figure — a CV lists what you know, not a self-rating. Read them as relative
 * depth across this specific set and adjust them to taste; the section's copy
 * frames them as confidence rather than credentials for exactly that reason.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    caption: "React and Next.js, at production scale.",
    skills: [
      { name: "React 18 / 19", level: 97 },
      { name: "TypeScript", level: 95 },
      { name: "Next.js App Router", level: 94 },
      { name: "Component libraries", level: 93 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Radix UI / shadcn", level: 88 },
    ],
  },
  {
    title: "State & Data",
    caption: "Keeping server state and client state honest about which is which.",
    skills: [
      { name: "Redux Toolkit", level: 96 },
      { name: "TanStack Query", level: 91 },
      { name: "REST integration", level: 94 },
      { name: "GraphQL", level: 87 },
      { name: "Zod validation", level: 89 },
      { name: "WebSockets", level: 83 },
    ],
  },
  {
    title: "Platform & Quality",
    caption: "The parts that decide whether it survives contact with users.",
    skills: [
      { name: "Core Web Vitals", level: 92 },
      { name: "WCAG 2.1 AA", level: 90 },
      { name: "Node.js / NestJS", level: 86 },
      { name: "Playwright / Vitest", level: 88 },
      { name: "CI/CD (GitHub Actions)", level: 87 },
      { name: "Prisma / PostgreSQL", level: 84 },
    ],
  },
];

/** Full-bleed marquee band under the About section. */
export const TOOLBELT = [
  "React",
  "Next.js",
  "TypeScript",
  "Redux Toolkit",
  "TanStack Query",
  "Tailwind CSS",
  "Radix UI",
  "Storybook",
  "Node.js",
  "NestJS",
  "Prisma",
  "PostgreSQL",
  "GraphQL",
  "Playwright",
  "Vitest",
  "Docker",
  "AWS",
  "Vercel",
  "Figma",
] as const;
