/**
 * Page content for the exact-rebuild Ashish Ranjan route.
 *
 * Copy is transcribed verbatim from the reference build — wording, punctuation
 * and link targets included. Kept out of the components so copy edits never
 * touch markup.
 */

export const NAV_LINKS = [
  { label: "About", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  eyebrow: "Ashish Ranjan / Product Design Lead",
  title: "Trust is the interface.",
  text: "I design AI and commerce products where uncertainty turns into action.",
  actions: {
    primary: { label: "View selected work", href: "#work" },
    secondary: { label: "View resume", href: "/resume" },
  },
} as const;

/**
 * The grid is 40 × 40. The reference sets this inline via JS; here it is one
 * constant shared by the markup and the stylesheet's `repeat()` values.
 */
export const TILE_GRID = 40;

/* ---------------------------------------------------------------------------
   Editorial sections
   ------------------------------------------------------------------------ */

export const INTRO = {
  kicker: "The throughline",
  title: "The interface usually arrives late.",
  text: "First comes doubt. Delay. A system users cannot see. That is the work.",
} as const;

export const SIGNALS = [
  "Less doubt",
  "More receipts",
  "Cleaner recovery",
  "Fewer dead waits",
  "Sharper AI controls",
  "Trust that moves",
] as const;

/** `size` maps to a column span in the 12-column bento. */
export const STORY_CARDS = [
  {
    size: "wide",
    title: "Doubt first.",
    text: "Before pixels, find the hesitation.",
  },
  {
    size: "mid",
    title: "Make the system visible.",
    text: "Progress, proof, receipts, recovery.",
  },
  {
    size: "small",
    title: "Then make it quiet.",
    text: "The best control feels obvious.",
  },
  {
    size: "long",
    title: "Use AI as a translator.",
    text: "Not magic. Just better intent capture.",
  },
  {
    size: "tall",
    title: "Ship the trust loop.",
    text: "A screen is done when behavior changes.",
  },
] as const;

export const SCRUB_LINE =
  "Confidence is not a screen. It is the moment a user stops checking if the product understood them.";

/* ---------------------------------------------------------------------------
   Work
   ------------------------------------------------------------------------ */

export const WORK_HEADING = {
  kicker: "Five chapters",
  title: "Confidence. Activation. Control.",
} as const;

export interface Project {
  slug: string;
  discipline: string;
  title: string;
  challenge: string;
  tags: readonly string[];
  cover: string;
  metrics: readonly { value: string; label: string }[];
  brief: { challenge: string; solution: string };
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "ai-trial-room",
    discipline: "Consumer AI / Commerce",
    title: "AI Trial Room",
    challenge: "Turn fashion browsing into confidence, not homework.",
    tags: ["AI stylist", "Virtual try-on", "Style memory", "Recovery states"],
    cover: "/projects/ai-trial-room-cover.svg",
    metrics: [
      { value: "24%", label: "try-on intent lift" },
      { value: "18%", label: "full-look saves" },
      { value: "32k", label: "guided sessions" },
    ],
    brief: {
      challenge:
        "Online fashion forces users to imagine fit, proportion, mood, and full-outfit compatibility from a product grid.",
      solution:
        "The design challenge became: how can AI reduce imagination work while preserving user control and trust?",
    },
  },
  {
    slug: "equal-onboarding",
    discipline: "Activation / Trust / Mobile UX",
    title: "Equal AI Onboarding Drop-offs",
    challenge: "A silent wait made activation feel broken.",
    tags: ["Activation", "Progress states", "Recovery", "Mobile UX"],
    cover: "/projects/equal-onboarding-cover.svg",
    metrics: [
      { value: "68.7%", label: "onboarding completion" },
      { value: "-47%", label: "app exits" },
      { value: "550k", label: "DAU scale" },
    ],
    brief: {
      challenge:
        "The product needed users to complete call-forwarding activation before the assistant could create value.",
      solution:
        "The issue was not only technical completion. It was perceived trust during a moment where the app gave no evidence of progress.",
    },
  },
  {
    slug: "equal-call-preference",
    discipline: "AI controls / Preference systems",
    title: "AI Muting Promotional Calls",
    challenge: "Users wanted fewer junk calls, not more settings.",
    tags: [
      "AI controls",
      "Information architecture",
      "Trust loop",
      "Mixpanel",
    ],
    cover: "/projects/equal-call-preference-cover.svg",
    metrics: [
      { value: "993k", label: "users opened the page" },
      { value: "469k", label: "caller mutes" },
      { value: "99.2%", label: "category mute reliability" },
    ],
    brief: {
      challenge:
        "Users were not rejecting every unknown call. They wanted Equal to understand the kinds of calls they were done with.",
      solution:
        "The problem shifted from settings management to intent expression: choose the type of interruption first, then refine control.",
    },
  },
  {
    slug: "meesho-mall",
    discipline: "Commerce / Trust / Brand experience",
    title: "Meesho Mall",
    challenge: "Turn brand recognition into purchase confidence.",
    tags: [
      "Commerce trust",
      "Storefront systems",
      "Brand experience",
      "Recovery",
    ],
    cover: "/projects/meesho-mall-cover.svg",
    metrics: [
      { value: "4%", label: "Mall share of GMV before" },
      { value: "7%", label: "Mall share of GMV after" },
      { value: "+75%", label: "relative GMV growth" },
    ],
    brief: {
      challenge:
        "Meesho had earned a clear place in users' minds: affordable, accessible, and full of variety. But a lower price on a familiar brand could create suspicion instead of confidence.",
      solution:
        "The challenge became turning brand recognition into purchase confidence without relying on a badge or a premium-looking page alone.",
    },
  },
  {
    slug: "hvai",
    discipline: "Product strategy / Monetisation",
    title: "Equal AI — The paywall that waits.",
    challenge: "Designing a paid call assistant that earns the right to ask.",
    tags: ["Product strategy", "Monetisation", "Trust", "AI assistant"],
    cover: "/projects/hvai-cover.svg",
    metrics: [
      { value: "34%", label: "would pay" },
      { value: "18%", label: "might pay" },
      { value: "₹100", label: "median per month" },
    ],
    brief: {
      challenge:
        "Users valued Equal, but latency, reliability, and important-call concerns made an early paywall feel like a tax on unresolved risk.",
      solution:
        "Monetisation became a state machine: trust first, proof second, and payment only after success.",
    },
  },
];

/* ---------------------------------------------------------------------------
   Capabilities and experience
   ------------------------------------------------------------------------ */

export const CAPABILITIES_HEADING = {
  kicker: "How I work",
  title: "Strategy first. Interface second. Evidence always.",
} as const;

export const CAPABILITIES = [
  {
    title: "Product strategy",
    text: "Finds the real job hiding inside the request.",
  },
  {
    title: "AI interaction design",
    text: "Makes the machine explain itself.",
  },
  { title: "Visual systems", text: "Keeps complexity quiet." },
  { title: "Business impact", text: "Turns trust into movement." },
] as const;

export const EXPERIENCE_KICKER = "Experience";

export const EXPERIENCE_ROWS = [
  {
    company: "Equal",
    role: "Product Design Lead",
    detail:
      "AI assistant setup, call preferences, activation, trust loops, and 0 to 550K+ DAU scale.",
  },
  {
    company: "Meesho",
    role: "Design Lead",
    detail:
      "Homepage, discovery, experiments, design systems, and sale moments.",
  },
  {
    company: "Noon, Myntra, Noise",
    role: "Senior design and motion roles",
    detail:
      "AR shopping, e-commerce UX, campaign discovery, motion, and product storytelling.",
  },
] as const;

/* ---------------------------------------------------------------------------
   Perspective and contact
   ------------------------------------------------------------------------ */

export const PERSPECTIVE = {
  kicker: "Design perspective",
  title: "Start before the interface.",
  text: "Define the behavior. Name the constraint. Pick the success signal. Then make the screen feel obvious.",
} as const;

export const CONTACT = {
  kicker: "Contact",
  title: "Building something that needs trust?",
  email: "studioinfj@gmail.com",
  primary: "Email Ashish",
  secondary: { label: "View resume", href: "/resume" },
} as const;

/** `short` is the glyph inside the circle; `label` doubles as the tooltip. */
export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    short: "in",
    href: "https://www.linkedin.com/in/ashish-ranjan-b0bb5213a",
    external: true,
  },
  {
    label: "Behance",
    short: "Be",
    href: "https://www.behance.net/owlBrain",
    external: true,
  },
  {
    label: "Email",
    short: "@",
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
] as const;

/* ---------------------------------------------------------------------------
   Design MCP panel
   ------------------------------------------------------------------------ */

export const DESIGN_MCP = {
  title: "Stoner's Design MCP for any AI.",
  text: "Connect 51 product, visual, frontend, and motion skills to the agent where you already work.",
} as const;

export interface McpAgent {
  name: string;
  logo: string;
  /** The agent's own connector surface — step two links here. */
  settingsHref: string;
  settingsLabel: string;
  settingsTitle: string;
  settingsBody: string;
  startHref: string;
  startLabel: string;
}

/**
 * Each agent carries its own step-two wording rather than filling a template:
 * the real instructions differ per product, and a generic sentence would be
 * wrong for most of them.
 */
export const MCP_AGENTS: readonly McpAgent[] = [
  {
    name: "Claude",
    logo: "/ai-tools/claude.svg",
    settingsHref:
      "https://claude.ai/customize/connectors?modal=add-custom-connector",
    settingsLabel: "Open Claude Customize",
    settingsTitle: "Go to Claude → Customize",
    settingsBody:
      "In Claude Desktop or on claude.ai, go to Customize → Connectors. Click Add, name the connector Stoner's Design, and paste the URI.",
    startHref: "https://claude.ai/new",
    startLabel: "Start designing",
  },
  {
    name: "ChatGPT",
    logo: "/ai-tools/chatgpt.svg",
    settingsHref: "https://chatgpt.com/",
    settingsLabel: "Open ChatGPT Settings",
    settingsTitle: "Go to ChatGPT → Settings",
    settingsBody:
      "Open Settings → Apps → Advanced settings. Add Stoner's Design and paste the connector URI.",
    startHref: "https://chatgpt.com/",
    startLabel: "Start designing",
  },
  {
    name: "Cursor",
    logo: "/ai-tools/cursor.svg",
    settingsHref: "https://cursor.com/",
    settingsLabel: "Open Cursor",
    settingsTitle: "Go to Cursor → Integrations",
    settingsBody:
      "Open Cursor settings, add a custom integration named Stoner's Design, and paste the connector URI.",
    startHref: "https://cursor.com/",
    startLabel: "Open Cursor",
  },
  {
    name: "OpenClaw",
    logo: "/ai-tools/openclaw.svg",
    settingsHref: "https://clawhub.ai/",
    settingsLabel: "Open ClawHub",
    settingsTitle: "Go to OpenClaw → Skills",
    settingsBody:
      "Open the skill hub, add Stoner's Design, and keep the product brief in the same agent session.",
    startHref: "https://clawhub.ai/",
    startLabel: "Open ClawHub",
  },
  {
    name: "Hermes",
    logo: "/ai-tools/hermes.svg",
    settingsHref: "https://github.com/NousResearch/hermes-agent",
    settingsLabel: "Open Hermes",
    settingsTitle: "Go to Hermes → Skills",
    settingsBody:
      "Open the official Hermes Agent project, add Stoner's Design, and start from the real product context.",
    startHref: "https://github.com/NousResearch/hermes-agent",
    startLabel: "Open Hermes",
  },
];

export type McpMode = "mcp" | "cli" | "skill";

/** `symbol` is a Material Symbols Rounded ligature name. */
export const MCP_MODES: readonly {
  id: McpMode;
  label: string;
  symbol: string;
}[] = [
  { id: "mcp", label: "MCP", symbol: "link" },
  { id: "cli", label: "CLI", symbol: "terminal" },
  { id: "skill", label: "Skill", symbol: "description" },
];

export const CONNECTOR_URI = "plugin://stoner-s-design@personal";
export const CLI_INSTALL = "codex plugin add stoner-s-design@personal";
export const CLI_VERIFY = "codex plugin list";
export const CLI_PROMPT =
  "Use Stoner's Design to audit and polish this interface";
export const SKILL_PROMPT = "$impeccable Audit and polish this interface";

export type McpAction =
  /** A copyable value — rendered as the value plus a copy button. */
  | { kind: "copy"; value: string }
  | {
      kind: "external";
      label: string;
      href: string;
      variant: "primary" | "secondary";
    };

export interface McpStep {
  title: string;
  body: string;
  action: McpAction;
}

/** The three steps shown for a given agent and setup method. */
export function mcpSteps(agent: McpAgent, mode: McpMode): McpStep[] {
  if (mode === "cli") {
    return [
      {
        title: "Install & plug into your agent",
        body: "One command installs the complete Stoner's Design toolkit with all 51 product, visual, frontend, and motion skills.",
        action: { kind: "copy", value: CLI_INSTALL },
      },
      {
        title: "Confirm it is ready",
        body: "Check that Stoner's Design appears as installed and enabled in your Codex plugins.",
        action: { kind: "copy", value: CLI_VERIFY },
      },
      {
        title: "Start designing",
        body: `Call the toolkit by name in ${agent.name}, or invoke a focused Stoner's Design skill in your prompt.`,
        action: { kind: "copy", value: CLI_PROMPT },
      },
    ];
  }

  if (mode === "skill") {
    return [
      {
        title: "Add the skills",
        body: "One command pulls all 51 Stoner's Design skills into Codex.",
        action: { kind: "copy", value: CLI_INSTALL },
      },
      {
        title: "Confirm the install",
        body: "Check that the toolkit is installed and enabled before starting the design task.",
        action: { kind: "copy", value: CLI_VERIFY },
      },
      {
        title: "Plug skills into your prompt",
        body: "Use Impeccable for a focused polish pass, or call any Stoner's Design skill by name.",
        action: { kind: "copy", value: SKILL_PROMPT },
      },
    ];
  }

  return [
    {
      title: "Copy the Stoner's Design connector URI",
      body: `You'll paste this URI into ${agent.name} in the next step.`,
      action: { kind: "copy", value: CONNECTOR_URI },
    },
    {
      title: agent.settingsTitle,
      body: agent.settingsBody,
      action: {
        kind: "external",
        label: agent.settingsLabel,
        href: agent.settingsHref,
        variant: "secondary",
      },
    },
    {
      title: "Add it and start designing",
      body: `Connect Stoner's Design, then ask ${agent.name} to audit, redesign, or build an interface.`,
      action: {
        kind: "external",
        label: agent.startLabel,
        href: agent.startHref,
        variant: "primary",
      },
    },
  ];
}
