/**
 * Tailwind class combinations for the case-study route.
 *
 * This mirrors `src/components/home/styles.ts`, so both routes are now built
 * the same way: presentation is utilities on the element, and CSS is reserved
 * for what utilities genuinely cannot express.
 *
 * What stayed in `src/styles/case-study.css` is the paint pass and nothing else
 * — see the note at the top of that file. Everything below used to live there as
 * element-scoped rules (`.case-page .case-summary dt { … }`), which meant the
 * markup carried no styling information at all and two cascade accidents were
 * invisible at the call site. Both are now written out explicitly and marked.
 */

/** The section rail. Centres an 1180px measure without a wrapper element. */
const RAIL = "px-[max(20px,50vw_-_590px)] to-sm:px-[20px]";

/** The narrower rail the two full-bleed dark bands use. */
const BAND_RAIL = "px-[max(20px,50vw_-_490px)]";

/**
 * A full-viewport-width band escaping its padded column.
 *
 * `overflow-x: clip` on the shell absorbs the scrollbar, so `100vw` does not
 * introduce a horizontal scroll.
 */
const FULL_BLEED = "w-screen ml-[calc(50%-50vw)]";

/** The 12px eyebrow, on the dark sections where amber has the contrast. */
export const KICKER_DARK =
  "m-0 text-[12px] font-[760] tracking-[0.16em] text-accent uppercase";

/**
 * The same eyebrow on the cream sections.
 *
 * Amber oklch(78% 0.086 78) on cream oklch(96% 0.01 88) is about 1.3:1, which is
 * not readable, so the light sections use the token the design already defines
 * for this job.
 */
export const KICKER_PAPER =
  "m-0 text-[12px] font-[760] tracking-[0.16em] text-paper-kicker uppercase";

/* ---------------------------------------------------------------------------
   Hero
   ------------------------------------------------------------------------ */

export const HERO = [
  "relative",
  RAIL,
  "pt-[156px] pb-[72px] to-sm:pt-[48px] to-sm:pb-[42px]",
  "[background:radial-gradient(circle_at_50%_16%,#dab8761c,#0000_32%),oklch(11%_0.012_260)]",
].join(" ");

export const BREADCRUMBS = [
  "flex flex-wrap items-center gap-[9px]",
  "w-[min(1180px,100%)] mx-auto mb-[64px] to-sm:mb-[44px]",
  "text-[13px] text-muted",
].join(" ");

export const BREADCRUMB_LINK =
  "inline-flex min-h-[40px] items-center rounded-[999px] text-[13px] font-[680] text-muted";

/** The current page — last in the trail, and the one that is not a link. */
export const BREADCRUMB_CURRENT = "text-ink";

export const HERO_COPY =
  "grid justify-items-center w-[min(1080px,100%)] mx-auto text-center";

/**
 * The discipline line above the title.
 *
 * Deliberately *not* `KICKER_DARK`. In the stylesheet this replaced,
 * `.case-hero p` (0,3,1) outranked `.project-index` (0,3,0), so this element
 * resolved to 25px muted body type while keeping only the kicker's weight,
 * tracking and casing. Transcribed as it computed rather than as it was
 * authored, so the cascade accident is preserved deliberately and visibly.
 */
export const HERO_KICKER = [
  "max-w-[680px] mt-[28px] mb-0 mx-0",
  "text-[clamp(19px,2vw,25px)] font-[760] tracking-[0.16em] leading-[1.35]",
  "text-muted uppercase",
].join(" ");

export const HERO_TITLE =
  "max-w-[980px] mt-[18px] mb-0 mx-0 text-[clamp(54px,9vw,126px)] leading-[0.9] tracking-[0px]";

export const HERO_DECK = [
  "max-w-[680px] mt-[28px] mb-0 mx-auto",
  "text-[clamp(19px,2vw,25px)] leading-[1.35] text-balance text-muted",
].join(" ");

/** Three facts, ruled off. */
export const SUMMARY = [
  "grid grid-cols-[repeat(3,minmax(0,1fr))] gap-0",
  "w-[min(980px,100%)] mt-[56px] mx-auto",
  "[border-block:1px_solid_var(--color-line)]",
  "to-sm:grid-cols-[1fr]",
].join(" ");

/** The rule between cells turns from a column divider into a row one. */
export const SUMMARY_CELL = [
  "px-[24px] py-[20px] text-center",
  "[&+div]:[border-left:1px_solid_var(--color-line)]",
  "to-sm:[&+div]:[border-left:0] to-sm:[&+div]:[border-top:1px_solid_var(--color-line)]",
].join(" ");

export const SUMMARY_TERM = "mb-[8px]";

/**
 * A bare `dd` carries a 40px inline-start margin from the UA sheet, which would
 * knock every cell off centre.
 */
export const SUMMARY_DETAIL = "m-0";

/* ---------------------------------------------------------------------------
   Cover band
   ------------------------------------------------------------------------ */

export const COVER_BAND = [
  RAIL,
  "pb-[110px] to-sm:pb-[72px]",
  "bg-[oklch(11%_0.012_260)]",
].join(" ");

export const COVER_FRAME = [
  "relative w-full aspect-[16/9] to-sm:aspect-[4/3]",
  "overflow-hidden rounded-[8px] border border-line bg-[oklch(8%_0.012_260)]",
].join(" ");

/* ---------------------------------------------------------------------------
   Light sections
   ------------------------------------------------------------------------ */

/** The cream ground both editorial sections sit on. */
const PAPER_GROUND = "bg-[oklch(96%_0.01_88)] text-[oklch(11%_0.01_260)]";

export const STORY_INTRO = [RAIL, "py-[118px]", PAPER_GROUND].join(" ");

export const STORY_HOOK = "grid justify-items-center text-center";

export const STORY_HOOK_TITLE = [
  "w-[min(1040px,100%)] mt-[20px] mb-0 mx-0",
  "text-[clamp(42px,6.2vw,92px)] font-[520] leading-[0.96] text-balance",
].join(" ");

export const STORY_PAIR = [
  "grid grid-cols-[repeat(2,minmax(0,1fr))] gap-[clamp(36px,8vw,112px)]",
  "w-[min(980px,100%)] mt-[86px] mx-auto",
  "to-sm:grid-cols-[1fr] to-sm:gap-[42px] to-sm:mt-[62px]",
].join(" ");

export const STORY_PAIR_ITEM = "pt-[20px] [border-top:1px_solid_#15140f29]";

export const STORY_PAIR_LABEL =
  "text-[12px] font-[760] tracking-[0.12em] text-[oklch(48%_0.022_260)] uppercase";

export const STORY_PAIR_BODY = [
  "mt-[20px] mb-0 mx-0",
  "text-[clamp(21px,2vw,29px)] leading-[1.35] text-[oklch(30%_0.018_260)]",
].join(" ");

/** A dark band breaking the light section full-bleed. */
export const PROOF_LINE = [
  "grid grid-cols-[repeat(2,minmax(0,1fr))] gap-[clamp(36px,8vw,112px)]",
  FULL_BLEED,
  BAND_RAIL,
  "mt-[96px] py-[48px] bg-[oklch(13%_0.012_260)]",
  "to-sm:grid-cols-[1fr] to-sm:gap-[34px] to-sm:mt-[68px]",
].join(" ");

export const PROOF_ITEM = "min-w-0";

export const PROOF_LABEL =
  "text-[12px] font-[760] tracking-[0.12em] text-accent uppercase";

export const PROOF_BODY = [
  "mt-[16px] mb-0 mx-0",
  "text-[clamp(18px,1.8vw,24px)] leading-[1.42] text-ink",
].join(" ");

/* ---------------------------------------------------------------------------
   Metrics
   ------------------------------------------------------------------------ */

/**
 * The figure row, sized to the number of figures a project actually has.
 *
 * A three-column grid holding two figures leaves them wedged left of centre
 * against an empty cell, so the column count follows the data — the same rule
 * the work section on the home page uses.
 *
 * Only the three-up row steps down at the tablet tier; one and two are already
 * at or below that count.
 */
const METRIC_COLUMNS: Record<number, string> = {
  1: "grid-cols-[minmax(0,1fr)]",
  2: "grid-cols-[repeat(2,minmax(0,1fr))] to-sm:grid-cols-[1fr]",
  3: "grid-cols-[repeat(3,minmax(0,1fr))] to-lg:grid-cols-[repeat(2,minmax(0,1fr))] to-sm:grid-cols-[1fr]",
};

export const metricRowClass = (count: number) =>
  [
    "grid gap-[clamp(24px,5vw,68px)]",
    "w-[min(1080px,100%)] mt-[88px] mx-auto text-center",
    METRIC_COLUMNS[Math.min(count, 3)] ?? METRIC_COLUMNS[3],
  ].join(" ");

export const METRIC =
  "grid place-items-center content-center min-h-[130px] px-[8px] py-[18px]";

export const METRIC_VALUE = [
  "block text-[clamp(62px,9vw,124px)] font-[470] leading-[0.92] tracking-[0px]",
  "text-[oklch(11%_0.01_260)]",
].join(" ");

export const METRIC_LABEL =
  "block mt-[12px] font-[580] text-[oklch(42%_0.018_260)]";

/** The third line under a figure. Case pages are the only place it shows. */
export const METRIC_NOTE =
  "block max-w-[240px] mt-[10px] text-[14px] leading-[1.45] text-[oklch(50%_0.018_260)]";

/* ---------------------------------------------------------------------------
   Product story
   ------------------------------------------------------------------------ */

export const MEDIA_SECTION = [
  "pt-[112px] to-sm:pt-[58px] to-sm:pb-[82px]",
  PAPER_GROUND,
].join(" ");

const SECTION_HEADING_BASE =
  "grid justify-items-center gap-[18px] mx-auto px-[20px] text-center";

export const SECTION_HEADING = [
  SECTION_HEADING_BASE,
  "mb-[64px] to-sm:mb-[30px]",
].join(" ");

export const SECTION_HEADING_TITLE =
  "m-0 max-w-[780px] text-[clamp(34px,5vw,74px)] leading-[0.94] text-balance";

/** The tighter variant used inside the closing section. */
export const SECTION_HEADING_COMPACT = [SECTION_HEADING_BASE, "mb-[46px]"].join(
  " ",
);

export const SECTION_HEADING_COMPACT_TITLE =
  "m-0 max-w-[820px] text-[clamp(32px,4.8vw,66px)] leading-[0.94] text-balance";

/* ---------------------------------------------------------------------------
   Walkthrough
   ------------------------------------------------------------------------ */

export const VIDEO_BLOCK = [
  "grid grid-cols-[1fr] place-items-center gap-[clamp(28px,4vw,44px)]",
  "w-[min(920px,100%)] mx-auto px-[20px] py-[clamp(82px,10vw,138px)] text-center",
].join(" ");

export const VIDEO_COPY = "grid justify-items-center";

export const VIDEO_TITLE =
  "m-0 mt-[16px] max-w-[760px] text-[clamp(34px,5vw,70px)] leading-[0.98] text-balance";

export const VIDEO_BODY =
  "m-0 mt-[18px] max-w-[540px] leading-[1.5] text-[oklch(42%_0.018_260)]";

/** A phone shell, tilted — how every walkthrough is framed. */
export const VIDEO_FRAME = [
  "relative w-[min(315px,78vw)] aspect-[9/19.5] overflow-hidden",
  "rounded-[42px] border-[10px] border-[oklch(9%_0.012_260)] bg-[oklch(7%_0.012_260)]",
  "[transform:perspective(980px)_rotateX(2deg)_rotateY(-8deg)]",
  "[box-shadow:0_28px_70px_#15140f47,inset_0_0_0_1px_#ffffff29]",
].join(" ");

export const VIDEO_ELEMENT = "block size-full object-cover";

/* ---------------------------------------------------------------------------
   Failure states, decisions, reflection
   ------------------------------------------------------------------------ */

export const CONTENT_SECTION = [
  RAIL,
  "py-[118px] to-sm:py-[82px]",
  PAPER_GROUND,
].join(" ");

export const FAILURE_SECTION = "mt-0 mx-0 mb-[112px]";

export const FAILURE_GRID = [
  "grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[18px]",
  "to-lg:grid-cols-[repeat(2,minmax(0,1fr))] to-sm:grid-cols-[1fr]",
].join(" ");

export const FAILURE_CARD = [
  "min-h-[210px] p-[clamp(24px,3vw,34px)]",
  "rounded-[8px] border border-[#15140f1f] bg-[oklch(95%_0.012_88)]",
].join(" ");

export const FAILURE_TITLE =
  "m-0 text-[clamp(24px,2.3vw,34px)] font-[560] leading-[1.05] text-[oklch(13%_0.012_260)]";

export const FAILURE_BODY =
  "mt-[20px] mb-0 mx-0 leading-[1.48] text-[oklch(42%_0.018_260)]";

/**
 * The decision list.
 *
 * `rise-in` is the one animation on this route and its keyframes stay in CSS;
 * everything about when and how it runs is here.
 */
export const DECISION_LIST =
  "grid grid-cols-[1fr] gap-0 m-0 animate-[rise-in_0.3s_var(--ease-silk)_40ms_both]";

export const DECISION_ROW = [
  "grid grid-cols-[100px_minmax(0,1fr)] gap-[clamp(22px,5vw,72px)]",
  "py-[40px] [border-top:1px_solid_#15140f24]",
  "to-sm:grid-cols-[54px_minmax(0,1fr)]",
].join(" ");

export const DECISION_NUMBER =
  "text-[clamp(34px,4vw,58px)] leading-[1] text-[oklch(48%_0.022_260)]";

/**
 * The padded box around each decision's copy.
 *
 * Its border is `--color-line`, a translucent cream, so on this cream ground it
 * is very nearly invisible — but the padding is load-bearing for the layout.
 */
export const DECISION_BODY = "p-[22px] rounded-[8px] border border-line";

export const DECISION_TITLE =
  "m-0 text-[clamp(26px,3vw,42px)] font-[560] text-[oklch(13%_0.012_260)]";

export const DECISION_TEXT = [
  "max-w-[760px] mt-[14px] mb-0 mx-0",
  "text-[17px] leading-[1.5] text-[oklch(42%_0.018_260)]",
].join(" ");

/**
 * Full-bleed dark close. The negative bottom margin cancels the parent's padding
 * so the band runs to the very end of the section.
 */
export const REFLECTION = [
  "grid justify-items-center",
  FULL_BLEED,
  BAND_RAIL,
  "mt-[112px] mb-[-118px] py-[104px] text-center bg-[oklch(12%_0.012_260)]",
  "to-sm:mb-[-82px]",
].join(" ");

export const REFLECTION_TITLE = [
  "max-w-[940px] mt-[20px] mb-0 mx-0 text-ink",
  "text-[clamp(34px,4.8vw,68px)] font-[520] leading-[1] text-balance",
].join(" ");

/* ---------------------------------------------------------------------------
   Onward navigation
   ----------------------------------------------------------------------------
   A case study used to end on the reflection band with nothing after it: no way
   back to the work section, and no way to the next study. The only route onward
   was the browser's back button or the wordmark in the header — which returns to
   the top of the home page rather than to the place the visitor left.

   Two links, on the same dark ground the reflection closes on so the page ends
   as one band rather than two.
   ------------------------------------------------------------------------ */

export const NEXT_BAND = [
  FULL_BLEED,
  BAND_RAIL,
  "grid gap-[40px] py-[clamp(72px,9vw,116px)] bg-[oklch(9%_0.012_260)]",
  // A hairline, because this sits directly under the reflection band, which is
  // dark too. Without it the one-step drop in ground tone reads as a rendering
  // seam; with it, it reads as the page closing.
  "[border-top:1px_solid_#f5f1e814]",
].join(" ");

export const NEXT_ROW = [
  "flex items-end justify-between gap-[32px]",
  "to-sm:flex-col to-sm:items-start to-sm:gap-[28px]",
].join(" ");

/** "Next case study" / "Back to all work" — the label above each target. */
export const NEXT_LABEL =
  "m-0 text-[12px] font-[760] tracking-[0.16em] text-accent uppercase";

/**
 * The next study's title, as the link itself.
 *
 * `group` on the anchor so the arrow drawn beside it can move on hover without
 * the arrow needing to be hoverable.
 */
export const NEXT_LINK = [
  "group mt-[14px] inline-flex items-baseline gap-[14px] no-underline",
  "font-display text-[clamp(30px,4.4vw,60px)] font-[560] leading-[1]",
  "tracking-[-0.03em] text-ink [transition:color_0.18s_ease]",
  "fine:hover:text-accent",
].join(" ");

export const NEXT_ARROW =
  "inline-block [transition:transform_0.22s_var(--ease-silk)] fine:group-hover:[transform:translateX(8px)]";

export const NEXT_DISCIPLINE =
  "m-0 mt-[14px] text-[14px] leading-[1.4] text-muted";

/** The quieter of the two: a return to the work section, not a destination. */
export const NEXT_BACK = [
  "group inline-flex items-center gap-[10px] shrink-0 no-underline",
  "text-[13px] font-[680] tracking-[0.04em] text-muted",
  "[transition:color_0.18s_ease] fine:hover:text-ink",
].join(" ");
