import { SCRUB_LINE, SIGNALS, STORY_CARDS } from "@/content/home";
import { ScrubLine } from "../ScrubLine";
import {
  DEPTH_BACKDROP,
  DEPTH_SECTION,
  storyCardClass,
  storyCardTitleClass,
} from "../styles";

/**
 * The design-approach section: a signal marquee, a bento of five tiles, and the
 * closing sentence that scrubs in word by word.
 */
export function Story() {
  return (
    <section
      className={`story-section ${DEPTH_SECTION} px-[max(20px,50vw_-_560px)] pt-[118px] pb-[132px] [background:radial-gradient(circle_at_18%_10%,#dab87614,#0000_28%),oklch(15%_0.012_260)] to-sm:px-[20px]`}
      aria-label="Design approach"
    >
      <div
        className={`${DEPTH_BACKDROP} depth-backdrop-story`}
        aria-hidden="true"
      />

      <SignalMarquee />
      <StoryBento />
      <ScrubLine text={SCRUB_LINE} />
    </section>
  );
}

/**
 * Breaks the content rail to run the full viewport width.
 *
 * `[border-block:…]` rather than `border-y border-[…]`: the latter also paints
 * the left and right border colours, which should stay at `currentColor`.
 */
function SignalMarquee() {
  return (
    <div
      className="signal-marquee mt-[-36px] mb-[58px] ml-[calc(50%-50vw)] w-screen overflow-hidden [border-block:1px_solid_#f5f1e814] text-[clamp(22px,4vw,56px)] leading-none font-[780] whitespace-nowrap text-[#f5f1e86b] to-sm:mb-[52px]"
      aria-hidden="true"
    >
      {/* The -50% slide works only because the track holds the words twice, so
          the seam always lands on an identical copy.

          `motion-reduce:animate-none` rather than leaning on the global
          reduced-motion rule in `globals.css`: that one only shortens the
          duration, which would snap the track to its -50% end state instead of
          leaving it at rest. */}
      <div className="flex w-max animate-[marquee-slide_34s_linear_infinite] gap-[clamp(22px,4vw,56px)] pt-[12px] pb-[14px] will-change-transform motion-reduce:animate-none">
        {[...SIGNALS, ...SIGNALS].map((signal, index) => (
          <span className="inline-flex" key={`${signal}-${index}`}>
            {signal}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * A 12-column bento. `dense` lets the five tiles backfill rather than leaving a
 * hole when a span does not divide evenly. The 1px gaps show the wrapper's
 * background through, so the grid lines cost no elements.
 */
function StoryBento() {
  return (
    <div className="story-bento grid grid-flow-dense grid-cols-[repeat(12,minmax(0,1fr))] gap-px border border-line bg-[#f5f1e81a] to-sm:grid-cols-[1fr]">
      {STORY_CARDS.map((card) => (
        <article className={storyCardClass(card.size)} key={card.title}>
          {/* The scale steps down with the column span rather than being one
              value for all five tiles — see `storyCardTitleClass`. That is what
              removed the `overflow-wrap: break-word` backstop this heading used
              to need, and the mid-word break it was failing to prevent. */}
          <h3 className={storyCardTitleClass(card.size)}>{card.title}</h3>
          <p className="mx-0 mt-[36px] mb-0 max-w-[280px] text-[17px] leading-[1.45] text-muted">
            {card.text}
          </p>
        </article>
      ))}
    </div>
  );
}
