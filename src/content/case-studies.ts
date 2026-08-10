/**
 * Case-study narrative for the /work routes.
 *
 * A case page carries more story than a project card does: a
 * framing tension, a screen-by-screen walk, the decisions behind it. That
 * content lives here; the facts it sits on — title, discipline, cover,
 * walkthrough, metrics — stay in `./projects.ts` and are read by slug, so a figure
 * is never written down twice.
 *
 * Everything below is drawn from the CV and the shipped sites. Nothing is
 * invented to fill a section out. That is the same rule `metrics` already
 * follows — fewer, real ones rather than padded.
 *
 * `failureStates` and `reflection` are still optional and a study without them
 * simply renders no such section. Where they are written, every one restates an
 * architectural fact already recorded here or in `./projects.ts` — the cached read
 * path, the normalised store, the boundary validation — under the question the
 * section actually asks: what does this interface do when that fact is put under
 * pressure. None of them describes a defect that was not designed for.
 */

import { SCREENSHOTS } from "./assets";

export interface CaseScreen {
  /** The beat this screen belongs to, e.g. "Before" or "The move". */
  label: string;
  heading: string;
  body: string;
  image: string;
  /** Alt text. The screens carry meaning, so this is never decorative. */
  alt: string;
  /**
   * Which capture this is, so the plate can be framed at the shot's own shape.
   *
   * The three captures have wildly different aspects — 1440 × 900, 1440 × 2600
   * and a phone shot that is either 414 × 896 or, on the eight projects captured
   * full-page, up to 390 × 9855. Bounding all of them by height alone rendered
   * the tall ones as slivers 29–70px wide. `case-study.css` keys off this.
   */
  shot: "hero" | "mobile" | "full";
  caption: { title: string; detail: string };
}

/**
 * What a study actually writes for a beat.
 *
 * `image`, `alt` and `shot` are supplied by `screens()` from the directory name,
 * so a study never spells a capture path out. They used to be written as empty
 * strings in all forty-two beats and immediately overwritten — placeholders that
 * looked like missing data.
 */
type CaseScreenCopy = Omit<CaseScreen, "image" | "alt" | "shot">;

export interface CaseStudyContent {
  /** The three ruled facts under the hero. */
  summary: readonly { term: string; detail: string }[];
  /**
   * A third line under a figure, keyed by its label in `./projects.ts`.
   *
   * One per metric — the shared `.metric p` rule
   * hides it everywhere else and `.case-metrics .metric p` switches it back on
   * here. These say what the figure means; they do not add new claims to it.
   */
  metricNotes?: Record<string, string>;
  /** The framing tension, in oversized type. */
  hook: { kicker: string; statement: string };
  /** Two columns: what was happening, and what changed the brief. */
  pair: readonly { label: string; body: string }[];
  /** The dark band: what success meant, and what constrained it. */
  proof: readonly { label: string; body: string }[];
  /** Heading for the screen-by-screen section. */
  productHeading?: { kicker: string; statement: string };
  screens?: readonly CaseScreen[];
  /** The walkthrough, framed in a phone shell. Falls back to the project video. */
  video?: { kicker: string; heading: string; body: string };
  decisions?: readonly { heading: string; body: string }[];
  /**
   * Three per study: what the interface does when the architecture above is put
   * under pressure. Optional — a study without them renders no `.failure-states`
   * section rather than an empty grid. See the note at the top of this file for
   * the rule these are held to.
   */
  failureStates?: readonly { heading: string; body: string }[];
  /** The dark closing band. Optional on the same terms as `failureStates`. */
  reflection?: { kicker: string; statement: string };
}

/**
 * The three captured states every project has.
 *
 * `copy` stays in the order each study writes it — landing, the middle beat,
 * then the mobile beat — but the rendered order is landing, mobile, middle. The
 * first beat is the lead and gets a full-width plate; the two after it are
 * support beats in a narrow column, and a narrow column is the wrong home for a
 * 1440 × 2600 full-page shot, which the layout squeezed to about 410px wide and
 * called a design. The phone shot belongs in the first narrow slot.
 *
 * The swap happens here rather than in the fourteen studies so that each beat's
 * words stay attached to the picture they were written about — moving the copy
 * instead would have left mobile prose under a desktop screenshot.
 */
const screens = (
  dir: string,
  name: string,
  copy: readonly [CaseScreenCopy, CaseScreenCopy, CaseScreenCopy],
): readonly CaseScreen[] => [
  {
    ...copy[0],
    image: `${SCREENSHOTS}/${dir}/1-desktop-hero.png`,
    alt: `${name} — landing view`,
    shot: "hero",
  },
  {
    ...copy[2],
    image: `${SCREENSHOTS}/${dir}/3-mobile.png`,
    alt: `${name} — mobile view`,
    shot: "mobile",
  },
  {
    ...copy[1],
    image: `${SCREENSHOTS}/${dir}/2-desktop-full.png`,
    alt: `${name} — full page`,
    shot: "full",
  },
];

const CASE_STUDIES: Record<string, CaseStudyContent> = {
  lappeland: {
    summary: [
      {
        term: "Product",
        detail: "Lappeland — custom-label storefront for the Norwegian market",
      },
      { term: "Role", detail: "Senior frontend engineer, contract" },
      {
        term: "Scope",
        detail:
          "Next.js App Router build, SSR and ISR rendering architecture, Core Web Vitals tuning",
      },
    ],
    metricNotes: {
      "traffic post-launch": "Measured after the rendering rebuild shipped.",
      "Lighthouse performance": "Held on mobile, not on a desktop test rig.",
    },
    hook: {
      kicker: "The tension",
      statement:
        "Doubling traffic was a rendering problem before it was an interface problem.",
    },
    pair: [
      {
        label: "What was happening",
        body: "A custom-label storefront for the Norwegian market — name labels, mini labels, wall decor — built on Next.js App Router and TypeScript, with a configurator and a catalogue that changes constantly.",
      },
      {
        label: "What changed the brief",
        body: "Discoverability depended on what the server sent, not on what the client could assemble afterwards — so the rendering strategy became the lever, and the interface followed it.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "More organic traffic reaching product pages, and Core Web Vitals inside budget on mobile rather than on a desktop test rig.",
      },
      {
        label: "The constraint",
        body: "A live catalogue could not wait on a full rebuild to publish a change, which ruled out static generation on its own.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "The storefront, one rendering decision at a time.",
    },
    screens: screens("01-lappeland", "Lappeland", [
      {
        label: "Server-rendered",
        heading: "The first paint is the whole pitch.",
        body: "The landing view ships from the server, so the product grid is content on arrival rather than a skeleton waiting on JavaScript.",
        caption: {
          title: "Product cards arrive as HTML.",
          detail:
            "Server Components render the grid, so it is indexable and visible before any client bundle has run.",
        },
      },
      {
        label: "Incrementally static",
        heading: "Fresh pages without a rebuild.",
        body: "ISR lets catalogue pages regenerate on their own schedule, so an edit publishes without redeploying the site.",
        caption: {
          title: "The long page stays cheap.",
          detail:
            "Cached at the edge and revalidated in the background, so depth costs nothing at request time.",
        },
      },
      {
        label: "Mobile-first",
        heading: "Built at the narrow width first.",
        body: "Tailwind layouts start mobile and widen, verified across browsers and viewports against the Figma designs.",
        caption: {
          title: "The same markup, reflowed.",
          detail:
            "Semantic structure and responsive utilities rather than a separate mobile template.",
        },
      },
    ]),
    video: {
      kicker: "Walkthrough",
      heading: "The storefront in motion",
      body: "Recorded from the live site.",
    },
    decisions: [
      {
        heading: "Render on the server",
        body: "SSR and ISR through the App Router, so pages are content when they arrive and stay fresh without a rebuild — the change that doubled traffic after launch.",
      },
      {
        heading: "Split what the browser has to parse",
        body: "Code splitting and Core Web Vitals tuning, so the interactive weight of a page tracked what the page actually needed.",
      },
      {
        heading: "Treat accessibility as scope, not polish",
        body: "WCAG 2.1 AA deliberately rather than incidentally: ARIA roles, keyboard navigation, focus management, contrast audits and screen-reader testing.",
      },
    ],
    failureStates: [
      {
        heading: "Stock moves between regenerations",
        body: "Anything reflecting live availability is server-rendered on request, so the incrementally regenerated page is never the one asked to be honest about stock.",
      },
      {
        heading: "The client bundle never arrives",
        body: "The catalogue was rendered on the server, so it stays readable and indexable when the JavaScript that would have assembled it does not run.",
      },
      {
        heading: "There is no pointer",
        body: "Keyboard navigation, focus management and screen-reader testing were scoped work rather than a pass at the end, so the storefront is operable without a mouse.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement:
        "The revalidation window was tuned to the catalogue at launch. Whether it still matches how it changes now is worth measuring.",
    },
  },

  halcyon: {
    summary: [
      {
        term: "Product",
        detail:
          "Halcyon — US tax management platform, 700+ financial institutions",
      },
      { term: "Role", detail: "Frontend engineer, VisionX Technologies" },
      {
        term: "Scope",
        detail:
          "Enterprise React frontend, reusable form and data-table system, IRS Tax API integration",
      },
    ],
    metricNotes: {
      "financial institutions": "The install base the filing interface serves.",
      "in tax filings": "Value moving through the flows this frontend fronts.",
      "years on the platform": "A three-year tenure on one product.",
    },
    hook: {
      kicker: "The tension",
      statement:
        "A form that accepts the wrong thing is not a UI defect. It is a filing that has to be unwound.",
    },
    pair: [
      {
        label: "What was happening",
        body: "Every filing module had grown its own forms and its own data tables, so the same validation rule existed in several places and drifted in each of them.",
      },
      {
        label: "What changed the brief",
        body: "For institutions moving millions of dollars in filings, duplicated validation is a compliance risk rather than a maintenance cost — which made consolidation the product decision, not a refactor.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "One home for a filing's data, validation defined once, and new screens assembled from existing primitives instead of fresh markup.",
      },
      {
        label: "The constraint",
        body: "Tax workflows are long, conditional and unforgiving, and the frontend had to be honest about latency in IRS data flows it did not control.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "Dense, validation-heavy work, made legible.",
    },
    screens: screens("05-halcyon", "Halcyon", [
      {
        label: "The workspace",
        heading: "Filing work, front and centre.",
        body: "The enterprise React interface through which 700+ institutions process tax filings, built on Ant Design primitives with the composition owned in-house.",
        caption: {
          title: "Ant Design as foundation, not as the design.",
          detail:
            "The primitives came from the library; the validation contracts and composition did not.",
        },
      },
      {
        label: "The long form",
        heading: "Validation surfaced where the mistake is.",
        body: "Server-side validation appears inline against the offending field rather than in a summary banner at the top of a long field set.",
        caption: {
          title: "Reusable form and data-table components.",
          detail:
            "Sized for long field sets and conditional sections, which is what removed the duplicated UI code across filing modules.",
        },
      },
      {
        label: "Narrow viewports",
        heading: "The same contracts at every width.",
        body: "Dense tabular work reflowed for narrow screens without forking the validation behaviour behind it.",
        caption: {
          title: "One store, many surfaces.",
          detail:
            "A normalised Redux Toolkit store meant every module read a filing from the same place instead of keeping a local copy.",
        },
      },
    ]),
    video: {
      kicker: "Walkthrough",
      heading: "The platform in motion",
      body: "Recorded from the live site.",
    },
    decisions: [
      {
        heading: "Give a filing one home",
        body: "Application state through Redux Toolkit with a normalised store, so a filing's data existed once and every module read from it rather than caching its own copy.",
      },
      {
        heading: "Build the primitives the domain needs",
        body: "Reusable form and data-table components for long, conditional, validation-heavy field sets — which is what took duplicated UI code out of the filing modules.",
      },
      {
        heading: "Be honest about borrowed latency",
        body: "The frontend integrated Node.js, MySQL and Prisma services including IRS Tax API data flows, where the interface has to communicate waits it cannot shorten.",
      },
    ],
    failureStates: [
      {
        heading: "The IRS data flow stalls",
        body: "The interface reports a wait it did not cause and cannot shorten, rather than rendering an empty table as though it were an answer.",
      },
      {
        heading: "A value is rejected deep in a long form",
        body: "Server-side validation appears against the offending field, so a long conditional field set does not have to be re-read to find what went wrong.",
      },
      {
        heading: "One filing, two modules open",
        body: "Both read the same normalised record, so neither can go on acting against a local copy the other has already moved past.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement:
        "The form primitives held for the filing types that existed. The real test is the first one nobody modelled.",
    },
  },

  ayshei: {
    summary: [
      {
        term: "Product",
        detail:
          "Ayshei — UAE classifieds and auctions marketplace, 100,000+ users",
      },
      { term: "Role", detail: "Frontend engineer, VisionX Technologies" },
      {
        term: "Scope",
        detail:
          "React frontend across four verticals, listing and search performance, GraphQL integration",
      },
    ],
    metricNotes: {
      "users served": "All four verticals on one frontend.",
      "marketplace verticals": "Electronics, real estate, motors and art.",
    },
    hook: {
      kicker: "The tension",
      statement:
        "Four marketplaces wearing one interface, all of them read-heavy at once.",
    },
    pair: [
      {
        label: "What was happening",
        body: "One React frontend served 100,000+ users across four separate verticals — electronics, real estate, motors and art — each with its own idea of what a listing is.",
      },
      {
        label: "What changed the brief",
        body: "The load was overwhelmingly read: browsing and searching, not posting. That moved the work from feature breadth to listing and search performance.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "Listing and search staying responsive under read-heavy traffic, with one component vocabulary rather than four divergent ones.",
      },
      {
        label: "The constraint",
        body: "Four verticals could not each fork the interface, and the same popular queries were hitting the database repeatedly.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "One interface, four verticals.",
    },
    screens: screens("06-ayshei", "Ayshei", [
      {
        label: "The marketplace",
        heading: "Browsing is the main event.",
        body: "The landing view is built around discovery across all four verticals rather than around any one of them.",
        caption: {
          title: "Shared listing vocabulary.",
          detail:
            "Electronics, real estate, motors and art render through the same components rather than four forks.",
        },
      },
      {
        label: "Search and listings",
        heading: "Read-heavy by design.",
        body: "Listing and search were optimised for repeated reads, with Redis caching at the API layer cutting duplicated database load.",
        caption: {
          title: "Cache the popular path.",
          detail:
            "Repeat queries answered from Redis instead of returning to the database each time.",
        },
      },
      {
        label: "Mobile",
        heading: "Most of a marketplace is browsed one-handed.",
        body: "The same listing components reflow to narrow widths, keeping search and filters reachable.",
        caption: {
          title: "GraphQL-backed, per-view.",
          detail:
            "Each surface asked for the fields it rendered rather than over-fetching a shared payload.",
        },
      },
    ]),
    video: {
      kicker: "Walkthrough",
      heading: "The marketplace in motion",
      body: "Recorded from the live site.",
    },
    decisions: [
      {
        heading: "One vocabulary across four verticals",
        body: "A shared listing and search component set, so a new vertical was a configuration rather than a fork of the interface.",
      },
      {
        heading: "Cache the read path",
        body: "Redis caching on the API layer to cut repeated database load, targeting the popular queries that dominated a read-heavy marketplace.",
      },
      {
        heading: "Ask for exactly what renders",
        body: "GraphQL integration per view, so each surface fetched the fields it displayed instead of a shared over-fetched payload.",
      },
    ],
    failureStates: [
      {
        heading: "The same query arrives a thousand times",
        body: "Redis answers it at the API layer, so a popular search costs one database round trip rather than one for every visitor who runs it.",
      },
      {
        heading: "A vertical does not behave like the others",
        body: "Electronics, real estate, motors and art render through the same components, so the vertical that does not fit is a configuration rather than a fourth codebase.",
      },
      {
        heading: "It is being browsed one-handed",
        body: "Search and filters stay reachable as the listing components reflow, because most of a marketplace is browsed on a phone rather than at a desk.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement:
        "One component vocabulary served four verticals. The test is the fifth: whether it arrives as configuration, or as the first fork.",
    },
  },

  snapdebt: {
    summary: [
      {
        term: "Product",
        detail:
          "SnapDebt — debt recovery platform, 10,000+ businesses across Florida",
      },
      { term: "Role", detail: "Frontend developer and team lead, Dixeam" },
      {
        term: "Scope",
        detail:
          "React and Redux Toolkit frontend, automated collection workflows, compliance reporting",
      },
    ],
    metricNotes: {
      "businesses served": "Across Florida, on one platform.",
      "faster page loads": "From backend and query optimisation.",
    },
    hook: {
      kicker: "The tension",
      statement:
        "Debt recovery is a regulated workflow. The interface has to be auditable, not just usable.",
    },
    pair: [
      {
        label: "What was happening",
        body: "A debt recovery platform serving 10,000+ businesses across Florida, covering automated collection workflows and the compliance reporting that has to account for them.",
      },
      {
        label: "What changed the brief",
        body: "Every automated action needed a record a human could later defend, which made state modelling and reporting the centre of the frontend work rather than an export feature bolted on at the end.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "Collection workflows running automatically with reporting that reconciles, and pages fast enough to work in all day.",
      },
      {
        label: "The constraint",
        body: "A small team, and page load times that had to come down without a rewrite.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "Workflow, record, report.",
    },
    screens: screens("09-snapdebt", "SnapDebt", [
      {
        label: "The workspace",
        heading: "Where the recovery work happens.",
        body: "A React and Redux Toolkit interface built for daily operational use across thousands of business accounts.",
        caption: {
          title: "Built to be lived in.",
          detail:
            "Operational density over marketing polish — this is a screen people work in for hours.",
        },
      },
      {
        label: "Workflows",
        heading: "Automation that leaves a trail.",
        body: "Automated collection workflows are modelled in state so their history stays reportable rather than inferred after the fact.",
        caption: {
          title: "Compliance reporting reads from the same state.",
          detail:
            "Reports are a view of the workflow, not a separate reconciliation job.",
        },
      },
      {
        label: "Mobile",
        heading: "Reachable away from the desk.",
        body: "The account and workflow views reflow for narrow screens without losing the audit detail.",
        caption: {
          title: "Node.js and Prisma behind it.",
          detail:
            "The same services back both the workspace and the reporting surface.",
        },
      },
    ]),
    video: {
      kicker: "Walkthrough",
      heading: "The platform in motion",
      body: "Recorded from the live site.",
    },
    decisions: [
      {
        heading: "Model the workflow, not the screen",
        body: "Redux Toolkit state shaped around collection workflows, so compliance reporting could read the same history the interface showed.",
      },
      {
        heading: "Take the load times down",
        body: "Backend and query optimisation cut page load times by 30%, working the data layer rather than trimming the interface.",
      },
      {
        heading: "Lead a small team through it",
        body: "Delivered as team lead on a small team, which meant the reusable pieces had to be obvious enough for everyone to reach for them.",
      },
    ],
    failureStates: [
      {
        heading: "An automated action has to be defended",
        body: "Collection workflows are modelled as explicit states, so the history a compliance report needs is the history the interface was already showing.",
      },
      {
        heading: "The report and the screen disagree",
        body: "Reporting reads the same workflow state the workspace renders, which makes it a view of the work rather than a reconciliation of it.",
      },
      {
        heading: "It is worked in for eight hours",
        body: "Backend and query optimisation took page load times down 30%, because operational density is only usable if it is also fast to move through.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement:
        "Reporting reads the same state the workspace renders. The test is a collection workflow the state machine has no name for yet.",
    },
  },

  neonbit: {
    summary: [
      { term: "Product", detail: "Neonbit — in-stream advertising marketplace for brands and gaming streamers" },
      { term: "Role", detail: "Frontend engineer, contract" },
      { term: "Scope", detail: "React and TypeScript front end on a custom Laravel API, campaign planner, real-time reporting" },
    ],
    metricNotes: {
      "verified streamers": "Each carrying categories, languages and a brand-safety score.",
      "briefing to go-live": "The turnaround the platform commits to publicly.",
      "first response": "Same-day, and stated on the landing page as a promise.",
    },
    hook: {
      kicker: "The tension",
      statement: "Nobody spends five thousand euros on a guess.",
    },
    pair: [
      {
        label: "What was happening",
        body: "Brands wanting to reach Gen Z inside live gaming streams were negotiating individually with creators, with no way to price a campaign in advance and no measurement afterwards.",
        },
      {
        label: "What changed the brief",
        body: "The blocker was not discovery, it was commitment. A brand will not book what it cannot forecast, so the planner had to answer what a budget buys before anything was agreed.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "A brand moving from a budget figure to a projected reach without talking to anyone, and a streamer joining a network that does not compromise their content.",
      },
      {
        label: "The constraint",
        body: "Live streams are unpredictable and brand safety is the whole proposition. A placement that damages an advertiser costs more than the campaign was worth.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "Price the campaign before anyone commits to it.",
    },
    screens: screens("02-neonbit", "Neonbit", [
      {
        label: "Two audiences",
        heading: "The bridge has two ends.",
        body: "The landing view splits at the first interaction — I am a Brand, I am a Streamer — because the two sides arrive wanting opposite things from the same network.",
        caption: { title: "One toggle, two products.", detail: "Everything below the fold re-frames to the side that was chosen." },
      },
      {
        label: "The planner",
        heading: "A budget becomes a forecast.",
        body: "Choose a spend and a CPM and the planner projects impressions and clicks live, with the rate stepping down as budget rises. The calculation is shown rather than summarised, because the number is the thing being trusted.",
        caption: { title: "5000€ at 20€ CPM: 250,000 impressions.", detail: "Targeting by game, platform, language, region and interest narrows the same projection." },
      },
      {
        label: "Narrow first",
        heading: "Planned on a laptop, checked on a phone.",
        body: "The planner, the creator network and the campaign KPIs all reflow to one column while keeping the budget input and its projection on screen together.",
        caption: { title: "Input and result stay paired.", detail: "Separating them at narrow widths would break the one interaction the page exists for." },
      },
    ]),
    video: { kicker: "Walkthrough", heading: "The platform in motion", body: "Recorded from the live site." },
    decisions: [
      {
        heading: "Make the forecast the landing page",
        body: "The budget planner is not behind a signup. A brand can price a campaign on first visit, because the thing blocking the sale was never discovery — it was being asked to commit to an unknown number.",
      },
      {
        heading: "Model brand safety as data, not as a promise",
        body: "Every streamer carries categories, languages and a brand-safety score on the record itself, so targeting and exclusion are queries against structured fields rather than a manual review step.",
      },
      {
        heading: "Scope every view to its side of the market",
        body: "Brands, streamers and staff read the same campaign from different roles, so access is resolved once against the Laravel API and every route reads that resolution — a brand can never reach a streamer's earnings, and neither reaches the other's pipeline.",
      },
    ],
    failureStates: [
      {
        heading: "A campaign has no inventory at the chosen targeting",
        body: "The planner projects from the network that actually matches the filters, so an over-narrow campaign shows a reduced forecast rather than a confident number it cannot deliver.",
      },
      {
        heading: "A stream goes off-brief mid-campaign",
        body: "Placement routing reads the brand-safety score continuously rather than at booking, so a stream that stops matching is dropped from rotation instead of running to the end of its schedule.",
      },
      {
        heading: "Delivery falls short of the projection",
        body: "Billing is performance-based on delivered impressions rather than on the booked figure, so a shortfall is a smaller invoice rather than a dispute.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement: "The planner projects from a flat CPM with volume steps. Whether brands would trust a range more than a single number is the thing I would put in front of them.",
    },
  },

  "global-shopaholic": {
    summary: [
      { term: "Product", detail: "Global Shopaholics — US package forwarding and assisted purchase" },
      { term: "Role", detail: "Full-stack developer, Global Shopaholics LLC" },
      { term: "Scope", detail: "Bootstrap Vue 3 storefront on Laravel 8, payment gateways, order processing" },
    ],
    hook: {
      kicker: "The tension",
      statement: "The customer is not buying a product. They are buying a US address.",
    },
    pair: [
      {
        label: "What was happening",
        body: "Shoppers outside the US wanted American retail, and American retail would not ship to them. The service in between had to be explained before it could be sold.",
      },
      {
        label: "What changed the brief",
        body: "The client had no technical staff, so the specification arrived as conversations rather than documents and the build had to absorb changes without a rewrite each time.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "A visitor understanding sign up, purchase, ship well enough to claim a free US address without asking anyone.",
      },
      {
        label: "The constraint",
        body: "One storefront serving sixteen languages, where price, courier and tax treatment all vary by destination.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "Three steps, or nobody signs up.",
    },
    screens: screens("03-global-shopaholic", "Global Shopaholics", [
      {
        label: "The promise",
        heading: "Say what the service is, immediately.",
        body: "The landing view leads with the offer — buy from US stores, ship worldwide — and puts claiming a free US address in front of everything else.",
        caption: { title: "One offer, one action.", detail: "The primary CTA is the address, because that is the account." },
      },
      {
        label: "The mechanism",
        heading: "Sign up, purchase, ship.",
        body: "The numbered walk sits above the benefits, because the benefits only mean anything once the mechanism is understood.",
        caption: { title: "Assisted purchase, consolidation, cashback.", detail: "Each benefit attaches to a step rather than floating as a feature list." },
      },
      {
        label: "Narrow first",
        heading: "Most of this traffic is on a phone.",
        body: "The storefront reflows to a single column with the same content order, so the explanation survives the width it is most often read at.",
        caption: { title: "The same three steps, stacked.", detail: "Bootstrap Vue components reflow rather than switching to a separate template." },
      },
    ]),
    video: { kicker: "Walkthrough", heading: "The storefront in motion", body: "Recorded from the live site." },
    decisions: [
      {
        heading: "Lead with the mechanism, not the catalogue",
        body: "There is no catalogue — the inventory is every US store. So the page sells the process, and the numbered three-step walk is the primary content rather than a support section.",
      },
      {
        heading: "Put localisation in the data, not the templates",
        body: "Sixteen languages, plus per-destination couriers and tax treatment, resolve from the Laravel backend so a new market is a data change rather than a frontend branch.",
      },
      {
        heading: "Ship against conversations",
        body: "With no technical counterpart on the client side, each release was demonstrated rather than specified, and the component structure was kept loose enough to absorb the resulting changes.",
      },
    ],
    failureStates: [
      {
        heading: "A courier is unavailable to a destination",
        body: "Shipping options resolve per destination at request time, so an unavailable courier is absent from the choice rather than failing after the customer has committed to it.",
      },
      {
        heading: "The payment gateway declines",
        body: "Order processing treats payment as a separate state from order creation, so a decline leaves a recoverable order rather than a lost basket.",
      },
      {
        heading: "The visitor does not read English",
        body: "Language is selected in the header and carried server-side, so the explanation — the part that has to land — is never the part left untranslated.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement: "The three-step walk was written for a first-time visitor. Whether returning customers still need it above the fold is worth measuring.",
    },
  },

  "jacobs-drycleaners": {
    summary: [
      { term: "Product", detail: "JACOBS Dry Cleaners — booking and customer management, UK" },
      { term: "Role", detail: "Full-stack developer, Global Shopaholics LLC" },
      { term: "Scope", detail: "Nuxt.js front end on a Laravel 8 API, booking flow, staff admin" },
    ],
    hook: {
      kicker: "The tension",
      statement: "Two audiences, one system, and only one of them will ever read a manual.",
    },
    pair: [
      {
        label: "What was happening",
        body: "A dry cleaner with collection and delivery across a defined coverage area, taking bookings by phone and tracking them on paper.",
      },
      {
        label: "What changed the brief",
        body: "Staff needed an admin area at least as much as customers needed a booking form, so the build was two interfaces over one data model rather than a website with a form on it.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "A customer booking a collection without calling, and staff managing that order without transcribing it.",
      },
      {
        label: "The constraint",
        body: "The service is geographically bounded. A booking outside the coverage area is worse than no booking, because someone has to unwind it.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "Answer the two questions that stop a booking.",
    },
    screens: screens("04-jacobs-drycleaners", "JACOBS Dry Cleaners", [
      {
        label: "The offer",
        heading: "Professional cleaning, a few clicks away.",
        body: "The landing view states the service and puts booking in reach, with the service promise close enough to be read before committing.",
        caption: { title: "Booking is the primary action.", detail: "Everything above the fold serves the decision to book." },
      },
      {
        label: "The two blockers",
        heading: "Do you cover me, and what does it cost?",
        body: "Coverage area and price list are first-class pages rather than footer links, because they are the two questions that end a booking before it starts.",
        caption: { title: "How we work, coverage, prices, FAQ.", detail: "The nav is ordered by what a hesitant customer needs next." },
      },
      {
        label: "Narrow first",
        heading: "Booked from a phone, usually.",
        body: "The Nuxt layout reflows to one column and keeps the booking action reachable without scrolling back up.",
        caption: { title: "Same flow, one column.", detail: "Server-rendered so the first paint is content, not a spinner." },
      },
    ]),
    video: { kicker: "Walkthrough", heading: "The booking flow in motion", body: "Recorded from the live site." },
    decisions: [
      {
        heading: "Make coverage a page, not a footnote",
        body: "The service only exists inside a delivery radius, so the coverage area is navigation-level content — the cheapest possible place to lose an out-of-area booking is before it is made.",
      },
      {
        heading: "Server-render the marketing surface",
        body: "Nuxt SSR so the service, coverage and pricing pages are indexable for a business whose customers find it by searching its town.",
      },
      {
        heading: "One API, two consumers",
        body: "The Laravel 8 API serves the customer booking flow and the staff admin from the same models, so an order has one representation rather than two that drift.",
      },
    ],
    failureStates: [
      {
        heading: "The address is outside the coverage area",
        body: "Coverage is checked against the booking rather than assumed, so an out-of-area request is refused at entry instead of being accepted and unwound by a person.",
      },
      {
        heading: "A staff member and a customer act at once",
        body: "Order state lives on the API and both interfaces read it, so a status change is not something one side can miss because it was holding a stale copy.",
      },
      {
        heading: "The visitor arrives from search, mid-funnel",
        body: "Every page is server-rendered and self-contained, so a customer landing directly on prices or coverage gets a page that works rather than a fragment of a flow.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement: "The coverage check runs at booking time. Whether it should run at first visit, from the browser location, is a trade against asking for a permission nobody expects.",
    },
  },


  morta: {
    summary: [
      { term: "Product", detail: "Morta — project management software for property developers" },
      { term: "Role", detail: "Frontend engineer, VisionX Technologies" },
      { term: "Scope", detail: "Next.js front end on a Node GraphQL API, procurement flow, Stripe subscriptions" },
    ],
    hook: {
      kicker: "The tension",
      statement: "A development runs in three phases that barely share a vocabulary.",
    },
    pair: [
      {
        label: "What was happening",
        body: "Property developers were running pre-construction, delivery and post-handover on separate tools, so the same project carried three sets of numbers and none of them reconciled.",
      },
      {
        label: "What changed the brief",
        body: "Procurement turned out to be the spine. Once tendering was modelled properly, the phases had something concrete to hang off rather than being three dashboards in a row.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "A developer moving from a verified supplier to a submitted tender without leaving the workspace or re-keying anything.",
      },
      {
        label: "The constraint",
        body: "This is commercial data under contract. Data security is a question the sales page has to answer, which makes it an engineering requirement rather than a preference.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "Procurement is the spine of the workspace.",
    },
    screens: screens("07-morta", "Morta", [
      {
        label: "The claim",
        heading: "Work less, earn more.",
        body: "The landing view names the audience — property developers — before it names a feature, because the product only makes sense to someone who runs developments.",
        caption: { title: "Audience first, then capability.", detail: "Start a trial or book a demo; both paths are one click from the claim." },
      },
      {
        label: "The three phases",
        heading: "Pre-construction, delivery, post-handover.",
        body: "The phases are the top-level structure of the product and of the page, so the thing being sold and the thing being used share a shape.",
        caption: { title: "Built to support every stage.", detail: "One workspace spanning phases, rather than a tool per phase." },
      },
      {
        label: "Narrow first",
        heading: "Read on site, not at a desk.",
        body: "The layout reflows to a single column and keeps the tender steps legible at the width they are actually checked on.",
        caption: { title: "The four tender steps, stacked.", detail: "Verified supplier, request, invite, submit — in order, at any width." },
      },
    ]),
    video: { kicker: "Walkthrough", heading: "The workspace in motion", body: "Recorded from the live site." },
    decisions: [
      {
        heading: "Model procurement as explicit states",
        body: "Verified supplier, send request, email invite to tender, submit tender, track procurement, item procured. Six named states rather than a status field, so the interface can say where a tender is without interpreting it.",
      },
      {
        heading: "Collapse cross-phase reads into one query",
        body: "A view spanning pre-construction and delivery would otherwise be several REST round trips. GraphQL lets the page ask for exactly the shape it renders, once.",
      },
      {
        heading: "Test the money paths hardest",
        body: "Jest and Cypress coverage concentrated on tendering and Stripe subscription billing, because those are the two flows where a defect costs a customer money rather than time.",
      },
    ],
    failureStates: [
      {
        heading: "A supplier is unverified",
        body: "Verification is the first state in the tender flow rather than a flag checked later, so an unverified supplier cannot reach a request that would have to be withdrawn.",
      },
      {
        heading: "A subscription lapses mid-project",
        body: "Billing state is separate from project data, so a lapsed subscription restricts access without putting a live development into an unreadable state.",
      },
      {
        heading: "Two teams edit the same tender",
        body: "The tender's state transitions are server-owned, so a stale client cannot advance a step that has already moved.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement: "The tender flow assumes a linear path. How often a real procurement round loops back a step is the thing I would instrument first.",
    },
  },

  liftfoils: {
    summary: [
      { term: "Product", detail: "Lift Foils — headless commerce for electric hydrofoils" },
      { term: "Role", detail: "Senior frontend engineer, contract" },
      { term: "Scope", detail: "Next.js App Router on the Shopify Storefront API, guided configurator, Stripe checkout" },
    ],
    metricNotes: {
      "traffic after migration": "Measured after the headless rebuild replaced the themed storefront.",
    },
    hook: {
      kicker: "The tension",
      statement: "Nobody buys a hydrofoil from a product grid.",
    },
    pair: [
      {
        label: "What was happening",
        body: "Three boards, plus masts, wings and accessories, sold through a themed storefront that presented them as a catalogue of interchangeable items.",
      },
      {
        label: "What changed the brief",
        body: "The wrong combination is an expensive mistake, especially for a beginner. So the job was not to list the range but to narrow it before showing a price.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "A rider reaching the right board for their level without booking a consultation first — and site traffic doubling after the migration.",
      },
      {
        label: "The constraint",
        body: "Shopify still had to own inventory, orders and fulfilment. The rebuild could change the buying experience but not the system of record behind it.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "Narrow the range before quoting a price.",
    },
    screens: screens("08-liftfoils", "Lift Foils", [
      {
        label: "One promise",
        heading: "One board. Any session.",
        body: "The landing view leads on the range's single claim rather than on a product, so the first decision is whether this is for you, not which SKU.",
        caption: { title: "Full-bleed motion, one action.", detail: "Explore the flagship, or find the right model — two paths, no grid." },
      },
      {
        label: "Three, not thirty",
        heading: "Each model exists for a reason.",
        body: "LIFT5 F, LIFT5 and LIFTX are presented as answers to different riders rather than as tiers, with the setup-time comparison doing the arguing.",
        caption: { title: "Beginner, intermediate, advanced.", detail: "The guided path filters by rider level before it filters by price." },
      },
      {
        label: "Narrow first",
        heading: "Configured on a phone, by the water.",
        body: "The configurator and cart reflow to one column while keeping the level filter reachable, so the narrowing step survives the small screen.",
        caption: { title: "Same decision, one column.", detail: "Region pricing and currency resolve server-side, so the number is right on arrival." },
      },
    ]),
    video: { kicker: "Walkthrough", heading: "The storefront in motion", body: "Recorded from the live site." },
    decisions: [
      {
        heading: "Go headless, keep Shopify underneath",
        body: "The Storefront GraphQL API keeps inventory, orders and fulfilment where they already worked, while the buying experience moved to Next.js and stopped being constrained by a theme.",
      },
      {
        heading: "Filter by rider, not by price",
        body: "The guided path asks about experience level first. Price ordering answers a question nobody buying their first hydrofoil is actually asking.",
      },
      {
        heading: "Resolve region on the server",
        body: "Currency, pricing and shipping eligibility are decided before the page is sent, so a visitor never sees a price that changes once the client has worked out where they are.",
      },
    ],
    failureStates: [
      {
        heading: "A configuration is not purchasable",
        body: "Availability comes from Shopify at request time, so an unbuildable combination is unreachable in the configurator rather than rejected at checkout.",
      },
      {
        heading: "The visitor is outside a served region",
        body: "Shipping eligibility resolves with pricing, so an unavailable region is stated before the cart rather than discovered inside it.",
      },
      {
        heading: "The rich media never loads",
        body: "The models, their differences and their prices are text and markup. The video is the atmosphere, not the argument.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement: "The guided path assumes a rider knows their own level. Whether self-assessment matches what they end up buying is the interesting measurement.",
    },
  },


  nerdwallet: {
    summary: [
      { term: "Product", detail: "NerdWallet — personal finance comparison and advice" },
      { term: "Role", detail: "Frontend engineer, contract" },
      { term: "Scope", detail: "Next.js server rendering, comparison surfaces, rate data integration" },
    ],
    metricNotes: { "monthly users": "Platform-wide, across every product category." },
    hook: {
      kicker: "The tension",
      statement: "The page has to be indexable and the numbers on it have to be current.",
    },
    pair: [
      {
        label: "What was happening",
        body: "Comparison content across credit cards, banking, mortgages, insurance, loans and investing, earning its audience through search rather than through a brand visit.",
      },
      {
        label: "What changed the brief",
        body: "Rates move faster than a build. A statically generated page is indexable and stale; a client-rendered one is current and invisible. Neither is acceptable when the rate is the product.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "The page a search engine indexes being the same page a visitor reads, with the same numbers on it.",
      },
      {
        label: "The constraint",
        body: "Rate data comes from hundreds of institutions on their own schedules, and a wrong number in a financial comparison is a trust failure, not a display bug.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "Editorial and data on the same page, at the same time.",
    },
    screens: screens("10-nerdwallet", "NerdWallet", [
      {
        label: "The proposition",
        heading: "Guidance before products.",
        body: "The landing view leads with the decision a visitor is trying to make rather than the catalogue of products underneath it.",
        caption: { title: "Categories as entry points.", detail: "Credit cards, insurance, mortgages, loans — each a route into a comparison surface." },
      },
      {
        label: "The numbers",
        heading: "Rates are content, not decoration.",
        body: "Savings, CD, money market and mortgage rates sit in the page as first-class content, fetched per request so the figure is current when it is read.",
        caption: { title: "Server-rendered, request-fresh.", detail: "The indexable page and the read page carry the same numbers." },
      },
      {
        label: "Narrow first",
        heading: "Most of this arrives from a phone search.",
        body: "Comparison tables reflow to stacked cards without dropping columns, so the same comparison is possible at any width.",
        caption: { title: "Tables become cards.", detail: "Reflow rather than horizontal scroll, so nothing is hidden off-screen." },
      },
    ]),
    video: { kicker: "Walkthrough", heading: "The platform in motion", body: "Recorded from the live site." },
    decisions: [
      {
        heading: "Server-render the comparison surfaces",
        body: "The page search engines index has to be the page with the live rate on it. That rules out both a pure static build and a client-side fetch, and leaves per-request rendering.",
      },
      {
        heading: "Treat editorial and product data as one page, two sources",
        body: "The CMS owns the guidance and the rate engine owns the numbers, composed server-side, so writers publish without a deploy and rates update without an edit.",
      },
      {
        heading: "Reflow tables rather than scroll them",
        body: "A comparison that requires horizontal scrolling on a phone is a comparison most visitors will not complete, so the table becomes stacked cards instead of a scroll container.",
      },
    ],
    failureStates: [
      {
        heading: "A rate feed is unavailable",
        body: "Rate reads are per-institution, so one unavailable source removes its row rather than emptying the table or, worse, rendering a stale figure as current.",
      },
      {
        heading: "The visitor lands mid-funnel from search",
        body: "Every comparison page is self-contained and server-rendered, so arriving directly on one is a complete experience rather than a fragment.",
      },
      {
        heading: "The client bundle never runs",
        body: "The guidance and the numbers are both in the server HTML, so the page informs even when nothing interactive has loaded.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement: "Per-request rate fetching is correct and expensive. Where a short revalidation window would be indistinguishable to a reader is worth measuring per category.",
    },
  },

  "bang-olufsen": {
    summary: [
      { term: "Product", detail: "Bang & Olufsen — luxury audio commerce across 70+ countries" },
      { term: "Role", detail: "Frontend engineer, contract" },
      { term: "Scope", detail: "Next.js with ISR, Contentful headless CMS, multi-region storefronts" },
    ],
    metricNotes: { "countries served": "Each with its own pricing, language and shipping rules." },
    hook: {
      kicker: "The tension",
      statement: "The presentation is the product, and marketing cannot wait on a deploy to change it.",
    },
    pair: [
      {
        label: "What was happening",
        body: "A brand sold on craft and presentation, running storefronts in more than seventy countries, each with its own pricing, language and shipping rules.",
      },
      {
        label: "What changed the brief",
        body: "Campaign pages were engineering work. Every seasonal change queued behind a release, which is the wrong constraint for a business whose storefront is a campaign surface.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "Marketing publishing a product story in any market without an engineer, on pages that still load fast enough to sell on.",
      },
      {
        label: "The constraint",
        body: "Rich, video-led presentation and fast global delivery pull in opposite directions, and the brand will not trade the first for the second.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "Editorial freedom, without giving up the load time.",
    },
    screens: screens("11-bang-olufsen", "Bang & Olufsen", [
      {
        label: "Presentation first",
        heading: "The product arrives as an image, not a spec.",
        body: "A full-bleed motion hero carries the current product story, with the wordmark and a single action over it and nothing competing.",
        caption: { title: "One product, one action.", detail: "The campaign surface is CMS content, so this changes without a release." },
      },
      {
        label: "Composed, not coded",
        heading: "Marketing owns the page.",
        body: "Sections are Contentful entries composed at render time, so a new campaign is an editorial change rather than an engineering ticket.",
        caption: { title: "Editorial blocks, rendered server-side.", detail: "ISR keeps them fresh without rebuilding the whole site." },
      },
      {
        label: "Narrow first",
        heading: "The same story, one column.",
        body: "The presentation holds at phone width, with store finder and account reachable and the imagery still doing the selling.",
        caption: { title: "Region resolves before paint.", detail: "Pricing, language and shipping are decided server-side per market." },
      },
    ]),
    video: { kicker: "Walkthrough", heading: "The storefront in motion", body: "Recorded from the live site." },
    decisions: [
      {
        heading: "Put the campaign surface in a CMS",
        body: "Contentful owns the editorial composition, so a seasonal change ships without engineering — which is what removes the release queue from the marketing calendar.",
      },
      {
        heading: "ISR rather than SSR or static",
        body: "Seventy markets rebuilt on every edit is untenable, and per-request rendering wastes work on pages that change weekly. Incremental regeneration behind edge caching fits both.",
      },
      {
        heading: "Resolve market before the first byte",
        body: "Price, language and shipping are settled server-side, so a visitor never sees a price correct itself after the client has worked out where they are.",
      },
    ],
    failureStates: [
      {
        heading: "A market has no localised entry",
        body: "Content resolution falls back by locale rather than rendering an empty section, so an untranslated campaign degrades to the default rather than to a gap.",
      },
      {
        heading: "The hero video does not load",
        body: "The product name, its line and its action are markup over the video, not baked into it, so the page still sells with the motion missing.",
      },
      {
        heading: "Consent is declined",
        body: "Personalisation and analytics sit behind the consent categories, so declining changes what is measured rather than whether the storefront works.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement: "The regeneration window is uniform across markets. Whether the fast-moving ones deserve a shorter one than the rest is worth measuring before tuning it.",
    },
  },


  moonrock: {
    summary: [
      { term: "Product", detail: "Moonrock PM — landlord and tenant property management" },
      { term: "Role", detail: "Developer and team lead, Dixeam" },
      { term: "Scope", detail: "React Native app for iOS and Android, Stripe rent collection, maintenance workflow" },
    ],
    hook: {
      kicker: "The tension",
      statement: "Rent, leases and repairs are three conversations between the same two people.",
    },
    pair: [
      {
        label: "What was happening",
        body: "Landlords and tenants were running a tenancy across email, phone calls and paper, so the record of what was agreed depended on who was asked.",
      },
      {
        label: "What changed the brief",
        body: "The two sides need different views of the same tenancy, not different products. Once that was the frame, one app with two roles replaced the idea of two apps.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "Rent collected on schedule without a reminder, and a maintenance request that both sides can see the state of.",
      },
      {
        label: "The constraint",
        body: "Recurring money and a subscription both run through the same app, on two platforms, for users who will not tolerate a second tool.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "One tenancy, two roles.",
    },
    screens: screens("12-moonrock", "Moonrock PM", [
      {
        label: "The relationship",
        heading: "Simplifying the landlord-tenant relationship.",
        body: "The landing view frames the product as the relationship rather than as property software, because that is the problem both sides recognise.",
        caption: { title: "Both sides, one product.", detail: "Sign up leads into a role rather than into a separate app." },
      },
      {
        label: "The offer",
        heading: "One subscription, both platforms.",
        body: "Pricing is a single monthly plan, presented alongside the app availability so the commitment is legible before signup.",
        caption: { title: "Available on iOS and Android.", detail: "One React Native codebase serving both stores." },
      },
      {
        label: "Narrow first",
        heading: "This is a phone product.",
        body: "The marketing site reflows to the width the app itself is used at, keeping signup and pricing reachable throughout.",
        caption: { title: "Mobile-first by construction.", detail: "The site matches the product rather than a desktop-first template." },
      },
    ]),
    video: { kicker: "Walkthrough", heading: "The product in motion", body: "Recorded from the live site." },
    decisions: [
      {
        heading: "One codebase, two roles",
        body: "React Native across iOS and Android, with role deciding the view rather than the binary, so a tenancy has one implementation and cannot drift between platforms or sides.",
      },
      {
        heading: "Make maintenance a tracked state",
        body: "Requests move through explicit states rather than living as messages, so both sides can see where a repair is without reconstructing it from a thread.",
      },
      {
        heading: "Let Stripe own the recurring money",
        body: "Rent collection runs on Stripe subscriptions rather than a scheduler of our own, so retries, failures and receipts are handled by the system built for them.",
      },
    ],
    failureStates: [
      {
        heading: "A rent payment fails",
        body: "Payment state is separate from tenancy state, so a failed charge is a recoverable payment rather than a tenancy that looks broken to either side.",
      },
      {
        heading: "The tenant has no signal",
        body: "The app is written against an offline-tolerant read path, so viewing a lease or a request does not require connectivity that a basement flat may not have.",
      },
      {
        heading: "Both sides act on one request",
        body: "State transitions are server-owned, so a stale client cannot close a maintenance request the other side has already reopened.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement: "Maintenance states were modelled from the landlord's process. Whether tenants read them the same way is the thing worth watching.",
    },
  },

  /* ------------------------------------------------------------------------
     Emakity carries no screen-by-screen section: it renders blank to a headless
     browser, being client-rendered behind auth. `screens` is optional, so the
     product band simply does not render for it — see `CaseProduct.tsx`.
     --------------------------------------------------------------------- */
  deliveroo: {
    summary: [
      { term: "Product", detail: "Deliveroo — restaurant delivery across the UK and Europe" },
      { term: "Role", detail: "Frontend engineer, contract" },
      { term: "Scope", detail: "Next.js storefront, GraphQL data layer, real-time order tracking" },
    ],
    metricNotes: { "users across UK & Europe": "Platform-wide, across every served market." },
    hook: {
      kicker: "The tension",
      statement: "Tracking is only worth showing if it is current, and search is only worth having if it answers first.",
    },
    pair: [
      {
        label: "What was happening",
        body: "A delivery marketplace where the two moments that matter — choosing a restaurant and watching an order arrive — both happen on a phone, often on a poor connection.",
      },
      {
        label: "What changed the brief",
        body: "Peak demand is concentrated into a narrow window each evening. A search path that is fine at noon is the whole product at seven o'clock.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "Restaurant search answering fast enough at peak that nobody reaches for a competitor, and a tracking view that updates without being asked.",
      },
      {
        label: "The constraint",
        body: "Menu availability changes with kitchen capacity, so a listing that is accurate on load can be wrong by checkout.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "One field stands between arrival and a menu.",
    },
    screens: screens("13-deliveroo", "Deliveroo", [
      {
        label: "The gate",
        heading: "Everything depends on one postcode.",
        body: "The landing view asks for a postcode and nothing else, because until it is known there is no catalogue to show — availability is entirely a function of where the visitor is.",
        caption: { title: "One field, one action.", detail: "Saved addresses sit behind the same field, so returning users skip the step rather than meeting a second one." },
      },
      {
        label: "Four audiences",
        heading: "The same platform, from four sides.",
        body: "Below the storefront the page addresses restaurants, riders, workplaces and gift buyers in turn — each a separate funnel sharing one delivery network.",
        caption: { title: "Partner, ride, work, gift.", detail: "Tracking and app download sit above them, because the ordering audience is still the primary one." },
      },
      {
        label: "Narrow first",
        heading: "Ordered from a phone, on the move.",
        body: "The postcode field, the cuisine rail and the tracking prompt all reflow to one column, keeping the entry point reachable without scrolling back up.",
        caption: { title: "Same gate, one column.", detail: "Server-rendered so the first paint is the field, not a spinner over an empty page." },
      },
    ]),
    video: { kicker: "Walkthrough", heading: "The storefront in motion", body: "Recorded from the live site." },
    decisions: [
      {
        heading: "Collapse the reads into one query",
        body: "Restaurant, menu and order data arrive through a single GraphQL round trip shaped to the view, rather than several REST calls a phone network has to pay for individually.",
      },
      {
        heading: "Cache the search path, not the order path",
        body: "Redis sits in front of restaurant search, where the same queries repeat constantly at peak. Order state is never cached, because a stale order is worse than a slow one.",
      },
      {
        heading: "Push rider position, do not poll for it",
        body: "Live tracking runs over a socket rather than an interval, so the map is current without every open tracking screen generating steady request load.",
      },
    ],
    failureStates: [
      {
        heading: "The kitchen hits capacity mid-order",
        body: "Availability is re-checked at checkout rather than trusted from the listing, so an unavailable dish is caught before payment rather than after.",
      },
      {
        heading: "The socket drops",
        body: "Tracking falls back to a polled read rather than freezing, so a dropped connection degrades the update rate instead of the information.",
      },
      {
        heading: "The visitor arrives from a local search",
        body: "Restaurant pages are server-rendered and self-contained, so landing directly on one from search is a complete page rather than an entry into a flow.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement: "The cache window on search was tuned for peak. Whether it is doing anything useful off-peak, or just serving slightly stale results, is worth measuring.",
    },
  },

  // emakity: {
  //   summary: [
  //     { term: "Product", detail: "eMakity — multi-vendor marketplace for food, groceries, catering and local services" },
  //     { term: "Role", detail: "Full-stack developer, contract" },
  //     { term: "Scope", detail: "Next.js 14 storefront on a Laravel 10 API, vendor tooling, Stripe checkout" },
  //   ],
  //   hook: {
  //     kicker: "The tension",
  //     statement: "Five verticals with nothing in common except the checkout.",
  //   },
  //   pair: [
  //     {
  //       label: "What was happening",
  //       body: "One marketplace covering food delivery, groceries, catering, car rentals and local services — categories that share a customer but not a purchase.",
  //     },
  //     {
  //       label: "What changed the brief",
  //       body: "A car rental is a booking, groceries are a basket and catering is a quote. Treating them as one product type would have made all five worse.",
  //     },
  //   ],
  //   proof: [
  //     {
  //       label: "Success looked like",
  //       body: "A vendor running their own storefront and inventory without help, and each vertical earning its own search traffic.",
  //     },
  //     {
  //       label: "The constraint",
  //       body: "Commission, payouts and inventory have to reconcile across every vertical, so the differences had to stay in the presentation rather than the ledger.",
  //     },
  //   ],
  //   decisions: [
  //     {
  //       heading: "Parameterise by vertical, share the checkout",
  //       body: "One catalogue and one checkout, configured per vertical, so a booking and a basket differ where the customer sees them and agree where the money is counted.",
  //     },
  //     {
  //       heading: "Keep commission logic on the server",
  //       body: "Commission, payouts and inventory sync live in Laravel, so no client is ever the thing deciding what a vendor is owed.",
  //     },
  //     {
  //       heading: "Render each vertical for search independently",
  //       body: "SSR and ISR per vertical, so groceries and car rentals compete in their own results rather than behind one generic marketplace page.",
  //     },
  //   ],
  //   failureStates: [
  //     {
  //       heading: "A vendor oversells stock",
  //       body: "Inventory is reserved server-side at checkout rather than decremented after payment, so two simultaneous orders cannot both succeed against one unit.",
  //     },
  //     {
  //       heading: "A payout calculation is disputed",
  //       body: "Commission is derived from stored order state rather than recomputed in a report, so the number a vendor sees and the number they are paid come from one source.",
  //     },
  //     {
  //       heading: "A vertical has no vendors in a region",
  //       body: "Empty states resolve per vertical and per region, so an unserved category says so rather than rendering an empty grid.",
  //     },
  //   ],
  //   reflection: {
  //     kicker: "What I would test next",
  //     statement: "Five verticals through one checkout is the right call for the ledger. Whether catering should have been a quote flow from the start is the one I would revisit.",
  //   },
  // },

  salearis: {
    summary: [
      { term: "Product", detail: "Salearis — B2B marketplace for freelance sales professionals, DACH" },
      { term: "Role", detail: "Full-stack developer, contract" },
      { term: "Scope", detail: "Laravel with Sanctum auth, Vue.js front end, Stripe subscriptions, DE/EN" },
    ],
    metricNotes: {
      "placement fee": "The model is subscription, not commission on placement.",
      "to first match": "The promise the product is sold on.",
      "stage verification": "Profile check, data validation, competence assessment.",
    },
    hook: {
      kicker: "The tension",
      statement: "Two audiences who want opposite things, in a market that will not tolerate a translation.",
    },
    pair: [
      {
        label: "What was happening",
        body: "Businesses in Germany, Austria and Switzerland hiring freelance closers, setters and SDRs — a specialised market matched largely through personal networks.",
      },
      {
        label: "What changed the brief",
        body: "Freelancers want to be found without being exposed, and companies want to screen before committing. The platform had to hold candidate data credibly to be used at all.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "A company sourcing and screening a contractor through the platform rather than around it, and billing that runs without intervention.",
      },
      {
        label: "The constraint",
        body: "German first, not German as a translation layer — and candidate data handled to a standard the DACH market expects by default.",
      },
    ],
    productHeading: {
      kicker: "The product story",
      statement: "Verified is a process, not a checkbox.",
    },
    screens: screens("14-salearis", "Salearis", [
      {
        label: "German first",
        heading: "The market is addressed in its own language.",
        body: "The landing view is German by default with English as the alternate, and it splits immediately into the two audiences — für Unternehmen and für Freelancer — because they are not looking for the same thing.",
        caption: { title: "Two doors, one platform.", detail: "Hire talent, or apply as a freelancer. The choice is the first interaction." },
      },
      {
        label: "The ladder",
        heading: "Profile check, data validation, competence.",
        body: "Verification is presented as three named stages rather than a badge, because the claim the marketplace rests on is that a listed freelancer has actually been assessed.",
        caption: { title: "Verifiziert, nicht nur registriert.", detail: "Each stage is a distinct state on the profile, so the interface can say which one a candidate has reached." },
      },
      {
        label: "Narrow first",
        heading: "Read on a phone, decided at a desk.",
        body: "The verification ladder, the figures and the FAQ all reflow to one column while keeping both audience entry points reachable.",
        caption: { title: "Same ladder, one column.", detail: "Server-rendered from Laravel, so the German copy is in the first response." },
      },
    ]),
    video: { kicker: "Walkthrough", heading: "The platform in motion", body: "Recorded from the live site." },
    decisions: [
      {
        heading: "One application, two sides",
        body: "Both audiences run through one Laravel application behind Sanctum sessions, so a job, an application and an interview are one record rather than two views that drift.",
      },
      {
        heading: "Make verification a three-stage state machine",
        body: "Profile check, data validation, then competence assessment — each a distinct state rather than a single verified flag, because the marketplace is sold on candidates having been assessed rather than merely registered. Two-factor authentication is scoped into the account for the same reason: the platform holds CVs, video introductions and performance history.",
      },
      {
        heading: "Build bilingual from the first screen",
        body: "German and English are both first-class throughout rather than a locale bolted on late, because a partial translation reads as a foreign product in this market.",
      },
    ],
    failureStates: [
      {
        heading: "A subscription lapses with live jobs posted",
        body: "Billing state is separate from job state, so a lapse restricts posting without withdrawing applications candidates have already made.",
      },
      {
        heading: "A candidate withdraws",
        body: "Applications are state on the job rather than a message to the company, so a withdrawal updates what both sides see rather than leaving a stale candidate in a pipeline.",
      },
      {
        heading: "A string has no German translation",
        body: "Both locales are maintained together and the interface falls back visibly rather than silently, so a gap is a bug to fix rather than an English word nobody notices.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement: "Screening tools were built for the company side first. Whether freelancers would convert better with more control over what a company sees before contact is the open question.",
    },
  },

};

/** The only entry point: the record itself stays private to this module. */
export const getCaseStudy = (slug: string): CaseStudyContent | undefined =>
  CASE_STUDIES[slug];
