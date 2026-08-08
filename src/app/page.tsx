import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "@/styles/home.css";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { CareerCarousel } from "@/components/home/CareerCarousel";
import { CursorLens } from "@/components/home/CursorLens";
import { SiteLoader } from "@/components/home/SiteLoader";
import { HomeMotion } from "@/components/home/motion";
import { Capabilities } from "@/components/home/sections/Capabilities";
import { Contact } from "@/components/home/sections/Contact";
import { DesignMcp } from "@/components/home/sections/DesignMcp";
import { Experience } from "@/components/home/sections/Experience";
import { Hero } from "@/components/home/sections/Hero";
import { Intro } from "@/components/home/sections/Intro";
import { Perspective } from "@/components/home/sections/Perspective";
import { Story } from "@/components/home/sections/Story";
import { Work } from "@/components/home/sections/Work";
import { HERO, NAV_LINKS } from "@/content/home";

/**
 * The connector URI is set in Courier Prime. Declared here rather than in the
 * root layout so the face is only requested on this route.
 */
const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
  display: "swap",
});

/**
 * Material Symbols Rounded, subset to only the six ligatures this page actually
 * renders. `next/font` cannot express `icon_names`, so this stays a stylesheet
 * link — the subset is worth far more than self-hosting the whole icon set.
 */
const ICON_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,600,1,0&icon_names=check,content_copy,description,expand_circle_right,link,terminal&display=block";

export const metadata: Metadata = {
  title: "Mansha Qarib — Senior React Developer",
  description: HERO.text,
  alternates: { canonical: "/" },
};

/**
 * The home page.
 *
 * A server component: every word ships in the initial HTML, and the hero needs
 * no client JS at all — the tile flashes and the nav indicator are pure CSS.
 * Only five children ship JavaScript: the loader, the cursor lens, the career
 * deck, the starter panel, and the single motion sibling at the end.
 *
 * The sections are composed here in reading order and own their own markup;
 * `src/components/home/styles.ts` holds the class combinations they share.
 */
export default function HomePage() {
  return (
    // `id="main"` is the target of the shared skip link in AppShell.
    // `portfolio` is the theme scope hook for the rules that stay in CSS.
    // `--fade-stop` is declared here because the perspective grid's overlay
    // gradient reads it.
    <main
      className={`portfolio ${courierPrime.variable} relative block cursor-crosshair bg-charcoal font-display tracking-[0px] text-ink [--fade-stop:#030508] [font-synthesis:none] [overflow-x:clip]`}
      id="main"
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href={ICON_FONT_HREF} />

      {/* First in the shell so it is present in the server HTML: a loader that
          only appeared after hydration would flash the page it is meant to
          cover. It removes itself once the reveal finishes.

          Shipping it server-side means it is the one element that can outlive
          its own script, so the escape hatch is not optional: without JS the
          overlay would cover a page that is otherwise perfectly readable. */}
      <noscript>
        <style>{`.portfolio .site-loader { display: none; }`}</style>
      </noscript>
      <SiteLoader />

      <CursorLens />

      {/* Shared with the case pages — see `@/components/layout/SiteHeader`. */}
      <SiteHeader brandHref="#top" links={NAV_LINKS} />

      <Hero />
      <DesignMcp />
      <Intro />
      <Story />
      <Work />
      <Capabilities />
      <Experience />
      {/* A dark band between the two light editorial sections, following the
          page's light/dark alternation. */}
      <CareerCarousel />
      <Perspective />
      <Contact />

      <HomeMotion />
    </main>
  );
}
