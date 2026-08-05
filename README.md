# Mansha Qarib — Portfolio

A premium, motion-led portfolio built with Next.js 15 (App Router), TypeScript in
strict mode, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis, React Three Fiber and
Framer Motion.

Content is populated from the CV: five case studies (Halcyon, Ayshei, Lappeland,
SnapDebt, Neonbit), four roles, education and HackerRank certifications.

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # type-check → lint → production build
```

---

## Where the content lives

All copy, projects and identity live in `src/constants/`. Nothing is hard-coded
into components, so editing anything is a single-file change.

| File | What it holds |
| --- | --- |
| `src/constants/site.ts` | Name, role, email, phone, location, time zone, SEO keywords, canonical URL |
| `src/constants/projects.ts` | The five case studies: copy, metrics, stack, links, image paths |
| `src/constants/experience.ts` | Four roles, headline stats, principles, education + certifications |
| `src/constants/skills.ts` | Skill groups with 0–100 levels, and the toolbelt marquee |
| `src/constants/socials.ts` | GitHub, LinkedIn, email, phone |
| `src/constants/nav.ts` | Section order in the navbar |
| `src/constants/motion.ts` | Easing, durations and stagger — the site's motion language |

### Three judgement calls worth reviewing

1. **Skill percentages are editorial, not measured.** A CV lists what you know,
   not a self-rating, so the 0–100 values in `skills.ts` are my estimate of
   relative depth. The section's copy frames them as *confidence rather than
   credentials* for that reason — but they're your numbers, so change them.
2. **Case-study chapter prose is written from CV bullet points.** The facts,
   figures, stacks and outcomes are all yours; the narrative framing around them
   is mine. Read it before it goes public — particularly Neonbit and SnapDebt,
   where the CV gave less to work from.
3. **Metrics only include figures the CV supports.** Neonbit has none, so its
   metrics block doesn't render rather than showing invented numbers. Lappeland
   has one. Add more as you can substantiate them.

### Imagery

`public/portrait.svg`, `public/work/*.svg` and `public/og.svg` are generated
placeholders. Drop real screenshots and a portrait in with the same filenames (or
update the paths in `projects.ts`) and delete `scripts/`.

```bash
npm run placeholders   # regenerate the placeholder artwork
```

Use JPEG/WebP for real imagery: Next's image optimizer passes SVG through
untouched, so the placeholders get none of the resizing or format conversion real
screenshots will.

### Before launch

- [ ] Set `SITE.url` — it's `https://manshaqarib.com`, which may not be yours yet
- [ ] Swap in real project screenshots and a portrait photo
- [ ] Replace the OG image with a raster 1200×630 PNG/JPEG (SVG OG cards don't
      render on most social platforms)
- [ ] **Wire up the contact form** — see below
- [ ] Replace `src/app/favicon.ico` (still the Next.js default)
- [ ] Review the skill percentages and case-study prose (above)

---

## The contact form is not connected yet

`src/app/api/contact/route.ts` validates submissions and returns success, but
**does not deliver them anywhere** — the payload is logged server-side and
discarded. As it stands, enquiries are silently dropped.

There is a marked `TODO` in the route. Add an email provider there (Resend,
Postmark, SES, or a webhook into your CRM) and the client needs no changes: the
form already handles loading, field errors, server errors and the success state.

Validation lives in `src/lib/validation.ts` and is shared by the client and the
route, so client-side rules cannot drift from server-side ones.

---

## Architecture

```
src/
├── animations/     GSAP primitives (reveal.ts) and SplitType helpers (splitText.ts)
├── app/            Routes, metadata, sitemap, robots, contact API
├── components/
│   ├── contact/    Contact form
│   ├── layout/     AppShell, Navbar, Footer, ScrollRefresher
│   ├── projects/   Project row, hover preview, horizontal showcase, case study
│   ├── ui/         Button, Cursor, Preloader, TextReveal, Reveal, Marquee, …
│   └── webgl/      R3F canvas, gradient plane, particle field
├── constants/      All content and the motion language
├── hooks/          Reusable behaviour (magnetic, active section, media queries, …)
├── lib/            gsap singleton, validation, math/class utilities
├── providers/      Smooth scroll, cursor state, loading state
├── sections/       The six page sections
├── shaders/        GLSL (noise, aurora gradient, particles)
└── types/          Shared types
```

### How the moving parts fit together

**One scroll clock.** `SmoothScrollProvider` owns the only Lenis instance and
drives it from `gsap.ticker` with `autoRaf: false`. Scroll and ScrollTrigger then
run on the same frame; two independent loops would drift sub-frame and show up as
jitter on pinned sections.

**One WebGL surface.** `components/webgl/Scene.tsx` renders a single canvas behind
the whole app — dynamically imported with `ssr: false`, so three.js never touches
first paint. Particle count and DPR scale down on mobile, `AdaptiveDpr` drops
resolution if the frame budget slips, and the render loop stops entirely when the
tab is hidden.

**One preloader hand-off.** `LoadingProvider` exposes `isRevealing`, flipped by
the preloader as its overlay starts to lift. The hero's timeline is gated on it,
so the type is already moving behind the closing overlay instead of starting from
a standstill once it clears.

**Measurements stay honest.** ScrollTrigger caches element positions.
`ScrollRefresher` refreshes them after web fonts swap in, after the preloader
unmounts and on every client navigation — three things that change layout without
firing a resize event.

**Transforms only.** Every animation targets transform or opacity. Skill bars use
`scaleX`, not `width`; the cursor and magnetic buttons use `gsap.quickTo`, which
reuses a single tween instead of allocating one per pointer event.

---

## Accessibility

- `prefers-reduced-motion` is honoured structurally, not just softened: Lenis is
  never constructed, the particle field never mounts, the WebGL backdrop renders a
  single static frame, and every entrance is a `from` tween — so skipping the
  animation leaves content in its finished state rather than hidden.
- Split text in `chars` mode exposes the original string via `aria-label` and
  hides the per-glyph spans, so screen readers read one phrase instead of spelling
  it out.
- Skill bars are real `progressbar` roles with values; the copy-email button and
  form outcomes announce through live regions rather than relying on colour.
- Keyboard: skip link, visible focus rings throughout, project rows reveal their
  live/repo links on `focus-within`, and the mobile menu closes on Escape.
- The custom cursor only replaces the native one while it is mounted, and never
  mounts on touch devices.

## Notes

- `TextReveal` in `chars` mode should be used on a heading or other semantic
  element — `aria-label` is ignored on a bare `div`.
- Adding a section means adding it to `src/constants/nav.ts` and giving the
  `<section>` a matching `id`; the active-nav indicator and the smooth-scroll
  links both derive from that list.
