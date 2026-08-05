import type { ExperienceEntry, Stat } from "@/types";

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Independent — Upwork Top Rated Plus",
    role: "Senior Frontend / Full-Stack Engineer (Contract)",
    period: "Feb 2023 — Now",
    location: "Riyadh · Remote",
    summary:
      "Four concurrent client engagements across e-commerce, SaaS, fintech and healthcare, owning frontend architecture end to end — including the screens themselves on projects with no dedicated designer.",
    highlights: [
      "Shipped Lappeland, Neonbit, Emakity and Salearis on React and Next.js in TypeScript",
      "Built reusable component libraries documented in Storybook, so new screens assembled from existing primitives",
      "Doubled Lappeland's traffic post-launch through SSR and ISR rendering strategy, code splitting and Core Web Vitals tuning",
      "Delivered WCAG 2.1 AA deliberately: ARIA roles, keyboard navigation, focus management, contrast audits, screen reader testing",
      "Built real-time order, booking and notification views over WebSockets, with no polling",
      "Integrated REST and GraphQL behind JWT, OAuth and RBAC, including tenant-scoped views isolating each client's data",
    ],
  },
  {
    company: "Carbonic IT Solutions",
    role: "Web Developer (Frontend)",
    period: "2022 — Feb 2023",
    location: "Remote · US & UK clients",
    summary:
      "Client-facing web applications taken from Figma specification through to production, working directly with non-technical stakeholders rather than through a project layer.",
    highlights: [
      "Built JACOBS Drycleaners — a UK service-booking platform covering booking workflows, scheduling and customer records",
      "Built Global Shopaholic — an online shopping platform with payment gateway integration and order processing",
      "Translated designs to production without a handoff intermediary, which meant owning the ambiguity as well as the build",
    ],
  },
  {
    company: "VisionX",
    role: "Web Developer (Frontend)",
    period: "2019 — 2022",
    location: "Enterprise platforms",
    summary:
      "Three years of frontend engineering across three enterprise platforms in an Agile team, alongside architects, designers and backend engineers — and the tenure where code review became a habit rather than a step.",
    highlights: [
      "Halcyon: the React and Redux Toolkit interface through which 700+ financial institutions process millions in tax filings",
      "Ayshei: the React frontend for a marketplace serving 100,000+ users across four verticals, on GraphQL",
      "Morta: procurement, budgeting and stakeholder coordination modules on Next.js, TypeScript and GraphQL",
      "Reusable form and data-table components that removed duplicated UI code across dense filing workflows",
    ],
  },
  {
    company: "Dixeam Inc",
    role: "PHP / Laravel Developer",
    period: "2017 — 2019",
    location: "Team lead",
    summary:
      "Where the 8+ years start. Full-stack delivery on React, Node and Laravel, and the first time I was responsible for other people's code as well as my own.",
    highlights: [
      "Built SnapDebt — debt recovery for 10,000+ Florida businesses, covering automated collection workflows and compliance reporting",
      "Built Moonrock — a tenant and landlord property management app in React Native and TypeScript with Stripe rent payments",
      "Led a small development team and cut page load times by 30% through backend and query optimisation",
    ],
  },
];

export const STATS: Stat[] = [
  { label: "Years building production frontends", value: 8, suffix: "+" },
  { label: "Financial institutions on one platform", value: 700, suffix: "+" },
  { label: "Users served on a single marketplace", value: 100000, suffix: "+" },
  { label: "Faster page loads after optimisation", value: 30, suffix: "%" },
];

/** How the work gets done — the About section's manifesto. */
export const PRINCIPLES = [
  {
    title: "Ship from primitives, not markup",
    body: "A reusable component library documented in Storybook is not housekeeping — it's the difference between a new screen taking a day and taking a week. Forms, tables, modals and data displays get built once, properly, and then composed.",
  },
  {
    title: "Accessibility is a deliverable",
    body: "WCAG 2.1 AA deliberately rather than incidentally: ARIA roles, keyboard navigation, focus management, contrast audits and actual screen reader testing. It's specified up front, because retrofitting it costs several times more than building it.",
  },
  {
    title: "Performance is measured, not felt",
    body: "Core Web Vitals, rendering strategy per route, code splitting, and queries that ask for what the page renders. Doubling a client's traffic came from measurement and architecture, not from an opinion about what felt slow.",
  },
];

/** Education and certifications, shown as a compact rail in About. */
export const CREDENTIALS = [
  {
    label: "BSc Computer Science",
    detail: "University of Sargodha, Pakistan",
    meta: "2016 — 2020",
  },
  {
    label: "Frontend Developer (React)",
    detail: "HackerRank Role Certification",
    meta: "Dec 2025",
  },
  {
    label: "Software Engineer",
    detail: "HackerRank Role Certification — problem solving, SQL, REST API",
    meta: "Jul 2026",
  },
  {
    label: "Node.js",
    detail: "HackerRank Skill Certification",
    meta: "Jul 2026",
  },
];
