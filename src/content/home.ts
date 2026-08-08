import { RESUME_PDF } from "./assets";

/**
 * Copy for the home route, section by section, in the order the page renders
 * them. Project records live in `projects.ts`, the career deck in `career.ts`
 * and the starter panel in `design-mcp.ts`; everything here is prose.
 *
 * Kept out of the components so a copy edit never touches markup.
 */

/** The wordmark. Read by both the header and the loader's banner tracks. */
export const BRAND = "ManshaQarib.";

export const NAV_LINKS = [
  { label: "About", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  eyebrow: "Mansha Qarib / Senior React Developer",
  title: "Systems, not screens.",
  text: "I build production frontends in React, TypeScript and Next.js — component libraries and data-heavy dashboards that stay maintainable at scale.",
  actions: {
    primary: { label: "View selected work", href: "#work" },
    secondary: { label: "View resume", href: RESUME_PDF },
  },
} as const;

/**
 * The perspective grid is 40 × 40. One constant shared by the markup and the
 * stylesheet's `repeat()` values.
 */
export const TILE_GRID = 40;

export const INTRO = {
  kicker: "The throughline",
  title: "The second screen is where it breaks.",
  text: "One screen is easy. The tenth is where duplication, drift and retrofitted accessibility show up. That is the work.",
} as const;

export const SIGNALS = [
  "Real primitives",
  "Typed boundaries",
  "WCAG 2.1 AA",
  "Measured budgets",
  "Fewer re-renders",
  "Rendering per route",
] as const;

/**
 * `size` maps to a column span in the 12-column bento.
 *
 * The titles are written to their column. The constraint is the widest *line*,
 * not the widest word: at the heading's scale the `small` tile holds about seven
 * characters and the `mid` tile about nine, and two short words on one line
 * blow that as easily as one long one — "Accessibility" overflowed outright, and
 * "Test, don't" cleared its column by a single pixel at one width.
 *
 * So the narrow tiles carry titles whose longest line is one short word. The
 * type is fixed and stays; the copy is what gives. Measure a replacement rather
 * than counting characters — this module cannot see the grid.
 */
export const STORY_CARDS = [
  {
    size: "wide",
    title: "Primitives first.",
    text: "Build the component once, properly, then compose.",
  },
  {
    size: "mid",
    title: "Usable by default.",
    text: "Specified up front, never retrofitted.",
  },
  {
    size: "small",
    title: "Measure it.",
    text: "Core Web Vitals over opinions about speed.",
  },
  {
    size: "long",
    title: "Type the boundary.",
    text: "Validate at the edge so it fails loudly, not three components deep.",
  },
  {
    size: "tall",
    title: "Own the ambiguity.",
    text: "No designer on the project? Then design it.",
  },
] as const;

export const SCRUB_LINE =
  "A component is done when the next screen can be assembled from it instead of written again.";

export const WORK_HEADING = {
  kicker: "Fifteen platforms",
  title: "Scale. Compliance. Speed.",
} as const;

export const CAPABILITIES_HEADING = {
  kicker: "How I work",
  title: "Primitives first. Access always. Performance measured.",
} as const;

export const CAPABILITIES = [
  {
    title: "Frontend architecture",
    text: "Rendering strategy chosen per route, not per app.",
  },
  {
    title: "Component systems",
    text: "Built once, documented in Storybook, composed after.",
  },
  {
    title: "Accessibility",
    text: "WCAG 2.1 AA specified up front, then tested.",
  },
  {
    title: "Performance",
    text: "Core Web Vitals, budgeted and measured.",
  },
] as const;

export const EXPERIENCE_KICKER = "Experience";

/**
 * One row per engagement, newest first.
 *
 * `company`, `role` and `detail` are what the section renders. `duration`,
 * `location`, `items` and `tech` are carried alongside them but not rendered —
 * the row is a three-column rule and adding a fourth is a design decision, not a
 * data one. They are here so that decision does not also require re-sourcing the
 * facts.
 */
export const EXPERIENCE_ROWS = [
  {
    company: "Independent",
    role: "Senior Frontend Engineer",
    detail:
      "Upwork Top Rated Plus. Four concurrent engagements across e-commerce, SaaS, fintech and healthcare, owning frontend architecture end to end.",
    duration: "Feb 2023 – Present",
    location: "Remote",
    items: [
      "Top Rated Plus freelancer delivering production apps for global clients",
      "Scalable full-stack applications on the Next.js App Router with MongoDB and Prisma ORM",
      "Redux slices for auth, dashboard filters, modals and notifications",
      "NextAuth.js for secure login flows across credentials and OAuth",
      "Modular frontend architecture using layouts and middleware",
      "GitHub Actions for CI/CD and the Serverless Framework for AWS Lambda deploys",
    ],
    tech: ["Next.js", "Redux Toolkit", "Node.js", "MongoDB", "Prisma", "NextAuth.js"],
  },
  {
    company: "Carbonic IT Solutions",
    role: "Web Developer",
    detail:
      "Client applications from Figma to production for US and UK clients, working directly with non-technical stakeholders.",
    duration: "2022 – Feb 2023",
    location: "Pakistan",
    items: [
      "Built and maintained web applications with performance and scalability as the brief",
      "Applied modern development practices and a clean code architecture",
      "Worked across functions to translate client requirements into delivery",
      "Built responsive interfaces with user experience as the constraint",
    ],
    tech: ["Laravel", "PHP", "JavaScript", "MySQL", "CSS", "HTML"],
  },
  {
    company: "VisionX",
    role: "Frontend Engineer",
    detail:
      "Three years across Halcyon, Ayshei and Morta — enterprise React, GraphQL and the reusable primitives underneath them.",
    duration: "2019 – 2022",
    location: "Pakistan",
    items: [
      "Developed and maintained applications in Laravel, on a modular architecture",
      "Implemented RESTful APIs to improve third-party integration",
      "Improved database efficiency through query optimisation and indexing",
      "Migrated legacy codebases to modern Laravel versions",
      "Built dynamic sites and custom CMS solutions in core PHP",
    ],
    tech: ["Laravel", "PHP", "REST APIs", "MySQL", "JavaScript", "CSS"],
  },
  {
    company: "Dixeam Inc",
    role: "Developer & Team Lead",
    detail:
      "SnapDebt and Moonrock on React, Node and Laravel. Led a small team and cut page load times by 30%.",
    duration: "2017 – 2019",
    location: "Pakistan",
    items: [
      "Led a team building scalable web solutions on modern PHP frameworks",
      "Architected backend services against security and performance requirements",
      "Introduced CI/CD workflows to streamline delivery",
      "Cut page load times by 30%",
      "Implemented RESTful APIs and integrated third-party services",
    ],
    tech: ["PHP", "Laravel", "MySQL", "JavaScript", "REST APIs", "CI/CD"],
  },
] as const;

export const PERSPECTIVE = {
  kicker: "Engineering perspective",
  title: "Decide the rendering before the layout.",
  text: "Pick the data boundary. Name the accessibility contract. Set the performance budget. Then the component is obvious.",
} as const;

export const CONTACT = {
  kicker: "Contact",
  title: "Building something that has to scale?",
  email: "manshaqarib@gmail.com",
  primary: "Email Mansha",
  secondary: { label: "View resume", href: RESUME_PDF },
} as const;

/** `short` is the glyph inside the circle; `label` doubles as the tooltip. */
export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    short: "gh",
    href: "https://github.com/manshaqarib777",
    external: true,
  },
  {
    label: "LinkedIn",
    short: "in",
    href: "https://linkedin.com/in/manshaqarib",
    external: true,
  },
  {
    label: "Upwork",
    short: "up",
    href: "https://www.upwork.com/freelancers/manshaqarib2",
    external: true,
  },
  {
    label: "Fiverr",
    short: "fv",
    href: "https://www.fiverr.com/laravelcoder777/",
    external: true,
  },
  {
    label: "Email",
    short: "@",
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
] as const;
