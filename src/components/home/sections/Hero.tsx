import { HERO } from "@/content/home";
import { PerspectiveGrid } from "../PerspectiveGrid";
import { BUTTON, BUTTON_LINE, BUTTON_PRIMARY, BUTTON_SECONDARY, KICKER } from "../styles";

/**
 * The hero.
 *
 * No client JavaScript of its own: the tile grid's hover flashes are pure CSS,
 * and the entrance and parallax are driven by the page's single motion sibling.
 * `hero-copy` and `hero` are kept in the class list as GSAP hooks.
 */
export function Hero() {
  return (
    <section
      className="hero relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-[linear-gradient(#030508_0%,#070b12_56%,#11141a_100%)] px-[max(20px,50vw_-_560px)] pt-[168px] pb-[86px] text-center to-lg:min-h-[92vh] to-lg:grid-cols-1 to-sm:pt-[132px]"
      id="top"
    >
      <PerspectiveGrid variant="hero" />

      {/* 980px, not 760px: the h1 tops out at 132px, and its longest authored
          line needs ~820px at that size. A 760px column silently re-wrapped it
          into a third line. The body copy keeps its own 620px measure below. */}
      <div className="hero-copy relative z-[2] grid w-[min(980px,100%)] place-items-center">
        <p className={`eyebrow m-0 ${KICKER}`}>{HERO.eyebrow}</p>

        {/* Deliberately not carrying the `to-sm:text-[clamp(42px,13vw,64px)]`
            step the section h2s use. That step would render the h1 at ~49px on a
            375px viewport, below the 56px floor of its own clamp — i.e. smaller
            than the h2s beneath it. The h1 stays the largest type on the page at
            every width, which is the point of it. */}
        <h1 className="m-0 max-w-[980px] font-display text-[clamp(56px,9vw,132px)] font-[600] leading-[0.88] tracking-[0px]">
          {HERO.titleLines.map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <p className="hero-text mx-0 mt-[28px] mb-0 max-w-[620px] text-[clamp(18px,1.8vw,22px)] leading-[1.35] text-muted">
          {HERO.text}
        </p>

        {/* `role="group"` so the label is actually announced — `aria-label` on a
            bare div is ignored, because a div exposes no role to name. */}
        <div
          className="hero-actions mt-[34px] flex flex-wrap justify-center gap-[12px]"
          role="group"
          aria-label="Primary actions"
        >
          <a
            className={`button primary ${BUTTON} ${BUTTON_LINE} ${BUTTON_PRIMARY}`}
            href={HERO.actions.primary.href}
          >
            {HERO.actions.primary.label}
          </a>
          <a
            className={`button secondary ${BUTTON} ${BUTTON_SECONDARY}`}
            href={HERO.actions.secondary.href}
          >
            {HERO.actions.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
