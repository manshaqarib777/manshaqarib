/**
 * Shared Tailwind class combinations for the home route.
 *
 * Anything used by more than one element lives here rather than being repeated
 * in JSX. Multi-property transitions are written as arbitrary properties because
 * each property needs its own duration and easing, which the
 * `transition-*` utilities cannot express — keeping them here means the JSX
 * stays readable and the values stay in one place.
 */

/** Pill button shared by the hero and the contact footer. */
export const BUTTON = [
  "inline-flex items-center justify-center",
  "min-h-[46px] px-[20px]",
  // `rounded-full` compiles to `calc(infinity * 1px)`; this needs a real 999px.
  "rounded-[999px] [border-width:1px] [border-style:solid]",
  "text-[13px] font-[650] whitespace-nowrap no-underline",
  "[transition:color_0.16s_ease,background-color_0.16s_ease,border-color_0.16s_ease,transform_0.14s_var(--ease-silk)]",
].join(" ");

/**
 * Cream fill with a cursor-tracked highlight and a gradient border. Three
 * stacked backgrounds: the highlight, the fill in `padding-box`, and the border
 * gradient in `border-box`.
 */
export const BUTTON_PRIMARY = [
  "border-transparent text-charcoal",
  "[background:radial-gradient(120px_circle_at_var(--button-x,50%)_var(--button-y,50%),oklch(98%_0.026_86),transparent_68%),linear-gradient(180deg,oklch(95%_0.018_82),oklch(88%_0.038_80))_padding-box,linear-gradient(110deg,oklch(88%_0.1_88),oklch(72%_0.09_250),oklch(88%_0.1_88))_border-box]",
  "[box-shadow:0_0_0_1px_#f5f1e814,0_10px_34px_#dab8761f]",
  "[transition:color_0.16s_ease,box-shadow_0.22s_ease,transform_0.14s_var(--ease-silk)]",
].join(" ");

/** Cream hairline border, for every button except the case link. */
export const BUTTON_LINE = "border-line";

export const BUTTON_SECONDARY = "border-line text-ink";

/**
 * The 12px label above every section heading. The colour is not inherited —
 * three sections tint it differently, and two competing colour utilities would
 * resolve by stylesheet order rather than by class order, so each variant sets
 * its own.
 */
const KICKER_BASE = "text-[12px] font-[760] tracking-[0.16em] uppercase";

/** Amber, on the dark sections. */
export const KICKER = `${KICKER_BASE} text-accent`;

/** Muted brown, on the cream paper sections. */
export const KICKER_PAPER = `${KICKER_BASE} text-paper-kicker`;

/** Cool grey, on the work section's lighter grounds. */
export const KICKER_WORK = `${KICKER_BASE} text-work-kicker`;

/**
 * The horizontal rail every section aligns to: centres an 1180px measure without
 * needing a wrapper element. Named because a section that supplies its own
 * vertical rhythm still has to land on the same left edge as its neighbours —
 * applying `SECTION_PAD` and `SECTION_HEADING` together indents the heading
 * twice, which on a 2000px viewport put it 410px right of the content under it.
 */
export const SECTION_RAIL = "px-[max(24px,50vw_-_590px)] to-sm:px-[20px]";

/** Heading rail for the work and capabilities section headers. */
export const SECTION_HEADING = `${SECTION_RAIL} pt-[132px] pb-[64px]`;

/**
 * A section that carries a parallax backdrop. Every child except the backdrop is
 * lifted above it with a `:not()` child selector.
 *
 * The `depth-section` class name is load-bearing, not decorative: HomeMotion
 * finds each backdrop's ScrollTrigger with `backdrop.closest(".depth-section")`,
 * and without it that lookup returns null and the parallax silently never runs.
 */
export const DEPTH_SECTION = [
  "depth-section relative isolate overflow-hidden",
  "[&>*:not(.depth-backdrop)]:relative [&>*:not(.depth-backdrop)]:z-[1]",
].join(" ");

/**
 * The backdrop box itself. Bled well past the section so the parallax drift
 * never exposes an edge. Its tint, gradients and mask stay in CSS: the two ring
 * pseudo-elements read `currentColor`, and `mask-image` has no utility.
 */
export const DEPTH_BACKDROP =
  "depth-backdrop absolute -inset-[18%] z-0 origin-[50%] [transform:translate(0)_scale(1.08)] pointer-events-none";

/** The rail plus the standard vertical rhythm, for sections with no heading rail. */
export const SECTION_PAD = `${SECTION_RAIL} py-[120px]`;

/**
 * Type scale shared by every editorial h2.
 *
 * Only the scale — each variant below supplies its own box model. Appending
 * `mx-auto` or a wider `max-w-*` to a base constant would not work: two
 * competing utilities of the same kind resolve by stylesheet order, not by
 * position in the class list, so the loser is whichever Tailwind happens to
 * emit first. Spelling each variant out in full keeps that decision explicit.
 */
const H2_SCALE = [
  "font-display",
  "text-[clamp(48px,7vw,104px)] font-[600] leading-[0.94] tracking-[0px]",
  "to-sm:text-[clamp(42px,13vw,64px)]",
].join(" ");

/** Left-aligned, flush: the intro heading. */
export const SECTION_H2 = `${H2_SCALE} max-w-[860px] m-0`;

/**
 * The capabilities heading runs to the full rail rather than the 860px measure.
 *
 * At 104px this title needs ~1890px of line, so an 860px box broke it into three
 * lines with a two-word orphan on the last. The rail gives it two, and
 * `text-balance` keeps those two near-equal instead of long-then-short.
 */
export const CAPABILITIES_H2 = `${H2_SCALE} m-0 max-w-[1180px] text-balance`;

/** Centred variant, for the work heading rail. */
export const SECTION_H2_CENTERED = `${H2_SCALE} mx-auto my-0 max-w-[860px]`;

/** Perspective runs to a wider measure than the other sections. */
export const PERSPECTIVE_H2 = `${H2_SCALE} m-0 max-w-[940px]`;

/**
 * The contact heading is centred and drops in from the kicker above it.
 * `w-[min(1040px,100%)]` is the authored width; `max-w-[860px]` still
 * caps it, and both are kept so the intent survives if the cap ever moves.
 */
export const CONTACT_H2 = [
  H2_SCALE,
  "mx-auto mt-[clamp(30px,3vw,44px)] mb-0",
  "w-[min(1040px,100%)] max-w-[860px]",
].join(" ");

/** Body copy in the three light sections. */
export const LIGHT_BODY =
  "max-w-[760px] mt-[28px] mb-0 mx-0 text-paper-body text-[21px] leading-[1.5]";

/* ---------------------------------------------------------------------------
   Work
   ------------------------------------------------------------------------ */

/**
 * One project row.
 *
 * `overflow: clip` rather than `hidden`: the aura is bled past the edges but must
 * not create a scroll container. `nth-child(odd)` alternates the ground tone —
 * kept as a variant here because the parity depends on position in the section,
 * which no per-element class can express.
 */
export const PROJECT = [
  "project relative grid grid-cols-[1fr] gap-[54px]",
  "px-[max(24px,50vw_-_590px)] pt-[104px] pb-[116px] to-sm:px-[20px]",
  "[border-top:1px_solid_#15140f14] text-center [overflow:clip]",
  "odd:bg-work-alt",
  "[&>*:not(.project-aura)]:relative [&>*:not(.project-aura)]:z-[1]",
].join(" ");

/** The pointer-tracked wash. GSAP drives its x/y and opacity. */
export const PROJECT_AURA = [
  "project-aura pointer-events-none absolute top-1/2 left-1/2 z-0",
  "w-[min(52vw,720px)] aspect-square rounded-[50%] opacity-0",
  "[background:radial-gradient(circle,#dab87629,#b0c4e012_34%,#0000_68%)]",
  "[transform:translate(-50%,-50%)] [will-change:transform,opacity]",
].join(" ");

/** Cover frame. The tilt, scrim and sheen live in CSS on the link. */
export const PROJECT_VISUAL = [
  "project-visual project-visual-link",
  "relative grid w-full place-items-center overflow-hidden",
  "aspect-[16/7] to-sm:aspect-[4/3] to-sm:min-h-auto",
  "[min-height:auto] [max-height:none]",
  "[border:0] rounded-[clamp(22px,3vw,36px)] bg-[oklch(90%_0.006_260)]",
].join(" ");

/**
 * The metric row, sized to the number of figures a project actually has.
 *
 * The content rule is that only real
 * figures ship — so the column count follows the data rather than the data being
 * padded to fill three columns. A project with no hard numbers renders no row.
 */
const METRIC_ROW_COLS: Record<number, string> = {
  1: "grid-cols-[minmax(0,1fr)]",
  2: "grid-cols-[repeat(2,minmax(0,1fr))]",
  3: "grid-cols-[repeat(3,minmax(0,1fr))]",
};

export const metricRowClass = (count: number) =>
  [
    "metric-row mx-auto mt-[-14px] grid w-[min(960px,100%)]",
    "[grid-column:1/-1] gap-px [border:0] bg-none text-center",
    METRIC_ROW_COLS[Math.min(count, 3)] ?? METRIC_ROW_COLS[3],
    "to-sm:grid-cols-[1fr]",
  ].join(" ");

export const METRIC = [
  "metric grid min-h-[176px] place-items-center content-center",
  "[border-right:0] bg-none px-[24px] py-[28px]",
].join(" ");

export const METRIC_VALUE =
  "block text-[clamp(48px,6vw,86px)] font-[480] leading-[0.95] text-[oklch(13%_0.012_260)]";

export const METRIC_LABEL =
  "mt-[14px] block font-[500] text-[oklch(45%_0.022_260)]";

/** A tag pill under the project heading. */
export const TAG = [
  "rounded-[999px] border border-[#15140f1f] px-[12px] py-[8px]",
  "text-[13px] text-[oklch(42%_0.018_260)]",
  "[transition:color_0.18s_ease,background-color_0.18s_ease,border-color_0.18s_ease,transform_0.16s_var(--ease-silk)]",
  "fine:hover:text-ink fine:hover:bg-[oklch(13%_0.012_260)]",
  "fine:hover:border-[oklch(13%_0.012_260)] fine:hover:[transform:translateY(-1px)]",
].join(" ");

/* ---------------------------------------------------------------------------
   Work index — everything the featured rows leave out
   ------------------------------------------------------------------------ */

/** Sits on the work section's alternate ground, closing the band. */
export const WORK_INDEX = [
  "work-index px-[max(24px,50vw_-_590px)] pt-[96px] pb-[120px]",
  "[border-top:1px_solid_#15140f14] bg-work-alt to-sm:px-[20px] to-sm:pt-[64px] to-sm:pb-[80px]",
].join(" ");

export const WORK_INDEX_LIST =
  "mx-auto mt-[48px] grid w-[min(1180px,100%)] grid-cols-[repeat(2,minmax(0,1fr))] gap-x-[clamp(28px,4vw,64px)] to-lg:grid-cols-[1fr]";

/**
 * One row. A project with a written case study is a link to it; one without is
 * a link to the live site; one with neither is a plain row rather than a link
 * that goes nowhere.
 *
 * `group` so the trailing label can respond to a hover anywhere on the row.
 */
export const WORK_INDEX_ROW = [
  "group flex items-baseline justify-between gap-[20px] py-[22px] no-underline",
  "[border-top:1px_solid_#15140f1f] text-work-ink",
  "[transition:padding_0.2s_var(--ease-silk)]",
  "fine:hover:[padding-left:10px]",
].join(" ");

export const WORK_INDEX_TITLE =
  "block font-display text-[clamp(22px,2.2vw,30px)] leading-[1.1] font-[560] tracking-[-0.03em]";

export const WORK_INDEX_DISCIPLINE =
  "mt-[7px] block text-[13px] leading-[1.4] text-[oklch(45%_0.022_260)]";

/**
 * The "Case study" / "Live site" label. Present at rest so the row says where it
 * goes before it is hovered — it only brightens on hover rather than appearing.
 */
export const WORK_INDEX_ACTION = [
  "shrink-0 text-[12px] font-[700] tracking-[0.14em] uppercase whitespace-nowrap",
  "text-[oklch(58%_0.022_260)] [transition:color_0.18s_ease]",
  "fine:group-hover:text-[oklch(20%_0.012_260)]",
].join(" ");

/* ---------------------------------------------------------------------------
   Story
   ------------------------------------------------------------------------ */

/** One tile of the bento. `justify-between` pins the copy to the bottom. */
const STORY_CARD = [
  "story-card flex flex-col justify-between",
  "min-h-[230px] p-[clamp(24px,3vw,36px)] to-sm:min-h-[190px]",
  "[background:linear-gradient(135deg,#f5f1e80d,#f5f1e805),oklch(15%_0.012_260)]",
  "[transition:background-color_0.18s_ease,transform_0.18s_var(--ease-silk)]",
  "fine:hover:bg-[oklch(18%_0.012_260)] fine:hover:[transform:translateY(-2px)]",
].join(" ");

/**
 * Column spans for the five tiles.
 *
 * Written as arbitrary values because Tailwind's `col-span-5` emits
 * `grid-column: span 5 / span 5`, whereas this design leaves the end line
 * `auto` — and with `grid-auto-flow: dense` those place tiles differently.
 */
const STORY_CARD_SPAN: Record<string, string> = {
  wide: "[grid-column:span_5]",
  mid: "[grid-column:span_4]",
  small: "[grid-column:span_3]",
  long: "[grid-column:span_7]",
  tall: "[grid-column:span_5]",
};

/**
 * Every tile collapses to a single column at <=640px.
 *
 * There is deliberately no <=980px tier. The pre-Tailwind stylesheet had one
 * (`span 3`), but that media block sat *earlier* in the file than the base
 * `.story-card` rules, so at equal specificity the base won and the tablet tier
 * never rendered. It has therefore never been part of the shipped design.
 * Reintroducing it is a design decision, not a migration one.
 */
const STORY_CARD_SPAN_RESPONSIVE = "to-sm:[grid-column:auto]";

/**
 * The heading scale, stepped down with the span.
 *
 * All five tiles used to share one clamp topping out at 60px, which a `span 3`
 * column cannot hold: at 1440px "Measure it." broke mid-word into "Measur /
 * e it." The old note in `content/home.ts` asked whoever edited the copy to
 * measure a replacement against the column by hand — a constraint the content
 * module has no way to check. Tying the scale to the span instead makes the
 * copy free: the narrow tiles set smaller type, which is what a narrow column
 * wanted in the first place.
 *
 * Below 640px every tile is full width, so all three variants climb back to one
 * scale — hence the shared `to-sm:` step rather than three different ones.
 */
const STORY_CARD_TITLE_SCALE: Record<string, string> = {
  wide: "text-[clamp(26px,3.6vw,60px)]",
  long: "text-[clamp(26px,3.6vw,60px)]",
  tall: "text-[clamp(26px,3.6vw,60px)]",
  mid: "text-[clamp(24px,2.9vw,46px)]",
  small: "text-[clamp(22px,2.3vw,36px)]",
};

export const storyCardTitleClass = (size: string) =>
  [
    "m-0 max-w-[14ch] font-display leading-[0.94] text-balance",
    STORY_CARD_TITLE_SCALE[size] ?? STORY_CARD_TITLE_SCALE.wide,
    "to-sm:max-w-[16ch] to-sm:text-[clamp(32px,9vw,52px)]",
  ].join(" ");

/** The size keyword is kept in the class list as a readable marker. */
export const storyCardClass = (size: string) =>
  `${size} ${STORY_CARD} ${STORY_CARD_SPAN[size] ?? ""} ${STORY_CARD_SPAN_RESPONSIVE}`;

/* ---------------------------------------------------------------------------
   Capabilities

   Every class name below that also appears in a HomeMotion selector is
   kept in the class list as a hook. The styling moves to Tailwind; the name
   stays, because GSAP finds these elements by class and would silently animate
   nothing if one were dropped.
   ------------------------------------------------------------------------ */

/** Cream paper with dark ink, inverting the page. */
export const CAPABILITIES_SECTION = "capabilities bg-paper text-paper-ink";

/**
 * The four cards, in one row.
 *
 * There is deliberately no <=980px tier. The pre-Tailwind stylesheet had one
 * (`1fr 1fr`), but that media block sat *earlier* in the file than the base
 * rule, so at equal specificity the base won and the tablet tier never
 * rendered — the same dead-media-query quirk documented on STORY_CARD_SPAN, and
 * so never part of the shipped design. The <=640px collapse below is real: that
 * block sits after the base rule.
 *
 * The dark ground shows through the 1px gaps as hairlines, so the cards need no
 * borders of their own.
 */
export const CAPABILITY_LIST = [
  // Carries the rail itself, because the section no longer does — see
  // SECTION_RAIL. `pb` closes the section; the heading's own `pb-[64px]` is the
  // only gap above, so there is no `mt` here to double it.
  `capability-list ${SECTION_RAIL} pb-[120px] grid gap-px bg-[#15140f29]`,
  // Two columns from 980px down, not four. The dead media query documented
  // above meant four ~165px columns survived to 640px, where "Frontend
  // architecture" wrapped onto three lines against a title that has no room to
  // wrap. This is that design decision, made.
  "grid-cols-[repeat(4,minmax(0,1fr))] to-lg:grid-cols-[repeat(2,minmax(0,1fr))]",
  "to-sm:grid-cols-[1fr]",
].join(" ");

export const CAPABILITY = [
  // `flex-col` rather than the block box it was: the title and body need a real
  // gap between them, and a gap is the honest way to say so — the `p` carried no
  // margin (Tailwind's preflight zeroes it), so the body used to sit flush
  // against the descenders of a two-line title.
  "capability flex min-h-[210px] flex-col gap-[14px] p-[28px] bg-paper",
  "[transition:transform_0.18s_var(--ease-silk),background-color_0.18s_ease]",
  "fine:hover:bg-[oklch(93%_0.024_82)]",
  "fine:hover:[transform:translateY(-2px)]",
].join(" ");

/** Weight, leading and tracking come from the `@layer base` h3 rule. */
export const CAPABILITY_TITLE = "m-0 font-display text-[26px] text-balance";

export const CAPABILITY_TEXT = "m-0 text-paper-body leading-[1.5]";

/* ---------------------------------------------------------------------------
   Experience
   ------------------------------------------------------------------------ */

/** Shared ground for the experience and perspective sections. */
const EDITORIAL_GROUND = "bg-[oklch(94%_0.022_82)] text-paper-ink";

export const EXPERIENCE = `experience ${EDITORIAL_GROUND}`;

/**
 * Company / role / detail, as three columns sharing one hairline rule.
 *
 * It used to stay three columns at every width, for the same dead-media-query
 * reason as CAPABILITY_LIST — which on a 390px phone meant three ~110px columns
 * of one-word lines with the detail column clipped off the right edge of the
 * viewport. A career section is the part of a portfolio most likely to be read
 * on a phone, so this now stacks: role and dates beside the company at tablet
 * width, everything in one column below 640px.
 */
export const EXPERIENCE_ROW = [
  "experience-row grid gap-[34px] py-[34px] [border-top:1px_solid_#15140f24]",
  "grid-cols-[0.7fr_0.55fr_1fr]",
  "to-lg:grid-cols-[0.9fr_1fr] to-lg:gap-x-[28px] to-lg:gap-y-[18px]",
  "to-sm:grid-cols-[1fr] to-sm:gap-[12px] to-sm:py-[28px]",
].join(" ");

/**
 * The company cell: name over its date range.
 *
 * At tablet width the detail column moves to the second row and spans both, so
 * the two short cells sit side by side above it rather than squeezing a long
 * paragraph into a third of the width.
 */
export const EXPERIENCE_HEAD = "grid content-start gap-[8px]";

export const EXPERIENCE_COMPANY =
  "m-0 font-display text-[clamp(28px,4vw,52px)] leading-[1]";

/** Small, tracked and quiet: a date is metadata, not a heading. */
export const EXPERIENCE_DURATION =
  "m-0 text-[12px] font-[700] tracking-[0.14em] text-paper-kicker uppercase";

export const EXPERIENCE_ROLE = "m-0 font-[720] to-lg:self-start";

export const EXPERIENCE_DETAIL = [
  "m-0 text-paper-body leading-[1.5]",
  "to-lg:[grid-column:1/-1] to-sm:[grid-column:auto]",
].join(" ");

/* ---------------------------------------------------------------------------
   Perspective
   ------------------------------------------------------------------------ */

export const PERSPECTIVE_SECTION = `perspective ${EDITORIAL_GROUND}`;

/** Left-aligned, unlike every other centred section on the page. */
export const PERSPECTIVE_COPY = [
  "perspective-copy grid justify-items-start",
  "gap-[clamp(20px,2vw,30px)] w-[min(980px,100%)]",
].join(" ");

export const PERSPECTIVE_TEXT = [
  "mx-0 mt-[4px] mb-0 max-w-[760px]",
  "text-paper-body text-[21px] leading-[1.5]",
].join(" ");

/* ---------------------------------------------------------------------------
   Contact
   ------------------------------------------------------------------------ */

/** Back to the dark ground, with the same tile grid as the hero. */
export const CONTACT_SECTION = [
  "contact relative isolate flex flex-col items-center justify-center",
  "gap-[34px] min-h-[100svh] overflow-hidden text-center",
  "bg-[oklch(9%_0.012_260)] text-ink",
].join(" ");

/** Lifted above the perspective grid behind it. */
export const CONTACT_COPY =
  "contact-copy relative z-[2] grid justify-items-center w-full";

/**
 * The contact kicker, now the same 12px amber eyebrow as every other section.
 *
 * It used to render at 21px muted, which was not a decision: in the pre-Tailwind
 * stylesheet `.contact p` (0,2,1) outranked `.section-kicker` (0,2,0), and the
 * migration transcribed the computed result to preserve the cascade accident
 * visibly. Preserved visibly it read as a mistake — one section whose eyebrow is
 * five times the size of the rest, sitting directly above the largest heading on
 * the page. The accident is now resolved in favour of the design.
 */
export const CONTACT_KICKER = `section-kicker ${KICKER}`;

/** What I'm open to, between the heading and the address. */
export const CONTACT_NOTE =
  "mx-auto mt-[clamp(18px,2vw,26px)] mb-[clamp(22px,2.4vw,32px)] max-w-[520px] text-[17px] leading-[1.5] text-muted";

export const CONTACT_ACTIONS = [
  "contact-actions relative z-[2] flex flex-wrap",
  "justify-center self-center gap-[12px] w-full",
].join(" ");

/** `basis-full` drops the row below the two buttons. */
export const SOCIAL_ROW =
  "social-links flex basis-full justify-center gap-[10px] mt-[8px]";

/**
 * The circular icon.
 *
 * Only the `::after` tooltip stays in CSS — it draws its text from
 * `attr(data-tooltip)`, which no utility can express. The hover here is a plain
 * `hover:`, not `fine:hover:` — this one is deliberately left unguarded by
 * the pointer query.
 */
export const SOCIAL_ICON = [
  "social-icon relative inline-grid place-items-center size-[44px]",
  "rounded-[50%] border border-line text-ink font-[780]",
  "tracking-[0] no-underline",
  "[transition:transform_0.16s_var(--ease-silk),border-color_0.16s_ease,background-color_0.16s_ease]",
  "hover:border-[#dab8769e] hover:bg-[#dab87614]",
  "hover:[transform:translateY(-2px)]",
].join(" ");
