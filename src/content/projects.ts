import { SCREENSHOTS } from "./assets";

/**
 * The project record.
 *
 * Shared by the work section, the case-study route and the sitemap, so a metric
 * or a title is written exactly once. The narrative that wraps these facts lives
 * separately, in `case-studies.ts`.
 *
 * The array order is the order the work section renders in, and it is deliberate
 * rather than chronological — the section numbers each entry from its index, so
 * moving one renumbers the page and re-alternates the ground tones with no other
 * change. The career deck orders itself independently, by employment era.
 *
 * `featured` selects which of them the work section actually renders; the rest
 * keep their case-study pages and their place in the sitemap without appearing
 * on the home page. See the field.
 *
 * Covers and walkthroughs were captured from the live sites at 1440x810, 30fps,
 * after accepting each site's cookie consent. Deliveroo, Salearis and Neonbit
 * were captured by hand — the first answers an automated browser with a bot
 * challenge and the other two did not respond to one. Only Emakity has none: it
 * renders blank to a headless browser, being client-rendered behind auth. It
 * shows the empty cover frame until a screenshot is referenced here, at which
 * point it fills with no other change.
 */
export interface Project {
  slug: string;
  discipline: string;
  title: string;
  /** The one-line framing shown under the title and used as the page description. */
  challenge: string;
  tags: readonly string[];
  /**
   * Whether this project appears in the work section at all.
   *
   * Only the featured entries render, as full-bleed rows. All fifteen once did,
   * which came to roughly twenty-four viewports of scroll mostly restating what
   * each project's own case study says at greater length.
   *
   * Unset therefore means the project is reachable only by its own URL and the
   * career deck — it still builds a `/work/[slug]` page and still appears in the
   * sitemap, it just is not linked from the home page. That is the trade: a
   * short work section against five case studies with no inbound link. See the
   * work section for which ones the career deck picks up.
   *
   * Numbering follows the order of the featured entries themselves, so an
   * unfeatured project between two featured ones does not leave a gap.
   */
  featured?: boolean;
  /**
   * A real screenshot, where one has been captured.
   *
   * Optional: the projects below that have no capture yet render an empty cover
   * frame and light up the moment a file is dropped into
   * `public/portfolio-screenshots/` and referenced here. Nothing else needs to
   * change.
   */
  cover?: string;
  /**
   * A scrolling walkthrough of the live site. Loaded and played only when it
   * reaches the viewport — several autoplaying videos on one page would cost
   * megabytes before anyone asked for them.
   */
  video?: string;
  /** The live site, where it is still reachable. */
  liveUrl?: string;
  /**
   * Real figures only. A project with fewer hard numbers carries fewer metrics
   * rather than padded ones — the row sizes itself to the count, and a project
   * with none simply does not render one.
   *
   * The labels are load-bearing: `case-studies.ts` keys its per-figure notes off
   * them, so renaming one silently drops its note.
   */
  metrics: readonly { value: string; label: string }[];
  /**
   * The two-column brief in the work section. Optional — a project without one
   * renders no brief rather than an empty pair of columns.
   */
  brief?: { challenge: string; solution: string };
  /** Long-form description. Held for a future detail view; not rendered yet. */
  summary?: string;
  /** Key outcomes. Held for a future detail view; not rendered yet. */
  highlights?: readonly string[];
  /** The stack in prose form. `tags` is the short version the work section shows. */
  techStack?: readonly string[];
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "ayshei",
    discipline: "Marketplace · GraphQL",
    title: "Ayshei",
    challenge:
      "A UAE classifieds and auctions marketplace built for 100,000+ users across four verticals.",
    tags: ["React", "GraphQL", "PostgreSQL", "Semantic search"],
    featured: true,
    cover: `${SCREENSHOTS}/06-ayshei/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/06-ayshei/4-walkthrough.mp4`,
    liveUrl: "https://ayshei.com/uae/ads",
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
    summary:
      "UAE-based classified ads and auctions mobile-first web application serving 100,000+ users, managing products ranging from electronics and real estate to motors and art. Supports live auction bidding with real-time updates, advanced search and filtering across categories, and user verification for trusted transactions. Microservices architecture using Golang for high-performance backend services and GraphQL for flexible querying.",
    highlights: [
      "100k+ active users across the UAE",
      "Live auction bidding with real-time updates",
      "Multi-category marketplace (electronics, real estate, motors, art)",
      "Microservices architecture with Golang backend",
      "GraphQL API for flexible data fetching",
      "CI/CD pipeline with Jenkins and Docker",
    ],
    techStack: [
      "React.js with Material UI & Tailwind CSS",
      "Node.js & Golang Backend",
      "GraphQL API Layer",
      "PostgreSQL Database",
      "AWS EC2 & S3 Infrastructure",
      "Docker, Jenkins & CI/CD",
    ],
  },
  {
    slug: "lappeland",
    discipline: "E-commerce · Next.js App Router",
    title: "Lappeland",
    challenge:
      "A Norwegian custom-label store whose traffic doubled after a rendering rebuild.",
    tags: ["Next.js App Router", "TypeScript", "NextAuth", "Prisma ORM"],
    featured: true,
    cover: `${SCREENSHOTS}/01-lappeland/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/01-lappeland/4-walkthrough.mp4`,
    liveUrl: "https://lappeland.no",
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
    // NOTE: lappeland.no today sells custom name labels, mini labels, wall decor
    // and height charts — not outdoor gear. The description was corrected to
    // match the live site. If the engagement predates a pivot, this is the line
    // to change back.
    summary:
      "Production-grade custom-label storefront for the Norwegian market: name labels, mini labels, wall decor and height charts, with a design-your-own configurator. Secure authentication, SEO optimisation and dynamic state management on the Next.js App Router.",
    highlights: [
      "SEO-optimised SSR/ISR rendering for maximum visibility",
      "Secure NextAuth integration with multiple providers",
      "Mobile-first responsive design across all devices",
      "Dynamic state management with Redux Toolkit",
      "Prisma ORM for type-safe database operations",
    ],
    techStack: [
      "Next.js (App Router)",
      "MongoDB with Prisma ORM",
      "Redux Toolkit for State Management",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    slug: "jacobs-drycleaners",
    discipline: "Service booking · Nuxt & Laravel",
    title: "JACOBS Drycleaners",
    challenge: "Booking and customer management for a UK service business.",
    tags: ["Nuxt.js", "Vue.js", "Laravel 8", "REST API"],
    featured: true,
    cover: `${SCREENSHOTS}/04-jacobs-drycleaners/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/04-jacobs-drycleaners/4-walkthrough.mp4`,
    liveUrl: "https://jacobsdrycleaners.co.uk/",
    metrics: [],
    brief: {
      challenge:
        "Two audiences on one system: customers booking and tracking orders, and staff managing those orders and customer records from an admin area.",
      solution:
        "A Nuxt.js front end on a Laravel 8 API, shipped from requirements through deployment for a client with no technical intermediary.",
    },
    summary:
      "Dry-cleaning service site offering top-tier fabric care and seamless customer interaction for UK residents. Nuxt.js on the frontend and Laravel 8 on the backend, blending a modern SSR frontend with robust backend functionality.",
    highlights: [
      "Top-tier fabric care services showcase",
      "Seamless customer interaction and booking",
      "UK market focus with localised content",
      "Modern SSR frontend with Nuxt.js",
    ],
    techStack: [
      "Nuxt.js",
      "Laravel 8",
      "Customer Management System",
      "Service Booking System",
    ],
  },
  {
    slug: "global-shopaholic",
    discipline: "E-commerce · Vue & Laravel",
    title: "Global Shopaholic",
    challenge: "A US retail storefront taken from spec to deployment, solo.",
    tags: ["Vue 3", "Laravel 8", "REST API", "Payments"],
    cover: `${SCREENSHOTS}/03-global-shopaholic/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/03-global-shopaholic/4-walkthrough.mp4`,
    liveUrl: "https://globalshopaholics.com/",
    metrics: [],
    brief: {
      challenge:
        "A US retail client needed a working storefront, not a specification — and had no technical staff to translate one into the other.",
      solution:
        "A Bootstrap Vue 3 storefront on a Laravel 8 backend with payment-gateway integration and order processing, delivered end to end against direct stakeholder feedback.",
    },
    summary:
      "A user-friendly online shopping platform with secure payment gateways and efficient order processing. Crafted with Bootstrap Vue 3 on the frontend and Laravel 8 on the backend, combining elegant interfaces with robust server-side functionality.",
    highlights: [
      "User-friendly shopping interface",
      "Secure payment gateway integration",
      "Efficient order processing system",
      "Global reach and scalability",
    ],
    techStack: [
      "Bootstrap Vue 3",
      "Laravel 8",
      "Payment Gateways",
      "Order Processing System",
    ],
  },
  {
    slug: "morta",
    discipline: "Construction-tech · SaaS",
    title: "Morta",
    challenge:
      "Procurement, budgeting and stakeholder coordination for property developers, in one workspace.",
    tags: ["Next.js", "Node.js", "GraphQL", "Stripe"],
    cover: `${SCREENSHOTS}/07-morta/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/07-morta/4-walkthrough.mp4`,
    liveUrl: "https://morta.com/",
    metrics: [],
    brief: {
      challenge:
        "Property development runs in phases that barely share a vocabulary — pre-construction, delivery, post-handover — and each one had been buying its own tool, so the numbers never reconciled.",
      solution:
        "One workspace spanning all three phases, with procurement modelled as a six-state tender flow from verified supplier through to item procured. GraphQL keeps the cross-phase reads to one round trip.",
    },
    summary:
      "A full-scale SaaS platform enabling property developers to manage procurement, budgeting, stakeholder coordination and project planning through a unified digital workspace. Handles complex workflows across construction phases, from planning through procurement to delivery. Next.js for server-side rendering, GraphQL for efficient data fetching, and the Stripe SDK for subscription billing, with Jest and Cypress coverage and a Storybook-documented component library.",
    highlights: [
      "Enterprise procurement and budgeting management",
      "Stakeholder coordination across project phases",
      "GraphQL API for efficient complex data queries",
      "Stripe subscription billing for SaaS plans",
      "Comprehensive test coverage with Jest and Cypress",
      "Component library documented with Storybook",
    ],
    techStack: [
      "Next.js & React.js",
      "Node.js with GraphQL API",
      "TypeScript & Tailwind CSS",
      "Stripe SDK for Payments",
      "AWS S3, Docker & CI/CD",
      "Jest, Cypress & Storybook",
    ],
  },
  {
    slug: "liftfoils",
    discipline: "E-commerce · Headless Shopify",
    title: "LiftFoils",
    challenge:
      "A premium electric hydrofoil store whose traffic doubled after a headless rebuild.",
    tags: ["Next.js 14", "Shopify API", "TypeScript", "Stripe"],
    cover: `${SCREENSHOTS}/08-liftfoils/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/08-liftfoils/4-walkthrough.mp4`,
    liveUrl: "https://www.liftfoils.com/",
    metrics: [{ value: "2×", label: "traffic after migration" }],
    brief: {
      challenge:
        "A hydrofoil is a configured purchase, not a catalogue one — three boards, wings, masts and accessories, where the wrong combination is an expensive mistake for a beginner.",
      solution:
        "A guided configurator that narrows by rider level before it shows a price, on a headless Shopify backend so the buying flow could be designed around that decision rather than around a theme.",
    },
    summary:
      "High-performance headless e-commerce store for a premium electric hydrofoil brand. Features a 3D product configurator for custom builds, region-based pricing with multi-currency support, and Stripe-powered checkout. The headless architecture decouples the Shopify backend from the Next.js frontend, giving full design freedom while keeping Shopify's inventory and order management.",
    highlights: [
      "3D product configurator for custom builds",
      "Doubled site traffic after the Next.js migration",
      "Headless Shopify with full design freedom",
      "Region-based pricing with multi-currency",
      "Sub-second page loads with ISR",
      "Stripe checkout with Apple Pay and Google Pay",
    ],
    techStack: [
      "Next.js 14 (App Router)",
      "Shopify Storefront GraphQL API",
      "TypeScript & Tailwind CSS",
      "Stripe Payment Processing",
      "Vercel Edge Network",
      "3D Product Visualisation",
    ],
  },
  {
    slug: "nerdwallet",
    discipline: "Fintech · Comparison platform",
    title: "NerdWallet",
    challenge:
      "Personalised financial product comparison for millions of monthly users.",
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL"],
    featured: true,
    cover: `${SCREENSHOTS}/10-nerdwallet/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/10-nerdwallet/4-walkthrough.mp4`,
    liveUrl: "https://www.nerdwallet.com/",
    metrics: [{ value: "Millions", label: "monthly users" }],
    brief: {
      challenge:
        "Comparison content only earns its traffic if the page is indexable, and the rate tables it is built around change faster than a static build can keep up with.",
      solution:
        "Server-rendered pages for the editorial and comparison surfaces, with rate data fetched per request, so the page search engines index is the page a visitor sees.",
    },
    summary:
      "Financial comparison and advisory platform with interactive dashboards for credit cards, loans, mortgage rates, insurance and investment products. Users get recommendations based on their financial profile, credit score range and spending habits. Server-rendered pages are optimised for the high-intent financial search traffic, and real-time rate engines pull from hundreds of institutions.",
    highlights: [
      "Millions of monthly active users",
      "Interactive financial product comparison dashboards",
      "Personalised recommendations by credit profile",
      "Real-time rate data from 100+ financial institutions",
      "SEO-optimised content driving organic traffic",
      "Integrated CMS for expert financial guides",
    ],
    techStack: [
      "Next.js with Server-Side Rendering",
      "React & TypeScript",
      "Node.js API Layer",
      "PostgreSQL Database",
      "Real-Time Rate Comparison Engine",
      "Vercel Edge Deployment",
    ],
  },
  {
    slug: "deliveroo",
    discipline: "Marketplace · Real-time",
    title: "Deliveroo",
    challenge:
      "Restaurant delivery with live rider tracking, across the UK and Europe.",
    tags: ["Next.js", "Node.js", "GraphQL", "Redis"],
    cover: `${SCREENSHOTS}/13-deliveroo/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/13-deliveroo/4-walkthrough.mp4`,
    liveUrl: "https://deliveroo.co.uk/",
    metrics: [{ value: "Millions", label: "users across UK & Europe" }],
    brief: {
      challenge:
        "Order tracking is only trustworthy if it is current, and restaurant search is only usable if it answers before the visitor gives up — at dinner-time volume, on a phone network.",
      solution:
        "A GraphQL layer collapsing restaurant, menu and order reads into single round trips, Redis in front of the search path, and a socket channel for rider position so tracking updates without polling.",
    },
    summary:
      "Restaurant delivery marketplace featuring real-time order tracking with live rider GPS positions, dynamic menus that update availability against kitchen capacity, and intelligent search with dietary filters and delivery estimates. Server-rendered restaurant pages are tuned for local SEO and fast loads on mobile networks, with Redis caching holding search responses under 100ms at peak.",
    highlights: [
      "Real-time order tracking with live rider GPS",
      "Dynamic menus updating against kitchen capacity",
      "Intelligent search with dietary and cuisine filters",
      "Server-rendered pages for local SEO performance",
      "GraphQL API for efficient complex data fetching",
      "Redis caching for sub-100ms peak-hour responses",
    ],
    techStack: [
      "Next.js with SSR & ISR",
      "React & TypeScript",
      "Node.js with GraphQL API",
      "Redis for Search Caching",
      "Real-Time WebSocket Tracking",
      "Stripe Payment Processing",
    ],
  },
  {
    slug: "bang-olufsen",
    discipline: "E-commerce · Luxury retail",
    title: "Bang & Olufsen",
    challenge:
      "Immersive product storytelling across storefronts in 70+ countries.",
    tags: ["Next.js 14", "TypeScript", "GraphQL", "Contentful"],
    cover: `${SCREENSHOTS}/11-bang-olufsen/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/11-bang-olufsen/4-walkthrough.mp4`,
    liveUrl: "https://www.bang-olufsen.com/",
    metrics: [{ value: "70+", label: "countries served" }],
    brief: {
      challenge:
        "A luxury product is sold on presentation, but the same storefront has to serve 70+ countries with their own pricing, language and shipping — and marketing has to change the presentation without a deploy.",
      solution:
        "A headless build with Contentful holding the editorial, so campaigns ship without engineering, and ISR keeping product pages fresh behind edge caching in every region.",
    },
    summary:
      "Premium audio and electronics commerce experience with 360-degree product views, video-rich landing pages and recommendations driven by browsing behaviour. Multi-region storefronts carry localised pricing, language and shipping. A headless CMS lets marketing publish rich editorial without developer involvement, and ISR keeps product pages fresh behind edge caching.",
    highlights: [
      "Immersive 360° product views and video showcases",
      "Multi-region storefronts across 70+ countries",
      "Personalised recommendations by browsing behaviour",
      "Headless CMS for marketing team autonomy",
      "ISR for fresh product pages with fast loads",
      "Localised pricing, language and shipping",
    ],
    techStack: [
      "Next.js 14 with ISR",
      "TypeScript & Tailwind CSS",
      "GraphQL API Layer",
      "Contentful Headless CMS",
      "Multi-Region Edge Deployment",
      "Analytics & Personalisation Engine",
    ],
  },
  {
    slug: "moonrock",
    discipline: "Real estate · React Native",
    title: "Moonrock",
    challenge:
      "Rent, leases and maintenance for tenants and landlords, on one mobile app.",
    tags: ["React Native", "TypeScript", "MySQL", "Stripe"],
    cover: `${SCREENSHOTS}/12-moonrock/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/12-moonrock/4-walkthrough.mp4`,
    liveUrl: "https://www.moonrockpm.com",
    metrics: [],
    brief: {
      challenge:
        "Rent, leases and maintenance are three separate conversations between the same two people, and they were happening across email, phone and paper.",
      solution:
        "One cross-platform app where both sides see the same record: Stripe for recurring rent, maintenance requests as tracked state rather than messages, and leases stored against the property.",
    },
    summary:
      "Tenant and landlord management application with Stripe integration for automated rent payments, lease management, maintenance request tracking and property analytics. Tenants pay rent, submit maintenance requests and view lease details; landlords manage properties, track payments, handle maintenance workflows and view financial reports. Cross-platform via React Native, with Stripe handling recurring payments.",
    highlights: [
      "Automated rent collection via Stripe",
      "Tenant and landlord dashboards",
      "Maintenance request tracking workflow",
      "Lease management with document storage",
      "Cross-platform mobile app (iOS & Android)",
      "Financial reporting and property analytics",
    ],
    techStack: [
      "React Native (Cross-Platform)",
      "TypeScript",
      "MySQL Database",
      "Stripe SDK for Payments",
      "Push Notifications",
      "Mobile-First Architecture",
    ],
  },
  {
    slug: "halcyon",
    discipline: "Fintech · Enterprise React",
    title: "Halcyon",
    challenge:
      "The tax-filing interface 700+ US financial institutions use to move millions of dollars.",
    tags: ["React", "Node.js", "OpenAI API", "Prisma ORM"],
    cover: `${SCREENSHOTS}/05-halcyon/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/05-halcyon/4-walkthrough.mp4`,
    liveUrl: "https://www.halcyonsolutions.ai/",
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
    summary:
      "USA-based tax management cloud application integrating IRS Tax APIs, serving 700+ financial institutions and managing $1M+ in loans and $10M+ in tax returns. The platform provides automated tax filing workflows, real-time compliance validation against IRS rules, and comprehensive reporting dashboards. Built on an Onion Architecture for clean separation of concerns, with role-based dashboards per user type.",
    highlights: [
      "700+ financial institutions served",
      "IRS Tax API integration for automated filing",
      "$10M+ in tax returns managed",
      "Role-based dashboards with Ant Design UI",
      "Onion Architecture for clean code separation",
      "AWS infrastructure for secure financial data",
    ],
    techStack: [
      "React.js with Ant Design",
      "Node.js API Backend",
      "MySQL with Prisma ORM",
      "Redux Toolkit for State Management",
      "AWS S3 & EC2 Infrastructure",
      "Onion Architecture Pattern",
    ],
  },
  {
    slug: "salearis",
    discipline: "B2B marketplace · DACH",
    title: "Salearis",
    challenge:
      "A two-sided marketplace matching businesses with vetted sales contractors.",
    tags: ["Laravel", "Vue.js", "Stripe", "Sanctum Auth"],
    cover: `${SCREENSHOTS}/14-salearis/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/14-salearis/4-walkthrough.mp4`,
    liveUrl: "https://salearis.com/",
    metrics: [
      { value: "0€", label: "placement fee" },
      { value: "48h", label: "to first match" },
      { value: "3", label: "stage verification" },
    ],
    brief: {
      challenge:
        "A hiring marketplace has two audiences with opposite needs, and in the DACH region it also has to be credible in German and compliant about how it holds candidate data.",
      solution:
        "One Laravel application serving both sides behind Sanctum-authenticated sessions with two-factor authentication, German and English throughout, and Stripe carrying subscription billing.",
    },
    summary:
      "A freelancer marketplace connecting businesses with vetted sales professionals — closers, setters and SDRs — across Germany, Austria and Switzerland. Freelancers browse jobs, manage profiles with CV and video uploads, track performance and schedule interviews; companies get posting tools, candidate sourcing and screening, team collaboration, reporting and billing. Two-factor authentication, German/English localisation, theming, a blog and a support ticketing system.",
    highlights: [
      "Two-sided marketplace for freelancers and companies",
      "Job posting, candidate sourcing and screening tools",
      "Stripe subscription billing and payment processing",
      "Two-factor authentication and Sanctum security",
      "Multi-language support (German & English)",
      "Performance tracking and referral programmes",
    ],
    techStack: [
      "Laravel Backend with Sanctum Auth",
      "Vue.js Frontend",
      "Tailwind CSS & Responsive Design",
      "Stripe Payment & Subscription Billing",
      "Multi-Language (DE/EN) Support",
      "Google Ads & LinkedIn Tracking",
    ],
  },
  // {
  //   slug: "emakity",
  //   discipline: "E-commerce · Multi-vendor",
  //   title: "Emakity",
  //   challenge:
  //     "A multi-vendor marketplace where every seller runs their own storefront.",
  //   tags: ["Next.js 14", "Laravel 10", "MySQL", "Stripe"],
  //   liveUrl: "https://emakity.com/",
  //   metrics: [],
  //   brief: {
  //     challenge:
  //       "A marketplace spanning food delivery, groceries, catering, car rentals and local services has almost nothing in common between verticals except the checkout.",
  //     solution:
  //       "One catalogue and checkout parameterised by vertical, with vendor storefronts, commission and payout logic in Laravel, and SSR/ISR product pages so each vertical is independently indexable.",
  //   },
  //   summary:
  //     "A full-featured e-commerce marketplace with multi-vendor support, letting sellers manage their own storefronts, listings and inventory. Advanced catalogue management with filtering, search and category navigation, a secure checkout across multiple gateways, and real-time order tracking. The Laravel backend handles commission calculation, vendor payouts and inventory sync; the Next.js frontend serves SEO-optimised product pages with SSR and ISR.",
  //   highlights: [
  //     "Multi-vendor marketplace with independent seller storefronts",
  //     "Advanced product catalogue with filtering and search",
  //     "Secure checkout with multiple payment gateways",
  //     "Real-time order tracking and status updates",
  //     "Vendor dashboard with inventory and earnings management",
  //     "SEO-optimised product pages with SSR and ISR",
  //   ],
  //   techStack: [
  //     "Next.js 14 (App Router)",
  //     "Laravel 10 API Backend",
  //     "MySQL with Eloquent ORM",
  //     "Stripe Payment Processing",
  //     "Redux Toolkit & NextAuth.js",
  //     "AWS S3 for Media Storage",
  //   ],
  // },
  {
    slug: "neonbit",
    discipline: "Ad-tech · Two-sided marketplace",
    title: "Neonbit",
    challenge:
      "Brand-safe advertising inside live gaming streams, planned and measured in minutes.",
    tags: ["React", "TypeScript", "Laravel API", "Campaign planner"],
    cover: `${SCREENSHOTS}/02-neonbit/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/02-neonbit/4-walkthrough.mp4`,
    liveUrl: "https://neonbit.at/",
    metrics: [
      { value: "500+", label: "verified streamers" },
      { value: "24h", label: "briefing to go-live" },
      { value: "\u22642h", label: "first response" },
    ],
    brief: {
      challenge:
        "Brands buying into live streams were doing it on instinct: no way to price a campaign before committing to it, and no way to know afterwards what the money had actually reached.",
      solution:
        "A budget planner that turns a spend and a CPM into projected impressions and clicks before anything is booked, over a creator network where every streamer carries a category, a language and a brand-safety score.",
    },
    summary:
      "A two-sided marketplace connecting brands with gaming streamers for in-stream banner advertising. Brands plan campaigns against a live CPM calculator that projects reach and clicks from a budget, target by game, platform, language, region and interest, then measure delivery against real-time KPIs for reach, clicks and viewability. Streamers join a vetted network carrying categories, languages and a brand-safety score, and earn from campaigns routed to them dynamically. Pricing is performance-based on a transparent CPM that steps down with budget, so a brand only pays for what is delivered.",
    highlights: [
      "Two-sided platform serving brands and streamers from one product",
      "Budget planner projecting impressions and clicks before booking",
      "Over 500 verified streamers with categories, languages and safety scores",
      "Targeting by game, platform, language, region and interest",
      "Real-time KPIs for reach, clicks and viewability, exportable as CPM reports",
      "Performance-based CPM that steps down as budget rises",
    ],
    techStack: [
      "React.js with TypeScript",
      "Custom Laravel API Backend",
      "Protected Routes & Role-Scoped Views",
      "Real-Time Analytics Pipeline",
      "Campaign Planning & CPM Engine",
    ],
  },
  {
    slug: "snapdebt",
    discipline: "Fintech · Workflow Automation",
    title: "SnapDebt",
    challenge: "Debt recovery for 10,000+ Florida businesses, 30% faster.",
    tags: ["React", "Redux Toolkit", "Node.js", "AWS S3"],
    cover: `${SCREENSHOTS}/09-snapdebt/1-desktop-hero.png`,
    video: `${SCREENSHOTS}/09-snapdebt/4-walkthrough.mp4`,
    liveUrl: "https://snapdebtrecovery.com/",
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
    summary:
      "USA-based debt recovery and management web application serving 10,000+ businesses managing accounts across Florida and Orlando. Provides automated collection workflows, debtor tracking, payment plan management and compliance reporting.",
    highlights: [
      "10k+ businesses served across Florida",
      "Automated debt collection workflows",
      "Debtor tracking and payment plan management",
      "Compliance reporting and audit trails",
      "Secure document storage on AWS S3",
      "Real-time dashboard with analytics",
    ],
    techStack: [
      "React.js Frontend",
      "Node.js API Backend",
      "Redux Toolkit for State",
      "Prisma ORM for Database",
      "AWS S3 for Document Storage",
      "Automated Workflow Engine",
    ],
  },
];
