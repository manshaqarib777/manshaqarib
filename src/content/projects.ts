import { SCREENSHOTS } from "./assets";

/**
 * The project record.
 *
 * Shared by the work section, the case-study route and the sitemap, so a metric
 * or a title is written exactly once. The narrative that wraps these facts lives
 * separately, in `case-studies.ts`.
 */
export interface Project {
  slug: string;
  discipline: string;
  title: string;
  challenge: string;
  tags: readonly string[];
  /** Real screenshot where one exists; generated artwork only where none does. */
  cover: string;
  /**
   * A scrolling walkthrough of the live site. Loaded and played only when it
   * reaches the viewport — six autoplaying videos on one page would cost several
   * megabytes before anyone asked for them.
   */
  video?: string;
  /**
   * Real figures only. A project with fewer hard numbers carries fewer metrics
   * rather than padded ones — the row sizes itself to the count, and a project
   * with none simply does not render one.
   */
  metrics: readonly { value: string; label: string }[];
  brief: { challenge: string; solution: string };
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "halcyon",
    discipline: "Fintech · Enterprise React",
    title: "Halcyon",
    challenge:
      "The tax-filing interface 700+ US financial institutions use to move millions of dollars.",
    tags: ["React", "Node.js", "OpenAI API", "Prisma ORM"],
    cover: `${SCREENSHOTS}/05-halcyon/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/05-halcyon/4-walkthrough.mp4`,
    metrics: [
      { value: "700+", label: "financial institutions" },
      { value: "Millions", label: "in tax filings" },
      { value: "3", label: "years on the platform" },
    ],
    brief: {
      challenge:
        "Every filing module had grown its own forms and data tables, so the same validation rule existed in several places and drifted in each of them.",
      solution:
        "Reusable form and table primitives over a normalised Redux store, plus an LLM return summariser and a natural-language-to-SQL tool so staff can query filings in plain English.",
    },
  },
  {
    slug: "ayshei",
    discipline: "Marketplace · GraphQL",
    title: "Ayshei",
    challenge:
      "A UAE classifieds and auctions marketplace built for 100,000+ users across four verticals.",
    tags: ["React", "GraphQL", "PostgreSQL", "Semantic search"],
    cover: `${SCREENSHOTS}/06-ayshei/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/06-ayshei/4-walkthrough.mp4`,
    metrics: [
      { value: "100k+", label: "users served" },
      { value: "4", label: "marketplace verticals" },
    ],
    brief: {
      challenge:
        "A car listing and an art auction share almost nothing beyond a price, yet all four verticals ran through one search and one listing surface.",
      solution:
        "One set of components parameterised by vertical, an AI listing assistant that turns a photo into a title and description, and vector-based semantic search over listings.",
    },
  },
  {
    slug: "lappeland",
    discipline: "E-commerce · Next.js App Router",
    title: "Lappeland",
    challenge:
      "An outdoor-gear marketplace whose traffic doubled after a rendering rebuild.",
    tags: ["Next.js App Router", "TypeScript", "NextAuth", "Prisma ORM"],
    cover: `${SCREENSHOTS}/01-lappeland/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/01-lappeland/4-walkthrough.mp4`,
    metrics: [
      { value: "2×", label: "traffic post-launch" },
      { value: "~95", label: "Lighthouse performance" },
    ],
    brief: {
      challenge:
        "Product pages must be fresh enough to be honest about stock and static enough to be fast — requirements that pull apart if one rendering mode is picked for the whole site.",
      solution:
        "Rendering decided per route: catalogue pages incrementally regenerated, anything reflecting live stock server-rendered on request, with Server Components keeping the client bundle to what needs interactivity.",
    },
  },
  {
    slug: "snapdebt",
    discipline: "Fintech · Workflow Automation",
    title: "SnapDebt",
    challenge: "Debt recovery for 10,000+ Florida businesses, 30% faster.",
    tags: ["React", "Redux Toolkit", "Node.js", "AWS S3"],
    cover: `${SCREENSHOTS}/09-snapdebt/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/09-snapdebt/4-walkthrough.mp4`,
    metrics: [
      { value: "10,000+", label: "businesses served" },
      { value: "30%", label: "faster page loads" },
    ],
    brief: {
      challenge:
        "Debt recovery is a compliance surface before it is a product surface: every automated action has to be recorded, justifiable and reportable.",
      solution:
        "Collection workflows modelled as explicit states, with document storage on S3, so compliance reporting derived from the same data the UI rendered.",
    },
  },
  {
    slug: "global-shopaholic",
    discipline: "E-commerce · Vue & Laravel",
    title: "Global Shopaholic",
    challenge: "A US retail storefront taken from spec to deployment, solo.",
    tags: ["Vue 3", "Laravel 8", "REST API", "Payments"],
    cover: `${SCREENSHOTS}/03-global-shopaholic/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/03-global-shopaholic/4-walkthrough.mp4`,
    metrics: [],
    brief: {
      challenge:
        "A US retail client needed a working storefront, not a specification — and had no technical staff to translate one into the other.",
      solution:
        "A Bootstrap Vue 3 storefront on a Laravel 8 backend with payment-gateway integration and order processing, delivered end to end against direct stakeholder feedback.",
    },
  },
  {
    slug: "jacobs-drycleaners",
    discipline: "Service booking · Nuxt & Laravel",
    title: "JACOBS Drycleaners",
    challenge: "Booking and customer management for a UK service business.",
    tags: ["Nuxt.js", "Vue.js", "Laravel 8", "REST API"],
    cover: `${SCREENSHOTS}/04-jacobs-drycleaners/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/04-jacobs-drycleaners/4-walkthrough.mp4`,
    metrics: [],
    brief: {
      challenge:
        "Two audiences on one system: customers booking and tracking orders, and staff managing those orders and customer records from an admin area.",
      solution:
        "A Nuxt.js front end on a Laravel 8 API, shipped from requirements through deployment for a client with no technical intermediary.",
    },
  },
  {
    slug: "neonbit",
    discipline: "SaaS · Security & RBAC",
    title: "Neonbit",
    challenge:
      "A security dashboard where the permissions model is the product.",
    tags: ["React", "TypeScript", "RBAC", "Laravel API"],
    // The only project still on generated artwork: neonbit.at is offline, so
    // there is no live site to capture. Swap in a screenshot if access returns.
    cover: "/projects/neonbit-cover.svg",
    metrics: [],
    brief: {
      challenge:
        "The interface has to say what someone can do before they try, and never show an action the server will refuse — a hidden capability and a button that returns 403 are both failures.",
      solution:
        "Access rules resolve in one place and every component reads that resolution, with tenant-scoped views and Zod validation at the boundary so malformed responses fail at the edge.",
    },
  },
];
