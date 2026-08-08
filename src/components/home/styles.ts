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

/** Heading rail for the work and capabilities section headers. */
export const SECTION_HEADING =
  "px-[max(24px,50vw_-_590px)] pt-[132px] pb-[64px] to-sm:px-[20px]";

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

/**
 * Section rail. The horizontal value centres an 1180px measure without needing
 * a wrapper element.
 */
export const SECTION_PAD =
  "px-[max(24px,50vw_-_590px)] py-[120px] to-sm:px-[20px]";

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

/** Left-aligned, flush: the intro and capabilities headings. */
export const SECTION_H2 = `${H2_SCALE} max-w-[860px] m-0`;

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

/** The size keyword is kept in the class list as a readable marker. */
export const storyCardClass = (size: string) =>
  `${size} ${STORY_CARD} ${STORY_CARD_SPAN[size] ?? ""} ${STORY_CARD_SPAN_RESPONSIVE}`;

/* ---------------------------------------------------------------------------
   Design MCP panel
   ------------------------------------------------------------------------ */

/**
 * Focus ring and press feedback shared by every control in the panel.
 *
 * `font-family: inherit` rather than the `font` shorthand: buttons take a family
 * from the UA and need overriding, but the shorthand also resets weight and
 * line-height. Tailwind resolves conflicting utilities by stylesheet order, not
 * class-list order, so a shorthand here silently beat the `font-[660]` and
 * `leading-none` set alongside it.
 */
const MCP_CONTROL = [
  "[font-family:inherit] [-webkit-tap-highlight-color:transparent]",
  "active:[transform:scale(0.97)]",
  "focus-visible:[outline:2px_solid_oklch(85%_0.07_78)] focus-visible:[outline-offset:3px]",
].join(" ");

/**
 * Everything both tab kinds share. Deliberately carries no size and no
 * `data-active` treatment: the two kinds differ on exactly those properties, and
 * two utilities for one property cannot reliably override each other.
 */
export const MCP_TAB = [
  MCP_CONTROL,
  "inline-flex w-auto cursor-pointer items-center justify-center gap-[9px]",
  "rounded-[999px] [border:0]",
  "bg-none text-center text-[16px] font-[660] leading-none whitespace-nowrap",
  "[transition:color_0.16s_var(--ease-silk),background-color_0.16s_var(--ease-silk),box-shadow_0.18s_var(--ease-silk),transform_0.14s_var(--ease-silk)]",
  // The `hover:` is load-bearing — without it the hover treatment sticks to every
  // inactive tab at rest.
  "fine:not-data-[active=true]:hover:text-ink",
  "fine:not-data-[active=true]:hover:bg-[oklch(100%_0_0/0.055)]",
  "to-sm:text-[14px]",
].join(" ");

/** Agent tabs: cream pill when selected. */
export const MCP_AGENT_TAB = [
  "min-h-[46px] px-[15px] to-sm:min-h-[42px] to-sm:px-[13px]",
  "text-[oklch(87%_0.018_82)]",
  "data-[active=true]:text-[oklch(18%_0.01_260)]",
  "data-[active=true]:bg-[oklch(95%_0.01_82)]",
  "data-[active=true]:[box-shadow:inset_0_1px_oklch(100%_0_0/0.55),0_8px_24px_oklch(3%_0.01_260/0.2)]",
].join(" ");

/** Mode tabs: taller, dimmer at rest, and a translucent lift when selected. */
export const MCP_MODE_TAB = [
  "min-h-[48px] px-[16px] to-sm:min-h-[40px] to-sm:px-[13px]",
  "text-[oklch(72%_0.018_82)]",
  "data-[active=true]:text-ink",
  "data-[active=true]:[background:linear-gradient(oklch(100%_0_0/0.13),oklch(100%_0_0/0.055))]",
  "data-[active=true]:[box-shadow:inset_0_1px_oklch(100%_0_0/0.08),0_8px_20px_oklch(3%_0.01_260/0.22)]",
].join(" ");

/** Both tablists. They scroll horizontally once the toolbar stacks. */
export const MCP_TABS =
  "flex items-center gap-[6px] to-md:justify-start to-md:overflow-x-auto to-md:p-[3px_2px] to-md:[scrollbar-width:none]";

/**
 * Step action. `mt-auto` pins each one to the bottom of its column so the three
 * line up even though the copy above them differs in length.
 */
export const MCP_ACTION = [
  MCP_CONTROL,
  "mt-auto inline-flex w-auto max-w-full cursor-pointer items-center justify-center gap-[10px]",
  "min-h-[48px] rounded-[13px] border border-[oklch(95%_0.018_82/0.1)] px-[16px]",
  "bg-[oklch(100%_0_0/0.085)] text-ink",
  "text-center text-[15px] font-[680] leading-[1.15] no-underline",
  "[box-shadow:inset_0_1px_oklch(100%_0_0/0.07),0_6px_oklch(3%_0.01_260/0.24)]",
  "[transition:color_0.16s_ease,background-color_0.16s_ease,border-color_0.16s_ease,transform_0.14s_var(--ease-silk),box-shadow_0.16s_var(--ease-silk)]",
  "to-sm:mt-[28px]",
].join(" ");

export const MCP_ACTION_SECONDARY = [
  "fine:hover:bg-[oklch(100%_0_0/0.13)]",
  "fine:hover:border-[oklch(95%_0.018_82/0.18)]",
].join(" ");

export const MCP_ACTION_PRIMARY = [
  "border-[oklch(72%_0.14_40)] bg-mcp-warm text-[oklch(98%_0.006_82)]",
  "[box-shadow:inset_0_-3px_oklch(35%_0.12_40/0.28),0_7px_oklch(3%_0.01_260/0.28),0_16px_28px_oklch(3%_0.01_260/0.18)]",
  "fine:hover:bg-[oklch(72%_0.14_40)] fine:hover:border-[oklch(77%_0.13_40)]",
].join(" ");

/** The copyable value field. `:has()` on the wrapper stays in CSS. */
export const MCP_ACTION_COPY = [
  "mt-auto grid w-full grid-cols-[minmax(0,1fr)_44px] items-center gap-[8px]",
  "min-h-[50px] overflow-hidden rounded-[13px]",
  "border border-[oklch(87%_0.17_121/0.16)] bg-[oklch(52%_0.1_121/0.15)]",
  "p-[2px_3px_2px_16px] text-left text-mcp-link",
  "[box-shadow:inset_0_1px_oklch(87%_0.17_121/0.04)]",
  "to-sm:mt-[28px]",
].join(" ");

export const MCP_COPY_BUTTON = [
  MCP_CONTROL,
  "inline-flex size-[44px] cursor-pointer items-center justify-center",
  "rounded-[10px] [border:0] bg-[oklch(87%_0.17_121/0.08)] text-mcp-link",
  "[transition:color_0.16s_ease,background-color_0.16s_ease,transform_0.14s_var(--ease-silk)]",
  "fine:hover:bg-[oklch(87%_0.17_121/0.15)]",
].join(" ");

/** Links and buttons inside the panel footer. */
export const MCP_SHORTCUT_LINK = [
  "inline-flex w-auto max-w-full cursor-pointer items-center justify-center gap-[8px]",
  // `[font-family:inherit]`, never the `font` shorthand — it would reset the
  // weight set alongside it.
  "[border:0] bg-none px-0 py-[4px] font-[680] text-ink no-underline [font-family:inherit]",
  "[transition:color_0.16s_ease,transform_0.14s_var(--ease-silk)]",
  "fine:hover:text-[oklch(79%_0.018_82)]",
  "active:[transform:scale(0.97)]",
  "focus-visible:[outline:2px_solid_oklch(85%_0.07_78)] focus-visible:[outline-offset:3px]",
].join(" ");

/**
 * The chevron shifts right on hover of its parent action or link.
 *
 * `!` on the size is required: the Material Symbols stylesheet comes from Google
 * Fonts and is unlayered, so its `font-size: 24px` outranks any Tailwind utility.
 */
export const MCP_CHEVRON =
  "design-mcp-chevron text-[22px]! [transition:transform_0.18s_var(--ease-silk)]";

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
  "capability-list mt-[56px] grid gap-px bg-[#15140f29]",
  "grid-cols-[repeat(4,minmax(0,1fr))] to-sm:grid-cols-[1fr]",
].join(" ");

export const CAPABILITY = [
  "capability min-h-[210px] p-[28px] bg-paper",
  "[transition:transform_0.18s_var(--ease-silk),background-color_0.18s_ease]",
  "fine:hover:bg-[oklch(93%_0.024_82)]",
  "fine:hover:[transform:translateY(-2px)]",
].join(" ");

/** Weight, leading and tracking come from the `@layer base` h3 rule. */
export const CAPABILITY_TITLE = "m-0 font-display text-[28px]";

export const CAPABILITY_TEXT = "text-paper-body leading-[1.5]";

/* ---------------------------------------------------------------------------
   Experience
   ------------------------------------------------------------------------ */

/** Shared ground for the experience and perspective sections. */
const EDITORIAL_GROUND = "bg-[oklch(94%_0.022_82)] text-paper-ink";

export const EXPERIENCE = `experience ${EDITORIAL_GROUND}`;

/**
 * Company / role / detail, as three columns sharing one hairline rule.
 *
 * Stays three columns at every width, for the same dead-media-query reason as
 * CAPABILITY_LIST: the `1fr` tablet rule never took effect.
 */
export const EXPERIENCE_ROW = [
  "experience-row grid grid-cols-[0.7fr_0.55fr_1fr] gap-[34px] py-[34px]",
  "[border-top:1px_solid_#15140f24]",
].join(" ");

export const EXPERIENCE_COMPANY =
  "m-0 font-display text-[clamp(30px,4vw,52px)] leading-[1]";

export const EXPERIENCE_ROLE = "m-0 font-[720]";

export const EXPERIENCE_DETAIL = "text-paper-body leading-[1.5]";

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
 * The contact kicker is *not* the 12px amber KICKER.
 *
 * In the pre-Tailwind stylesheet `.contact p` (0,2,1) outranked
 * `.section-kicker` (0,2,0), so
 * this one resolves to 21px muted with a 28px top margin while still keeping
 * the kicker's weight, tracking and casing. Transcribed as computed rather than
 * as authored, so the cascade accident is preserved deliberately and visibly.
 */
export const CONTACT_KICKER = [
  "section-kicker mt-[28px] max-w-[760px]",
  "text-[21px] font-[760] leading-[1.5] tracking-[0.16em] uppercase",
  "text-muted",
].join(" ");

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
