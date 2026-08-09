import { RESUME_PDF } from "./assets";

/**
 * Copy for the home route, section by section, in the order the page renders
 * them. Project records live in `projects.ts` and the career deck in
 * `career.ts`; everything here is prose.
 *
 * Kept out of the components so a copy edit never touches markup.
 *
 * The page makes one argument in eight beats, and each beat has its own job.
 * Nothing should say the same thing twice — the sections used to state the same
 * three claims (primitives, accessibility, performance) four times over, in the
 * marquee, the bento, the capabilities heading and the capability cards, which
 * read as padding rather than emphasis. The registers now are:
 *
 *   marquee        the stack, as nouns
 *   bento          the principles
 *   capabilities   what an engagement actually is
 *   perspective    the single idea underneath all of it
 *
 * If a new claim belongs in more than one of those, it belongs in one.
 */

/** The wordmark. Read by both the header and the loader's banner tracks. */
export const BRAND = "ManshaQarib.";

/** In page order, so the nav reads down the document rather than across it. */
export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  eyebrow: "Mansha Qarib / Senior React Developer",
  title: "Systems, not screens.",
  text: "I build production frontends in React, TypeScript and Next.js — component libraries, data-heavy dashboards, and the rendering decisions that keep them fast once there are forty screens instead of four.",
  actions: {
    primary: { label: "See selected work", href: "#work" },
    secondary: { label: "Download resume", href: RESUME_PDF },
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

/**
 * The marquee, which is `aria-hidden` decoration — so it carries the stack as
 * plain nouns rather than claims. Every entry appears in a shipped project in
 * `projects.ts` or `career.ts`; nothing aspirational goes in this list.
 */
export const SIGNALS = [
  "React",
  "Next.js App Router",
  "TypeScript",
  "Redux Toolkit",
  "GraphQL",
  "Node.js",
  "Prisma",
  "Storybook",
  "Tailwind",
  "React Native",
] as const;

/**
 * `size` maps to a column span in the 12-column bento, and also to a type scale
 * — see `storyCardClass` in `../components/home/styles.ts`.
 *
 * The narrow tiles used to carry the heading at the same size as the wide ones,
 * which meant the copy had to be measured against the column by hand: the note
 * that used to live here counted characters, and "Measure it." still broke
 * mid-word into "Measur / e it." at 1440px. The scale now steps down with the
 * span, so a title of this length fits any tile and the copy is free again.
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
    text: "Specified with the component, not audited after it.",
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
  kicker: "Selected work",
  title: "Four builds, and what made each one hard.",
} as const;

/**
 * The heading over the index of everything the featured rows leave out.
 *
 * The work section renders four projects in full. Ten more are real, shipped and
 * recorded in `projects.ts`, and five of those have written case studies — but
 * before this index existed the only way to reach any of them was to drag the
 * career deck, and five were linked from nowhere at all.
 */
export const WORK_INDEX_HEADING = {
  kicker: "Also shipped",
  title: "The rest of it.",
} as const;

export const CAPABILITIES_HEADING = {
  kicker: "How I work",
  title: "What I usually get brought in to do.",
} as const;

/**
 * Deliberately not the principles again — those are the bento above. These are
 * the four shapes an engagement actually takes, each one drawn from a row in
 * `EXPERIENCE_ROWS` or a brief in `projects.ts`.
 */
export const CAPABILITIES = [
  {
    title: "Own the frontend",
    text: "Architecture, rendering strategy and delivery — often as the only frontend engineer on the project.",
  },
  {
    title: "Build the component system",
    text: "One set of primitives, documented in Storybook, so the tenth screen is assembly rather than authoring.",
  },
  {
    title: "Untangle what exists",
    text: "Validation duplicated across modules, components that have drifted, one rendering mode picked for a whole site.",
  },
  {
    title: "Work without a spec",
    text: "Straight with non-technical stakeholders — from a Figma file, or from a conversation, to production.",
  },
] as const;

export const EXPERIENCE_KICKER = "Experience";

/**
 * One row per engagement, newest first.
 *
 * `company`, `duration`, `role` and `detail` are what the section renders. The
 * dates used to be carried here and not shown, which left a career section with
 * no dates in it — the one thing a reader scans for. They now sit under the
 * company name rather than in a fourth column, so the three-column rule is
 * unchanged.
 *
 * `location`, `items` and `tech` are still carried but not rendered. They are
 * here so that adding a detail view later does not require re-sourcing the
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
      "Client work for US and UK businesses, taken from a Figma file to production with no technical intermediary in between.",
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
      "Three years across Halcyon, Ayshei and Morta — enterprise React, GraphQL, and the reusable form and table primitives underneath them.",
    duration: "2019 – 2022",
    location: "Pakistan",
    items: [
      "Enterprise React frontends for tax filing, marketplace and construction-tech products",
      "Reusable form and data-table primitives that removed duplicated UI across modules",
      "GraphQL data layer, so cross-module reads cost one round trip instead of several",
      "Normalised Redux Toolkit store as the single home for a record",
      "Component library documented in Storybook, with Jest and Cypress coverage",
    ],
    tech: ["React", "GraphQL", "Redux Toolkit", "Node.js", "Storybook", "TypeScript"],
  },
  {
    company: "Dixeam Inc",
    role: "Developer & Team Lead",
    detail:
      "SnapDebt and Moonrock on React, Node and Laravel. Led a small team, introduced CI/CD, and cut page load times by 30%.",
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
  title: "Tell me what you're building.",
  /**
   * What a reader actually wants to know before writing, and nothing more. No
   * response-time promise: there is no evidence for one, and an invented SLA is
   * the fastest way to look like every other portfolio.
   */
  note: "Contract and freelance frontend work, remote.",
  email: "manshaqarib@gmail.com",
  primary: "Email me",
  secondary: { label: "Download resume", href: RESUME_PDF },
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
] as const;
