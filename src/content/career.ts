import { SCREENSHOTS } from "./assets";

export const CAREER_HEADING = "CAREER";

export interface CareerSlide {
  /**
   * The engagement. Kept short on purpose — the slide sets this at `text-6xl`,
   * so anything much longer wraps to a second line and pushes that card taller
   * than its neighbours.
   *
   * Where a start year is known it is appended. The engagements taken as an
   * independent contractor carry the era in `context` instead, because the
   * individual years are not recorded anywhere in the source material and a
   * guessed date on a CV is worse than no date.
   */
  title: string;
  /** Who it was for, and in what capacity. */
  context: string;
  video?: string;
  poster?: string;
  stack: readonly string[];
  liveUrl?: string;
  /**
   * Only the engagements with a written case study under `/work/[slug]`. That
   * route sets `dynamicParams = false`, so a slug it does not build is a 404 —
   * slides without one simply do not render the second button.
   */
  caseSlug?: string;
}

/**
 * One slide per engagement, newest era first.
 *
 * A slide with no `video` falls back to the offline mark rather than being
 * dropped from the timeline, and one with no `poster` simply starts on its own
 * ground — so a project is never excluded for lack of media.
 *
 * The deck's geometry scales with this array: `CareerCarousel` publishes
 * `--items` from its length, and the card transforms multiply by it. Adding or
 * removing a slide needs no CSS change.
 */
export const CAREER_SLIDES: readonly CareerSlide[] = [
  /* ------------------------------------------- Independent, Feb 2023 onward */
  {
    title: "LAPPELAND — 2023",
    context: "INDEPENDENT · CONTRACT",
    video: `${SCREENSHOTS}/01-lappeland/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/01-lappeland/1-desktop-hero.png`,
    stack: ["NEXT.JS", "TYPESCRIPT", "PRISMA", "NEXTAUTH", "TAILWIND"],
    liveUrl: "https://lappeland.no",
    caseSlug: "lappeland",
  },
  {
    title: "LIFTFOILS",
    context: "INDEPENDENT · CONTRACT",
    video: `${SCREENSHOTS}/08-liftfoils/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/08-liftfoils/1-desktop-hero.png`,
    stack: ["NEXT.JS 14", "SHOPIFY", "TYPESCRIPT", "STRIPE"],
    liveUrl: "https://www.liftfoils.com/",
  },
  {
    title: "BANG & OLUFSEN",
    context: "INDEPENDENT · CONTRACT",
    video: `${SCREENSHOTS}/11-bang-olufsen/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/11-bang-olufsen/1-desktop-hero.png`,
    stack: ["NEXT.JS 14", "TYPESCRIPT", "GRAPHQL", "CONTENTFUL"],
    liveUrl: "https://www.bang-olufsen.com/",
  },
  {
    title: "NERDWALLET",
    context: "INDEPENDENT · CONTRACT",
    video: `${SCREENSHOTS}/10-nerdwallet/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/10-nerdwallet/1-desktop-hero.png`,
    stack: ["NEXT.JS", "REACT", "TYPESCRIPT", "POSTGRESQL"],
    liveUrl: "https://www.nerdwallet.com/",
  },
  {
    // Captured by hand: the site answers an automated browser with a bot
    // challenge, so this one was not scripted like the rest.
    title: "DELIVEROO",
    context: "INDEPENDENT · CONTRACT",
    video: `${SCREENSHOTS}/13-deliveroo/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/13-deliveroo/1-desktop-hero.png`,
    stack: ["NEXT.JS", "NODE.JS", "GRAPHQL", "REDIS"],
    liveUrl: "https://deliveroo.co.uk/",
    caseSlug: "deliveroo",
  },
  // {
  //   // No capture: renders blank to a headless browser.
  //   title: "EMAKITY",
  //   context: "INDEPENDENT · CONTRACT",
  //   stack: ["NEXT.JS 14", "LARAVEL 10", "MYSQL", "STRIPE"],
  //   liveUrl: "https://emakity.com/",
  // },
  {
    // Captured by hand: the host did not respond to an automated browser.
    title: "SALEARIS",
    context: "INDEPENDENT · CONTRACT",
    video: `${SCREENSHOTS}/14-salearis/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/14-salearis/1-desktop-hero.png`,
    stack: ["LARAVEL", "VUE.JS", "STRIPE", "SANCTUM"],
    liveUrl: "https://salearis.com/",
    caseSlug: "salearis",
  },
  {
    title: "NEONBIT",
    context: "INDEPENDENT · CONTRACT",
    video: `${SCREENSHOTS}/02-neonbit/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/02-neonbit/1-desktop-hero.png`,
    stack: ["REACT", "TYPESCRIPT", "LARAVEL API", "REAL-TIME KPIS"],
    liveUrl: "https://neonbit.at/",
    caseSlug: "neonbit",
  },

  /* ------------------------------------ Carbonic IT, 2022 – February 2023 */
  {
    title: "JACOBS — 2022",
    context: "CARBONIC IT · FULL-STACK",
    video: `${SCREENSHOTS}/04-jacobs-drycleaners/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/04-jacobs-drycleaners/1-desktop-hero.png`,
    stack: ["NUXT.JS", "VUE", "LARAVEL", "REST API"],
    liveUrl: "https://jacobsdrycleaners.co.uk",
  },
  {
    title: "SHOPAHOLIC — 2022",
    context: "CARBONIC IT · FULL-STACK",
    video: `${SCREENSHOTS}/03-global-shopaholic/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/03-global-shopaholic/1-desktop-hero.png`,
    stack: ["VUE 3", "LARAVEL", "PHP", "PAYMENTS"],
    liveUrl: "https://globalshopaholics.com",
  },

  /* ------------------------------------------------------ VisionX, 2019 – 2022 */
  {
    title: "MORTA",
    context: "VISIONX · FRONTEND",
    video: `${SCREENSHOTS}/07-morta/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/07-morta/1-desktop-hero.png`,
    stack: ["NEXT.JS", "NODE.JS", "GRAPHQL", "STRIPE"],
    liveUrl: "https://morta.com/",
  },
  {
    title: "AYSHEI — 2019",
    context: "VISIONX · FRONTEND",
    video: `${SCREENSHOTS}/06-ayshei/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/06-ayshei/1-desktop-hero.png`,
    stack: ["REACT", "GRAPHQL", "POSTGRESQL", "AWS", "DOCKER"],
    liveUrl: "https://ayshei.com",
    caseSlug: "ayshei",
  },
  {
    title: "HALCYON — 2019",
    context: "VISIONX · FRONTEND",
    video: `${SCREENSHOTS}/05-halcyon/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/05-halcyon/1-desktop-hero.png`,
    stack: ["REACT", "NODE.JS", "OPENAI", "MYSQL", "PRISMA"],
    liveUrl: "https://halcyonsolutions.ai",
    caseSlug: "halcyon",
  },

  /* ------------------------------------------------------- Dixeam, 2017 – 2019 */
  {
    title: "SNAPDEBT — 2017",
    context: "DIXEAM · TEAM LEAD",
    video: `${SCREENSHOTS}/09-snapdebt/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/09-snapdebt/1-desktop-hero.png`,
    stack: ["REACT", "REDUX", "NODE.JS", "PRISMA", "AWS"],
    liveUrl: "https://snapdebtrecovery.com",
    caseSlug: "snapdebt",
  },
  {
    title: "MOONROCK",
    context: "DIXEAM · TEAM LEAD",
    video: `${SCREENSHOTS}/12-moonrock/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/12-moonrock/1-desktop-hero.png`,
    stack: ["REACT NATIVE", "TYPESCRIPT", "MYSQL", "STRIPE"],
    liveUrl: "https://www.moonrockpm.com",
  },
];
