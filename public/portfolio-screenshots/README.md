# Upwork Portfolio Projects — Paste-Ready Details + Screenshots

Everything below maps 1:1 to Upwork's **"Add a new portfolio project"** form:
Project title (≤70 chars) · Your role (≤100) · Project description (≤600) ·
Skills and deliverables (≤5) · Related Upwork job (optional) · Add content = the
screenshots in each folder.

Each project folder holds 3 images plus a video:
`1-desktop-hero.png`, `2-desktop-full.png` (long/full page), `3-mobile.png`, and
`4-walkthrough.mp4` — a smooth top-to-bottom scrolling walkthrough of the full
page (1440×810, 16:9, ~7–21s), ready to drop into Upwork's "Add content" video slot.

**Captured: 14 projects — 42 images + 14 videos.** Every folder below is complete.
JACOBS was captured with its cookie banner accepted so the page renders clean
(not dimmed).

**No screenshots:** Emakity (`emakity.com`) renders blank to a headless browser
(auth-gated SPA). Its details are still included at the end — add manual
screenshots if you can log in.

Entries are ordered by folder number. Copy for each project is kept in sync with
`src/content/projects.ts`, which is the source of truth for wording.

---

## 1. Lappeland  📁 `01-lappeland/`  · live: lappeland.no

- **Title:** Lappeland — Next.js Outdoor Gear Marketplace (Norway)
- **Role:** Full-Stack Engineer (Next.js, React, TypeScript)
- **Description:** Production outdoor/hunting gear marketplace for the Norwegian market, built on the Next.js App Router with SSR/ISR for SEO, secure NextAuth login, and a mobile-first UI that scores ~95 on Lighthouse performance. Redux Toolkit for cart/state, Prisma over MongoDB, fully responsive across devices.
- **Skills:** Next.js · React · TypeScript · Prisma · Tailwind CSS

## 2. Neonbit  📁 `02-neonbit/`  · live: neonbit.at

- **Title:** Neonbit — In-Stream Gaming Ad Marketplace (500+ Streamers)
- **Role:** Front-End Engineer (React, TypeScript, Laravel API)
- **Description:** Two-sided marketplace connecting brands with gaming streamers for in-stream banner advertising. Brands plan campaigns against a live CPM calculator that projects reach and clicks from a budget, target by game, platform, language and region, then measure delivery against real-time KPIs. Streamers join a vetted network carrying categories, languages and a brand-safety score. React + TypeScript front end on a custom Laravel API, with protected routes and role-scoped views.
- **Skills:** React · TypeScript · Laravel API · Campaign Analytics · SaaS

## 3. Global Shopaholic  📁 `03-global-shopaholic/`  · live: globalshopaholics.com

- **Title:** Global Shopaholic — US E-Commerce Platform (Vue + Laravel)
- **Role:** Full-Stack Developer (Vue 3, Laravel 8)
- **Description:** Online shopping platform for a US retail client, with secure payment-gateway integration, reliable order processing, and a Bootstrap Vue 3 storefront on a Laravel 8 backend. Delivered end-to-end from spec to deployment, working directly with non-technical stakeholders.
- **Skills:** Vue.js · Laravel · PHP · REST API · E-Commerce

## 4. JACOBS Drycleaners  📁 `04-jacobs-drycleaners/`  · live: jacobsdrycleaners.co.uk

- **Title:** JACOBS Drycleaners — UK Service Booking Site (Nuxt + Laravel)
- **Role:** Full-Stack Developer (Nuxt.js, Laravel 8)
- **Description:** Dry-cleaning service-booking and customer-management site for the UK market. Customers book and track orders; staff manage customers and jobs from an admin area. Built with Nuxt.js on a Laravel 8 API, shipped from requirements through deployment for a non-technical client.
- **Skills:** Nuxt.js · Vue.js · Laravel · REST API · Full-Stack Development

## 5. Halcyon  📁 `05-halcyon/`  · live: halcyonsolutions.ai

- **Title:** Halcyon — AI Tax Platform for 700+ Financial Institutions
- **Role:** Full-Stack + AI Engineer (React, Node.js, OpenAI)
- **Description:** US tax-management cloud platform serving 700+ financial institutions and processing millions in returns, integrated with IRS tax APIs. Built an LLM tax-return summarizer and a natural-language-to-SQL query tool so staff can query data in plain English. React + Ant Design front end, Node.js and MySQL/Prisma backend on an Onion Architecture.
- **Skills:** React · Node.js · OpenAI API · MySQL · Prisma

## 6. Ayshei  📁 `06-ayshei/`  · live: ayshei.com

- **Title:** Ayshei — Classifieds Marketplace with AI Search (100k+ users)
- **Role:** Full-Stack + AI Engineer (React, Node.js, GraphQL)
- **Description:** UAE classifieds and auctions marketplace used by 100,000+ people. Added an AI listing assistant (photo → title + description) and vector-based semantic search over listings. React + GraphQL front end, Node.js and Golang microservices on PostgreSQL, deployed on AWS EC2 with Docker.
- **Skills:** React · Node.js · GraphQL · PostgreSQL · Semantic Search

## 7. Morta  📁 `07-morta/`  · live: morta.com

- **Title:** Morta — Construction Procurement & Budgeting SaaS
- **Role:** Full-Stack Engineer (Next.js, Node.js, GraphQL)
- **Description:** SaaS platform letting property developers manage procurement, budgeting, stakeholder coordination and project planning in one workspace, spanning pre-construction through delivery and post-handover. Procurement is modelled as a six-state tender flow from verified supplier to item procured. Next.js for SSR, GraphQL to keep cross-phase reads to one round trip, Stripe SDK for subscription billing, with Jest and Cypress coverage and a Storybook-documented component library.
- **Skills:** Next.js · Node.js · GraphQL · Stripe · TypeScript

## 8. LiftFoils  📁 `08-liftfoils/`  · live: liftfoils.com

- **Title:** LiftFoils — Headless Shopify Store (2× Traffic After Rebuild)
- **Role:** Full-Stack Engineer (Next.js 14, Shopify Storefront API)
- **Description:** High-performance headless e-commerce store for a premium electric hydrofoil brand, where site traffic doubled after the Next.js migration. Features a guided 3D product configurator that narrows by rider level before showing a price, region-based pricing with multi-currency support, and Stripe checkout with Apple Pay and Google Pay. Headless Shopify keeps inventory and order management while giving full design freedom; ISR holds sub-second page loads.
- **Skills:** Next.js · Shopify API · TypeScript · Stripe · Headless Commerce

## 9. SnapDebt  📁 `09-snapdebt/`  · live: snapdebtrecovery.com

- **Title:** SnapDebt — Debt Recovery Platform for 10,000+ Businesses
- **Role:** Full-Stack Engineer (React, Node.js, Prisma)
- **Description:** Debt-recovery and collections management app for Florida businesses, used by 10,000+ businesses. Automated collection workflows, compliance reporting, and document storage on AWS S3. React + Redux Toolkit front end on a Node.js/Prisma backend.
- **Skills:** React · Node.js · Redux Toolkit · Prisma · AWS

## 10. NerdWallet  📁 `10-nerdwallet/`  · live: nerdwallet.com

- **Title:** NerdWallet — Financial Product Comparison Platform
- **Role:** Front-End Engineer (Next.js, React, TypeScript)
- **Description:** Financial comparison and advisory platform with interactive dashboards for credit cards, loans, mortgage rates, insurance and investment products, serving millions of monthly users. Recommendations are personalised by credit profile and spending habits. Server-rendered pages keep the high-intent financial search traffic indexable, with rate data fetched per request from 100+ institutions and an integrated CMS for expert guides.
- **Skills:** Next.js · React · TypeScript · PostgreSQL · SEO

## 11. Bang & Olufsen  📁 `11-bang-olufsen/`  · live: bang-olufsen.com

- **Title:** Bang & Olufsen — Luxury Commerce Across 70+ Countries
- **Role:** Front-End Engineer (Next.js 14, TypeScript, Contentful)
- **Description:** Premium audio and electronics commerce experience with 360-degree product views, video-rich landing pages and recommendations driven by browsing behaviour. Multi-region storefronts carry localised pricing, language and shipping across 70+ countries. A Contentful headless CMS lets marketing publish rich editorial without a deploy, and ISR keeps product pages fresh behind regional edge caching.
- **Skills:** Next.js · TypeScript · GraphQL · Contentful · ISR

## 12. Moonrock  📁 `12-moonrock/`  · live: moonrockpm.com

- **Title:** Moonrock — Property Management Mobile App (React Native)
- **Role:** Mobile Engineer (React Native, TypeScript)
- **Description:** Tenant and landlord management app putting rent, leases and maintenance on one shared record. Tenants pay rent, submit maintenance requests and view lease details; landlords manage properties, track payments, handle maintenance workflows and view financial reports. Stripe handles automated recurring rent, maintenance requests are tracked state rather than messages, and React Native ships it to iOS and Android from one codebase.
- **Skills:** React Native · TypeScript · MySQL · Stripe · Push Notifications

## 13. Deliveroo  📁 `13-deliveroo/`  · live: deliveroo.co.uk

- **Title:** Deliveroo — Delivery Marketplace with Live Rider Tracking
- **Role:** Full-Stack Engineer (Next.js, Node.js, GraphQL)
- **Description:** Restaurant delivery marketplace with real-time order tracking on live rider GPS, dynamic menus that update availability against kitchen capacity, and intelligent search with dietary and cuisine filters. A GraphQL layer collapses restaurant, menu and order reads into single round trips, Redis holds search responses under 100ms at peak, and a socket channel streams rider position without polling.
- **Skills:** Next.js · Node.js · GraphQL · Redis · WebSockets

## 14. Salearis  📁 `14-salearis/`  · live: salearis.com

- **Title:** Salearis — B2B Sales-Talent Marketplace (DACH) with Stripe
- **Role:** Full-Stack Developer (Laravel, Vue.js)
- **Description:** Two-sided marketplace connecting businesses with vetted sales professionals — closers, setters and SDRs — across Germany, Austria and Switzerland. Freelancers browse jobs, manage profiles with CV and video uploads, track performance and schedule interviews; companies get posting, sourcing, screening, team collaboration, reporting and billing. Laravel with Sanctum auth and two-factor, Vue.js front end, Stripe subscription billing, German/English throughout.
- **Skills:** Laravel · Vue.js · Stripe · MySQL · Multi-Language (DE/EN)

---

## No screenshots available (add manually if you can access)

### Emakity — auth-gated SPA (`emakity.com`)
- **Title:** Emakity — Multi-Vendor Marketplace with AI Support Bot
- **Role:** Full-Stack + AI Engineer (Next.js, OpenAI)
- **Description:** Multi-vendor e-commerce marketplace where sellers manage their own storefronts, listings and inventory, with commission calculation and vendor payouts in Laravel. Advanced catalogue with filtering and search, secure checkout across multiple gateways, real-time order tracking, and a RAG support chatbot answering from the store's own docs. Next.js front end on a Laravel/MySQL backend, SSR and ISR for SEO-optimised product pages.
- **Skills:** Next.js · Laravel · Stripe · OpenAI API · MySQL
