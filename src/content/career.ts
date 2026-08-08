import { SCREENSHOTS } from "./assets";

export const CAREER_HEADING = "CAREER";

export interface CareerSlide {
  /**
   * Engagement plus its start year, as one line. Names are kept short on
   * purpose — the slide sets this at `text-6xl`, so anything longer wraps to a
   * second line and pushes that slide taller than its neighbours.
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
 * One slide per engagement, newest first — the six with a captured walkthrough.
 * Anything without a video falls back to the offline placeholder in the slide,
 * rather than being dropped from the timeline.
 */
export const CAREER_SLIDES: readonly CareerSlide[] = [
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
  {
    title: "SNAPDEBT — 2017",
    context: "DIXEAM · TEAM LEAD",
    video: `${SCREENSHOTS}/09-snapdebt/4-walkthrough.mp4`,
    poster: `${SCREENSHOTS}/09-snapdebt/1-desktop-hero.png`,
    stack: ["REACT", "REDUX", "NODE.JS", "PRISMA", "AWS"],
    liveUrl: "https://snapdebtrecovery.com",
    caseSlug: "snapdebt",
  },
];
