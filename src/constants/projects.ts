import type { Project } from "@/types";

/**
 * Case studies, drawn from real delivered platforms.
 *
 * Every figure in `metrics` is one that can be stood behind — projects with fewer
 * hard numbers simply carry fewer metrics rather than padded ones. Cover and
 * gallery paths point at generated placeholders in /public/work; drop real
 * screenshots in with the same filenames and nothing else changes.
 */
export const PROJECTS: Project[] = [
  {
    slug: "halcyon",
    title: "Halcyon",
    discipline: "Fintech · Enterprise React",
    year: "2019 — 2022",
    client: "Halcyon Solutions (via VisionX)",
    role: "Frontend Engineer",
    excerpt:
      "The tax-filing interface 700+ US financial institutions use to move millions of dollars.",
    summary:
      "Halcyon is a US tax management platform used by more than 700 financial institutions. I built the enterprise React frontend — Redux Toolkit for application state, Ant Design as the component foundation — for workflows where a validation bug is a compliance incident, not a bug report.",
    cover: "/work/halcyon-cover.svg",
    gallery: ["/work/halcyon-01.svg", "/work/halcyon-02.svg"],
    stack: [
      "React",
      "Redux Toolkit",
      "Ant Design",
      "Node.js",
      "Prisma ORM",
      "MySQL",
    ],
    liveUrl: "https://halcyonsolutions.ai",
    accent: ["#6ee7ff", "#7c5cff"],
    metrics: [
      { label: "Financial institutions", value: "700+" },
      { label: "Dollars in tax filings", value: "Millions" },
      { label: "Years on the platform", value: "3" },
    ],
    chapters: [
      {
        heading: "The problem",
        body: [
          "Tax filing is dense, validation-heavy and unforgiving. Every filing module had grown its own forms and its own data tables, which meant the same validation rule existed in several places and drifted in each of them.",
          "For institutions processing millions of dollars, a form that accepts the wrong thing is not a UI defect — it is a filing that has to be unwound.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "I built reusable form and data-table components sized for exactly this kind of work: long field sets, conditional sections, server-side validation surfaced inline rather than in a summary banner at the top.",
          "Application state went through Redux Toolkit with a normalised store, so a filing's data had one home and every module read from it rather than keeping a local copy. Ant Design provided the primitives; the composition and the validation contracts were ours.",
        ],
      },
      {
        heading: "The outcome",
        body: [
          "Duplicated UI code came out of the filing modules, and new screens were assembled from existing primitives instead of fresh markup.",
          "The frontend integrated against Node.js, MySQL and Prisma services, including IRS Tax API data flows — where the interface has to be honest about latency it does not control.",
        ],
      },
    ],
  },
  {
    slug: "ayshei",
    title: "Ayshei",
    discipline: "Marketplace · GraphQL",
    year: "2019 — 2022",
    client: "Ayshei (via VisionX)",
    role: "Frontend Engineer",
    excerpt:
      "A UAE classifieds and auctions marketplace built for 100,000+ users across four verticals.",
    summary:
      "Ayshei runs classifieds and live auctions across electronics, real estate, motors and art. I built the React frontend against GraphQL APIs, for traffic that is overwhelmingly read-heavy and extremely impatient.",
    cover: "/work/ayshei-cover.svg",
    gallery: ["/work/ayshei-01.svg", "/work/ayshei-02.svg"],
    stack: ["React", "GraphQL", "Redis", "REST", "Responsive UI"],
    liveUrl: "https://ayshei.com",
    accent: ["#8effc1", "#3ba3ff"],
    metrics: [
      { label: "Users served", value: "100,000+" },
      { label: "Marketplace verticals", value: "4" },
    ],
    chapters: [
      {
        heading: "The problem",
        body: [
          "Four verticals with genuinely different shapes — a car listing and an art auction have almost nothing in common beyond a price — all sharing one search and one listing surface.",
          "Traffic was read-heavy and repetitive: the same popular queries, over and over, hitting the database each time.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "The listing and search views were built as one set of components parameterised by vertical, rather than four near-duplicate implementations that would each need every future fix applied separately.",
          "On the data side I worked with Redis caching at the API layer to cut repeated database load, and shaped the GraphQL queries so a listing page asked for what it rendered and nothing more.",
        ],
      },
      {
        heading: "The outcome",
        body: [
          "Listing and search performance held up under read-heavy traffic, and the four verticals stayed maintainable as one surface instead of fragmenting into four.",
        ],
      },
    ],
  },
  {
    slug: "lappeland",
    title: "Lappeland",
    discipline: "E-commerce · Next.js App Router",
    year: "2023 — Present",
    client: "Lappeland (Norway)",
    role: "Senior Frontend Engineer",
    excerpt:
      "An outdoor-gear marketplace whose traffic doubled after a rendering rebuild.",
    summary:
      "Lappeland sells outdoor gear to the Norwegian market. Rebuilt on Next.js App Router and TypeScript with a deliberate rendering strategy — SSR where freshness matters, ISR where it does not — traffic doubled post-launch.",
    cover: "/work/lappeland-cover.svg",
    gallery: ["/work/lappeland-01.svg", "/work/lappeland-02.svg"],
    stack: [
      "Next.js App Router",
      "TypeScript",
      "Server Components",
      "ISR",
      "Tailwind CSS",
    ],
    liveUrl: "https://lappeland.no",
    accent: ["#f7c47a", "#ff6b57"],
    metrics: [{ label: "Traffic post-launch", value: "2×" }],
    chapters: [
      {
        heading: "The problem",
        body: [
          "A catalogue site that search engines could not read well was, for a retailer, the whole business problem wearing a technical costume.",
          "Product pages need to be fresh enough to be honest about stock, and static enough to be fast — those two requirements pull in opposite directions if you pick one rendering mode for the entire site.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "Rendering was decided per route rather than per app. Catalogue and content pages are incrementally regenerated; anything reflecting live stock or a session is server-rendered on request. Server Components keep the client bundle to what actually needs interactivity.",
          "The rest was unglamorous and mattered: code splitting, Core Web Vitals tuning, mobile-first layouts in Tailwind verified against Figma across real viewports and browsers.",
        ],
      },
      {
        heading: "The outcome",
        body: [
          "Site traffic doubled after launch — the rendering architecture doing the work that a marketing campaign is usually credited with.",
        ],
      },
    ],
  },
  {
    slug: "snapdebt",
    title: "SnapDebt",
    discipline: "Fintech · Workflow Automation",
    year: "2017 — 2019",
    client: "SnapDebt (via Dixeam)",
    role: "Developer & Team Lead",
    excerpt:
      "Debt recovery for 10,000+ Florida businesses, with 30% faster page loads.",
    summary:
      "SnapDebt automates collection workflows and compliance reporting for over 10,000 businesses across Florida. Built on React with Redux Toolkit over Node.js and Prisma — and the project where I first led a small team.",
    cover: "/work/snapdebt-cover.svg",
    gallery: ["/work/snapdebt-01.svg", "/work/snapdebt-02.svg"],
    stack: ["React", "Redux Toolkit", "Node.js", "Prisma ORM", "PostgreSQL"],
    liveUrl: "https://snapdebtrecovery.com",
    accent: ["#c8b6ff", "#ff8fd9"],
    metrics: [
      { label: "Businesses served", value: "10,000+" },
      { label: "Faster page loads", value: "30%" },
    ],
    chapters: [
      {
        heading: "The problem",
        body: [
          "Debt recovery is a compliance surface before it is a product surface: every automated action has to be recorded, justifiable and reportable.",
          "The platform was also slow in the places people used constantly — which, in a tool someone works in all day, compounds into hours.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "Collection workflows were modelled as explicit states rather than implied ones, so the compliance reporting could be derived from the same data the UI rendered instead of reconstructed separately.",
          "The performance work was measurement first: find the slow queries, fix the ones that mattered, and stop the frontend from asking for data it was not going to show.",
        ],
      },
      {
        heading: "The outcome",
        body: [
          "Page load times dropped 30%, and I led the small team that delivered it — my first go at code review and technical direction rather than just the code.",
        ],
      },
    ],
  },
  {
    slug: "neonbit",
    title: "Neonbit",
    discipline: "SaaS · Security & RBAC",
    year: "2023 — Present",
    client: "Neonbit (DACH region)",
    role: "Senior Frontend Engineer",
    excerpt:
      "A security dashboard where the permissions model is the product.",
    summary:
      "Neonbit is a SaaS security dashboard for team and permission management, used by enterprise clients across the DACH region. Built as a React and TypeScript client where role-based access control is not a feature flag but the organising principle of the UI.",
    cover: "/work/neonbit-cover.svg",
    gallery: ["/work/neonbit-01.svg", "/work/neonbit-02.svg"],
    stack: ["React", "TypeScript", "RBAC", "JWT / OAuth", "Zod"],
    accent: ["#a8b6ff", "#6ee7ff"],
    metrics: [],
    chapters: [
      {
        heading: "The problem",
        body: [
          "In a permissions product, the interface has to communicate what someone can do before they try — and never show an action that will be refused by the server.",
          "Getting that wrong in either direction is a failure: a hidden capability people cannot find, or a visible button that returns 403.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "Access rules resolve in one place and every component reads from that resolution, so a role change propagates rather than needing to be remembered in each view.",
          "Tenant-scoped views isolate each client's data, and payloads are validated with Zod at the boundary so a malformed response fails loudly at the edge instead of quietly three components deep.",
        ],
      },
      {
        heading: "The outcome",
        body: [
          "Enterprise clients across the DACH region manage teams and permissions through it, with the frontend's view of who-can-do-what and the API's kept in agreement by construction.",
        ],
      },
    ],
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((project) => project.slug === slug);

export const getAdjacentProject = (slug: string) => {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  return PROJECTS[(index + 1) % PROJECTS.length];
};
