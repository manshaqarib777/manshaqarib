/**
 * Résumé content, transcribed from the CV.
 *
 * Kept separate from `experience.ts` on purpose: the home page's timeline is an
 * edited highlight reel, whereas this is the full record. Editing one shouldn't
 * silently change the other.
 */

export const RESUME_SUMMARY =
  "Senior React developer with 8+ years building production frontends in React 19, TypeScript, and Next.js App Router with Server Components, SSR and ISR. Builds reusable component libraries and data-heavy dashboards end to end, including a financial-services platform used by 700+ institutions, a classifieds and auctions marketplace serving 100,000+ users, and a debt-recovery platform used by 10,000+ businesses.";

export const RESUME_SUMMARY_CONT =
  "Works across Redux Toolkit and TanStack Query state layers with optimistic updates, cache invalidation and typed query keys, Radix UI and shadcn composition patterns with forwardRef component APIs, Zod schema validation, REST and GraphQL integration secured with JWT, OAuth and RBAC, and Core Web Vitals performance tuning — delivered with Vitest, Playwright, Jest and GitHub Actions CI/CD.";

export interface Achievement {
  /** The figure, rendered at display size. */
  figure: string;
  body: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    figure: "2×",
    body: "Doubled site traffic post-launch on a production marketplace through SSR and ISR rendering architecture in Next.js.",
  },
  {
    figure: "700+",
    body: "Built the React and Redux Toolkit interface through which 700+ financial institutions process millions of dollars in tax filings.",
  },
  {
    figure: "100,000+",
    body: "Delivered the React frontend for a marketplace serving 100,000+ users across four verticals.",
  },
  {
    figure: "30%",
    body: "Reduced page load times by 30% while leading a small development team, through backend and query optimisation.",
  },
];

export interface ResumeRole {
  title: string;
  company: string;
  period: string;
  /** Optional context line under the company, e.g. a status or client region. */
  context?: string;
  bullets: string[];
  /** Named platforms delivered in the role. */
  platforms?: { name: string; url?: string; description: string }[];
}

export const RESUME_ROLES: ResumeRole[] = [
  {
    title: "Senior Frontend / Full-Stack Engineer (Contract)",
    company: "Multi-Client Delivery",
    context: "Upwork Top Rated Plus",
    period: "Feb 2023 — Present",
    bullets: [
      "Built and shipped secure, scalable, high-performance React and Next.js applications in TypeScript across four concurrent client engagements in e-commerce, SaaS, fintech and healthcare, owning frontend architecture end to end.",
      "Developed reusable UI component libraries documented in Storybook, standardising forms, tables, modals and data displays so new screens shipped from existing primitives instead of fresh markup.",
      "Optimised frontend performance through SSR and ISR rendering strategies, code splitting and Core Web Vitals tuning, doubling site traffic post-launch on the Lappeland marketplace.",
      "Implemented responsive, mobile-first layouts with Tailwind CSS and semantic markup, verified across browsers and viewports against Figma designs.",
      "Delivered WCAG 2.1 AA accessibility deliberately rather than incidentally: ARIA roles, keyboard navigation, focus management, contrast audits and screen reader testing.",
      "Built real-time interfaces over WebSockets, keeping order, booking and notification views live without polling.",
      "Integrated backend services through REST and GraphQL APIs secured with JWT, OAuth and role-based access control, including tenant-scoped views isolating each client's data.",
      "Managed application state with Redux Toolkit, keeping server and client state separated so cached data and UI state stayed independently testable.",
      "Designed screens directly in Figma using Auto Layout, components and prototypes on projects without a dedicated designer, then built them through to production.",
      "Delivered in Git with GitHub Actions CI/CD, enforcing quality with Jest unit and integration tests, ESLint, Prettier and Husky pre-commit hooks.",
    ],
    platforms: [
      {
        name: "Lappeland",
        url: "https://lappeland.no",
        description:
          "Outdoor-gear marketplace for the Norwegian market on Next.js App Router and TypeScript. Doubled traffic post-launch through SSR and ISR architecture.",
      },
      {
        name: "Neonbit",
        description:
          "SaaS security dashboard for team and permission management with role-based access control, built as a React and TypeScript client, used by enterprise clients across the DACH region.",
      },
      {
        name: "Emakity",
        url: "https://emakity.com",
        description:
          "Multi-vendor e-commerce marketplace on Next.js with secure checkout and per-vendor order tracking.",
      },
      {
        name: "Salearis",
        description:
          "B2B freelancer marketplace with Stripe subscription billing, 2FA and multi-language support.",
      },
    ],
  },
  {
    title: "Web Developer (Frontend)",
    company: "Carbonic IT Solutions",
    period: "2022 — Feb 2023",
    bullets: [
      "Delivered client-facing web applications from Figma specification through to production deployment for US and UK clients, collaborating directly with non-technical stakeholders.",
      "Built JACOBS Drycleaners (jacobsdrycleaners.co.uk), a UK service-booking and customer management platform covering booking workflows, scheduling and customer records.",
      "Built Global Shopaholic (globalshopaholics.com), an online shopping platform with secure payment gateway integration and order processing.",
    ],
  },
  {
    title: "Web Developer (Frontend)",
    company: "VisionX",
    period: "2019 — 2022",
    bullets: [
      "Delivered frontend engineering across three enterprise platforms over a three-year tenure in an Agile team, collaborating with cross-functional teams of architects, designers and backend engineers and contributing to code reviews and frontend best practices.",
    ],
    platforms: [
      {
        name: "Halcyon",
        url: "https://halcyonsolutions.ai",
        description:
          "US tax management platform, 700+ financial institutions. Built the enterprise React.js frontend with Redux Toolkit for application state and Ant Design as the component foundation. Developed reusable form and data-table components for dense, validation-heavy tax workflows, removing duplicated UI code across filing modules. Integrated against Node.js, MySQL and Prisma ORM services, including IRS Tax API data flows.",
      },
      {
        name: "Ayshei",
        url: "https://ayshei.com",
        description:
          "UAE classifieds and auctions marketplace, 100,000+ users across electronics, real estate, motors and art verticals, integrated against GraphQL APIs. Optimised listing and search performance for read-heavy traffic, working with Redis caching on the API layer to cut repeated database load.",
      },
      {
        name: "Morta",
        url: "https://morta.com",
        description:
          "Construction-tech SaaS. Delivered procurement, budgeting and stakeholder coordination modules on Next.js, TypeScript and GraphQL.",
      },
    ],
  },
  {
    title: "PHP / Laravel Developer",
    company: "Dixeam Inc",
    period: "2017 — 2019",
    bullets: [
      "Built SnapDebt (snapdebtrecovery.com), a debt recovery platform serving 10,000+ businesses across Florida, on React.js with Redux Toolkit, Node.js and Prisma ORM, covering automated collection workflows and compliance reporting.",
      "Built Moonrock (moonrockpm.com), a tenant and landlord property management application in React Native and TypeScript with Stripe-integrated rent payments.",
      "Led a small development team and reduced page load times by 30% through backend and query optimisation.",
    ],
  },
];

/** Verbatim skill categories from the CV. */
export const SKILL_MATRIX: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: [
      "TypeScript (generics, typed component and API contracts)",
      "JavaScript (ES6+)",
      "SQL",
      "PHP",
    ],
  },
  {
    label: "Frontend",
    items: [
      "React 18 and 19 (Hooks, custom hooks, Context, composition patterns)",
      "Next.js (App Router, Server Components, SSR, ISR)",
      "React Router",
      "Reusable UI component libraries",
      "Design systems",
      "Radix UI primitives",
      "shadcn/ui patterns",
      "Storybook",
      "Tailwind CSS",
      "Ant Design",
      "Recharts",
      "dnd-kit drag and drop",
      "Responsive and mobile-first design",
      "Cross-browser compatibility",
      "Core Web Vitals",
      "Code splitting",
      "SEO",
      "React Native",
      "Vue.js",
      "Nuxt.js",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "Prisma ORM",
      "REST and GraphQL API development",
      "Laravel",
    ],
  },
  {
    label: "State Management",
    items: [
      "Redux Toolkit",
      "Redux",
      "TanStack Query (useQuery, useMutation, cache invalidation)",
      "React Context",
      "Custom hooks",
      "Server and client state separation",
      "Normalised store design",
    ],
  },
  {
    label: "API & Auth",
    items: [
      "REST API integration",
      "GraphQL",
      "WebSockets for real-time data",
      "JWT",
      "OAuth",
      "NextAuth.js",
      "Role-based access control",
      "Zod schema validation",
      "Supabase",
      "Third-party API integrations",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS (Lambda, S3, EC2, IAM)",
      "Serverless Framework",
      "Vercel",
      "Git",
      "GitHub Actions",
      "Jenkins",
      "CI/CD pipelines",
      "Docker",
    ],
  },
  {
    label: "Testing & Quality",
    items: [
      "Jest and Vitest (unit and integration)",
      "Playwright end-to-end",
      "Automated regression suites",
      "ESLint",
      "oxlint",
      "Prettier",
      "Husky pre-commit hooks",
    ],
  },
  {
    label: "Practices",
    items: [
      "Agile and Scrum delivery",
      "Frontend architecture",
      "Code reviews",
      "Mentoring",
      "Technical documentation",
      "Cross-functional collaboration",
    ],
  },
  {
    label: "Tools",
    items: [
      "Figma (Auto Layout, components, prototyping)",
      "Storybook",
      "Vite",
      "npm",
      "Postman",
    ],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Science in Computer Science",
  institution: "University of Sargodha, Pakistan",
  period: "2016 — 2020",
};

export const CERTIFICATIONS = [
  {
    name: "Frontend Developer (React)",
    issuer: "HackerRank Role Certification",
    date: "Dec 2025",
    id: "AB235BF66DFC",
  },
  {
    name: "Software Engineer",
    issuer: "HackerRank Role Certification — problem solving, SQL, REST API",
    date: "Jul 2026",
    id: "E6B80B2188AA",
  },
  {
    name: "Node.js",
    issuer: "HackerRank Skill Certification",
    date: "Jul 2026",
    id: "573E451FEDA8",
  },
];

/** Downloadable copy, served from /public. */
export const RESUME_PDF = "/mansha-qarib-senior-react-developer.pdf";
