<div align="center">

<img src="./profile/banner.svg" alt="Mansha Qarib — Senior React Developer. Systems, not screens." width="100%" />

</div>

<br />

A motion-led portfolio and case-study site. Next.js 15 App Router, TypeScript in
strict mode, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis.

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # type-check → lint → production build
```

---

## Architecture

```
src/
├── app/                    Routes and metadata only — no markup lives here
│   ├── globals.css         Design tokens, variants, base, shared component CSS
│   ├── layout.tsx          Fonts, metadata, providers
│   ├── page.tsx            Home route: composes the sections, nothing else
│   ├── not-found.tsx       404, in the same theme as every other route
│   ├── opengraph-image.tsx Social card, rendered to a real PNG at build time
│   ├── robots.ts sitemap.ts
│   └── work/[slug]/        Case studies, statically generated per slug
├── components/
│   ├── layout/             Shared chrome: AppShell, SiteHeader, TapTransition
│   ├── home/               Home sections + the pieces only it uses
│   │   ├── sections/       One file per band, in reading order
│   │   ├── motion/         Every scroll tween on the page, in one context
│   │   └── styles.ts       Shared Tailwind class combinations
│   └── case-study/         The same shape, for /work/[slug]
├── content/                All copy and data. No component hard-codes a string.
├── hooks/  lib/  providers/
└── styles/                 The two route stylesheets
```

### Where the content lives

Every word, figure and link is in `src/content/`, so a copy edit never touches
markup.

| File | What it holds |
| :--- | :--- |
| `site.ts` | Name, role, canonical URL, SEO keywords |
| `home.ts` | Home page copy, section by section, in render order |
| `projects.ts` | The seven projects: facts, tags, metrics, media paths |
| `case-studies.ts` | Case-study narrative, keyed by slug |
| `career.ts` | The career deck's slides |
| `design-mcp.ts` | The starter-panel matrix |
| `assets.ts` | Paths into `public/` |

A project appears at `/work/<slug>` only if it has an entry in
`case-studies.ts`. The route sets `dynamicParams = false`, so a slug it does not
build is a hard 404 — which is also why the sitemap and the "See case study"
links are both gated on the same check.

---

## The design system

One warm editorial palette — cream and amber on charcoal, inverting to dark ink
on cream paper for the light bands. Every token is declared once, in the
`@theme` block of `globals.css`, and everything else composes from it.

| Token | Value | Role |
| :--- | :--- | :--- |
| `--color-charcoal` | `oklch(11% 0.01 260)` | Page ground |
| `--color-ink` | `oklch(95% 0.018 82)` | Primary text on dark |
| `--color-muted` | `oklch(74% 0.028 78)` | Secondary text on dark |
| `--color-accent` | `oklch(78% 0.086 78)` | The single accent |
| `--color-line` | `#f5f1e824` | Hairlines on dark |
| `--color-paper*` | — | The light bands' ground, ink, body and eyebrow |
| `--color-work*` | — | The work section's alternating grounds |
| `--ease-silk` | `cubic-bezier(0.23, 1, 0.32, 1)` | The site's one voice for motion |

**Breakpoints** are authored as `width <= N`, not Tailwind's `max-[N]` (which
compiles to `< N` and differs by a pixel at the boundary). The custom variants
`to-lg` / `to-md` / `to-sm` carry the exact conditions; read them as "up to and
including". `fine` guards hover-only styling behind
`(hover: hover) and (pointer: fine)`.

### Tailwind first, CSS where it earns it

Presentation is utilities on the element. Shared combinations live in the route's
`styles.ts` rather than being repeated in JSX.

CSS is reserved for what utilities genuinely cannot express, and each remaining
rule is there for a stated reason:

- `nth-child` cycles — the perspective grid's four-colour tiles
- `grid-template-areas` and `display: contents` — the case study's paint pass
- `clip-path: inset(var(--paint) …)` — a custom property written by JS, read by
  the compositor
- `mask-image`, `:has()`, and pseudo-element `content`
- Anything driven by a class on an ancestor (`body.cursor-expanded`,
  `html.is-tap-*`)

---

## How the moving parts fit together

**One scroll clock.** `SmoothScrollProvider` owns the only Lenis instance and
drives it from `gsap.ticker` with `autoRaf: false`. Scroll and ScrollTrigger run
on the same frame; two independent loops would drift sub-frame and show up as
jitter. The context exposes `stop`/`start` and nothing else — publishing scroll
progress through React meant a re-render every frame for a value nothing read.

**One motion module per route.** Every tween lives in a single
`gsap.context()`, so it reverts as a unit and nothing is left mid-tween on
navigation. Sections stay server components; only the motion sibling ships JS.

**JS writes variables, CSS decides what they mean.** The cover tilt, the project
aura, the cursor lens and the paint pass all work this way — no handler touches
a style property directly.

**Measurements stay honest.** `ScrollRefresher` refreshes ScrollTrigger's cached
positions after web fonts swap in and on every client navigation — two things
that change layout without firing a resize event.

**One continuous route transition.** `TapTransition` grows a panel from the
bottom, pushes through the router, then shrinks it away to the top — both halves
in one document, so there is no reload between them.

---

## Accessibility

- `prefers-reduced-motion` is honoured structurally, not softened: Lenis is never
  constructed, scroll motion never starts, and the paint veil is removed
  outright so the section renders in its finished state.
- Every entrance is a `from` tween, and a CSS safety net pins the final state —
  if a tween never runs, content is visible rather than stuck at `opacity: 0`.
- Skip link as the first tab stop; a visible focus ring that is styled, never
  removed; roving tabindex on both tablists.
- The career deck marks inactive cards `aria-hidden` and takes their links out of
  the tab order, so six overlapping cards are not announced at once.
- Text meets WCAG AA. The one eyebrow that did not (4.25:1 on the work ground) is
  now the `--color-work-kicker` token at 5.03:1.

---

## Before deploying

- [ ] `SITE.url` in `src/content/site.ts` feeds `metadataBase`, every canonical
      tag, the sitemap and robots.txt. It must be the real domain.
- [ ] The starter panel's connector URI and `create-mq-app` package in
      `src/content/design-mcp.ts` are placeholders for an unpublished toolkit.
      Publish them or point the panel elsewhere. Everything else on the page is
      real and verifiable.
- [ ] Replace `src/app/favicon.ico` (still the Next.js default).
- [ ] Neonbit is the one project still on generated artwork — `neonbit.at` is
      offline, so there was no live site to capture.

---

## Profile README

`profile/` holds a GitHub profile README in this same theme, ready to copy into
the `manshaqarib777/manshaqarib777` repository. Copy both `README.md` and
`banner.svg` — the README references the banner by relative path.
