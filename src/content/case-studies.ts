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
  caption: { title: string; detail: string };
}

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

/** The three captured states every project has, in narrative order. */
const screens = (
  dir: string,
  name: string,
  copy: readonly [CaseScreen, CaseScreen, CaseScreen],
): readonly CaseScreen[] => [
  {
    ...copy[0],
    image: `${SCREENSHOTS}/${dir}/1-desktop-hero.png`,
    alt: `${name} — landing view`,
  },
  {
    ...copy[1],
    image: `${SCREENSHOTS}/${dir}/2-desktop-full.png`,
    alt: `${name} — full page`,
  },
  {
    ...copy[2],
    image: `${SCREENSHOTS}/${dir}/3-mobile.png`,
    alt: `${name} — mobile view`,
  },
];

const CASE_STUDIES: Record<string, CaseStudyContent> = {
  lappeland: {
    summary: [
      {
        term: "Product",
        detail: "Lappeland — outdoor-gear marketplace for the Norwegian market",
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
        body: "An outdoor-gear marketplace for the Norwegian market, built on Next.js App Router and TypeScript, with a catalogue that changes constantly.",
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
        image: "",
        alt: "",
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
        image: "",
        alt: "",
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
        image: "",
        alt: "",
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
      { term: "Role", detail: "Frontend engineer, VisionX" },
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
        image: "",
        alt: "",
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
        image: "",
        alt: "",
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
        image: "",
        alt: "",
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
      { term: "Role", detail: "Frontend engineer, VisionX" },
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
        image: "",
        alt: "",
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
        image: "",
        alt: "",
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
        image: "",
        alt: "",
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
        image: "",
        alt: "",
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
        image: "",
        alt: "",
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
        image: "",
        alt: "",
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
      {
        term: "Product",
        detail:
          "Neonbit — SaaS security dashboard for team and permission management",
      },
      { term: "Role", detail: "Senior frontend engineer, contract" },
      {
        term: "Scope",
        detail:
          "React and TypeScript dashboard, role-based access control, enterprise DACH clients",
      },
    ],
    hook: {
      kicker: "The tension",
      statement:
        "A permissions dashboard is only trustworthy if it shows you exactly what you just changed.",
    },
    pair: [
      {
        label: "What was happening",
        body: "A SaaS security dashboard for team and permission management, built in React and TypeScript and used by enterprise clients across the DACH region.",
      },
      {
        label: "What changed the brief",
        body: "Role-based access control is a model before it is a screen: the interface's job is to make the consequence of a change legible before it is saved.",
      },
    ],
    proof: [
      {
        label: "Success looked like",
        body: "Administrators able to read a team's effective permissions at a glance, and typed contracts that made an invalid role state hard to express.",
      },
      {
        label: "The constraint",
        body: "Enterprise clients with their own structures, so the model had to bend without the interface forking per customer.",
      },
    ],
    decisions: [
      {
        heading: "Type the permission model",
        body: "TypeScript generics and typed API contracts across the role and permission layer, so an invalid combination fails at the boundary rather than in the UI.",
      },
      {
        heading: "Make effective access visible",
        body: "Role-based access control surfaced as what a member can actually do, rather than as a list of flags to mentally resolve.",
      },
      {
        heading: "One dashboard, many org shapes",
        body: "Composition patterns over per-client branches, so a different customer structure was configuration instead of a fork.",
      },
    ],
    failureStates: [
      {
        heading: "The API returns a shape nobody expected",
        body: "Responses are validated at the boundary, so a malformed payload fails at the edge instead of halfway through rendering a permission screen.",
      },
      {
        heading: "A tenant could see another tenant",
        body: "Views are tenant-scoped, which makes the scope part of the read itself rather than a filter applied to results that were already fetched.",
      },
      {
        heading: "Two screens answer the same question differently",
        body: "Access rules resolve in one place and every component reads that resolution, so no screen can arrive at its own version of what a member can do.",
      },
    ],
    reflection: {
      kicker: "What I would test next",
      statement:
        "The model fails at the boundary rather than in the UI. The test is whether an administrator can predict a change before saving it.",
    },
  },
};

/** The only entry point: the record itself stays private to this module. */
export const getCaseStudy = (slug: string): CaseStudyContent | undefined =>
  CASE_STUDIES[slug];
