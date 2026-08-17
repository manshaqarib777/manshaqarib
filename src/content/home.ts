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
 *
 * The argument itself was reframed to match the CV, which leads on
 * AI-integrated full-stack delivery rather than frontend alone. The throughline
 * is no longer "the second screen is where it breaks" (component reuse) but
 * "the demo is not the hard part" (getting an LLM feature to survive production).
 * Every AI claim below is backed by a shipped build recorded in `projects.ts`:
 * the RAG assistant on Emakity/Salearis, the vision-to-listing generator and
 * pgvector search on Ayshei, and the return summariser and text-to-SQL on
 * Halcyon. Nothing here is a capability that has not gone live somewhere.
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
  eyebrow: "Mansha Qarib / Full-Stack & AI Engineer",
  /**
   * One entry per rendered line, so the break is authored rather than left to
   * wrapping. Keep each line under about 13 characters: the h1 tops out at
   * 132px in a 980px column, so a longer line re-wraps and the count is wrong.
   */
  titleLines: ["Systems that", "do the work."],
  text: "I build production applications end to end — React and Next.js in front, Node.js and Laravel behind — and the AI inside them: retrieval assistants grounded in your own documents, structured extraction from images and PDFs, and plain-English queries against a real schema.",
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
  title: "The demo is not the hard part.",
  text: "A model call in a notebook takes an afternoon. Making it answer from your data, fail where someone can see it, and hold up on the tenth edge case is the work.",
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
  "OpenAI API",
  "Anthropic API",
  "RAG",
  "pgvector",
  "LangChain",
  "Node.js",
  "Laravel",
  "GraphQL",
  "Prisma",
  "Redux Toolkit",
  "Tailwind",
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
    title: "Retrieval first.",
    text: "Ground the answer in your documents, not the model's memory.",
  },
  {
    size: "mid",
    title: "Fail out loud.",
    text: "A silent automation is worse than no automation.",
  },
  {
    size: "small",
    title: "Measure it.",
    text: "Evals before trust, not opinions about output.",
  },
  {
    size: "long",
    title: "Type the boundary.",
    text: "Structured output, validated at the edge, so a bad generation fails loudly rather than three steps later.",
  },
  {
    size: "tall",
    title: "Own the ambiguity.",
    text: "No spec on the project? Then write one.",
  },
] as const;

export const SCRUB_LINE =
  "An automation is finished when nobody on the team remembers doing that job by hand.";

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
    title: "Automate the manual work",
    text: "Support queues, data entry, document review — the jobs someone repeats daily because nobody has modelled them yet.",
  },
  {
    title: "Ship AI into production",
    text: "RAG over your own documents, structured extraction from images and PDFs, semantic search, plain-English queries against a real schema.",
  },
  {
    title: "Own the whole stack",
    text: "React and Next.js in front, Node.js or Laravel behind, deployment and CI/CD included — often as the only engineer on the project.",
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
    company: "Qualascend",
    role: "Senior Full Stack Engineer",
    detail:
      "Full-stack delivery for a product studio out of Dubai Silicon Oasis — client web and mobile applications, plus cloud migration work, taken from a brief to production for clients in the Middle East, US and Europe.",
    duration: "Aug 2024 – Present",
    location: "Dubai, UAE · Remote",
    items: [
      "React and Next.js applications over Node.js APIs, deployed on AWS and Azure",
      "Cloud migration and maintenance engagements, starting from readiness assessment and TCO",
      "Client projects owned end to end, from the first scope conversation to launch",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "AWS", "Azure"],
  },
  {
    company: "AFIA Insurance L.L.C",
    role: "Senior Software Engineer",
    detail:
      "Frontend for InsuranceMarket.ae, the brand AFIA trades under — quote journeys and policy management for a Central Bank–regulated UAE brokerage.",
    duration: "Mar 2023 – Jul 2024",
    location: "Dubai, UAE · Remote",
    items: [
      "Multi-step quote journeys across motor, health and home lines",
      "Policy management and renewal surfaces on a React and TypeScript front end",
      "Form state modelled once and reused across product lines rather than forked per line",
    ],
    tech: ["React", "TypeScript", "Node.js", "REST APIs"],
  },
  {
    company: "Independent",
    role: "Senior Full Stack Engineer",
    detail:
      "Upwork Top Rated Plus. Four concurrent engagements across e-commerce, SaaS, fintech and construction-tech, owning requirements, architecture and deployment end to end.",
    duration: "Feb 2023 – Present",
    location: "Remote",
    items: [
      "Top Rated Plus freelancer delivering production apps for global clients",
      "RAG-based FAQ assistant over the marketplaces' own docs and policies, retrieval layer plus OpenAI and Anthropic APIs, to deflect repetitive support queries",
      "Scalable full-stack applications on the Next.js App Router with MongoDB and Prisma ORM",
      "Authentication with NextAuth.js across credentials and OAuth, payments with Stripe subscriptions and split payouts",
      "Modular frontend architecture using layouts and middleware",
      "GitHub Actions for CI/CD and the Serverless Framework for AWS Lambda deploys",
    ],
    tech: ["Next.js", "OpenAI API", "Anthropic API", "Node.js", "Prisma", "Stripe"],
  },
  {
    company: "Global Shopaholics LLC",
    role: "Senior Full Stack Engineer",
    detail:
      "Client work for US and UK businesses, taken from a Figma file to production with no technical intermediary in between.",
    duration: "Aug 2022 – Feb 2023",
    location: "Remote, USA",
    items: [
      "Built and maintained web applications with performance and scalability as the brief",
      "Applied modern development practices and a clean code architecture",
      "Worked across functions to translate client requirements into delivery",
      "Built responsive interfaces with user experience as the constraint",
    ],
    tech: ["Laravel", "PHP", "JavaScript", "MySQL", "CSS", "HTML"],
  },
  {
    company: "VisionX Technologies, Inc.",
    role: "Senior Full Stack Engineer",
    detail:
      "Halcyon, Ayshei and Morta — enterprise React and GraphQL, and the first LLM features to reach production on two of them.",
    duration: "Jul 2020 – Jul 2022",
    location: "Pakistan",
    items: [
      "Enterprise React frontends for tax filing, marketplace and construction-tech products",
      "AI listing assistant: a photo and a few words go to a vision LLM, which returns a polished title and description as structured JSON, fed straight to the GraphQL mutation",
      "Semantic search over a pgvector store on the existing PostgreSQL, so \"cheap family SUV\" surfaces listings with no keyword overlap",
      "LLM tax-document summariser over filed returns — OpenAI API, PDF parsing and prompt templates — producing plain-English summaries for non-technical stakeholders",
      "Natural-language-to-SQL interface converting questions like \"show all filings over $50k from Q3\" against the MySQL and Prisma schema",
      "Reusable form and data-table primitives that removed duplicated UI across modules",
    ],
    tech: ["React", "OpenAI API", "pgvector", "GraphQL", "Node.js", "TypeScript"],
  },
  {
    company: "Taaruff",
    role: "Software Developer",
    detail:
      "Client delivery for an IT services firm running out of Downtown Dubai and Islamabad — websites, mobile applications and the brand work around them.",
    duration: "Sep 2019 – Jun 2020",
    location: "Islamabad, Pakistan",
    items: [
      "Client websites and mobile applications taken from brief to launch",
      "Laravel and JavaScript builds against a shared agency stack",
      "Worked directly with non-technical stakeholders on scope and delivery",
    ],
    tech: ["Laravel", "PHP", "JavaScript", "MySQL"],
  },
  {
    company: "TechnDevs",
    role: "Software Developer",
    detail:
      "Website and mobile application delivery for the agency's US and Pakistan client base, taken from brief through to launch.",
    duration: "Sep 2018 – Aug 2019",
    location: "Sargodha, Pakistan",
    items: [
      "Website and mobile application builds for international clients",
      "Laravel and JavaScript delivery on an agency schedule",
      "UI implementation from supplied design files",
    ],
    tech: ["Laravel", "PHP", "JavaScript", "MySQL"],
  },
  {
    company: "Dixeam Inc",
    role: "PHP / Laravel Developer",
    detail:
      "SnapDebt and Moonrock on React, Node and Laravel. Led a small team, introduced CI/CD, and cut page load times by 30%.",
    duration: "Sep 2017 – Aug 2018",
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
  title: "Model the process before you call the model.",
  text: "Write down the steps a person actually takes. Decide which of them need judgement. Automate the rest outright, and spend the model only where the judgement was.",
} as const;

export const CONTACT = {
  kicker: "Contact",
  title: "Tell me what you're building.",
  /**
   * What a reader actually wants to know before writing, and nothing more. No
   * response-time promise: there is no evidence for one, and an invented SLA is
   * the fastest way to look like every other portfolio.
   */
  note: "Contract and freelance work, remote. Full-stack builds and AI automation.",
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
