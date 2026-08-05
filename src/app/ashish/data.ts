/**
 * Page content for the Ashish Ranjan portfolio route.
 *
 * Kept out of the components so copy edits never touch markup, and so the
 * Design MCP panel's agent × mode matrix stays readable in one place.
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
} as const;

/* ---------------------------------------------------------------------------
   Design MCP panel
   ------------------------------------------------------------------------ */

export type McpMode = "mcp" | "cli" | "skill";

export interface McpStep {
  title: string;
  body: string;
  /** A copyable value, or a link — never both. */
  copyValue?: string;
  action?: { label: string; href: string; variant: "primary" | "secondary" };
}

export interface McpAgent {
  id: string;
  name: string;
  logo: string;
  /** Where "Open <agent>" and "Start designing" point. */
  settingsUrl: string;
  newChatUrl: string;
  /** The agent's own connector/config surface, named as the product names it. */
  settingsLabel: string;
}

export const MCP_AGENTS: readonly McpAgent[] = [
  {
    id: "claude",
    name: "Claude",
    logo: "/ai-tools/claude.svg",
    settingsUrl: "https://claude.ai/customize/connectors",
    newChatUrl: "https://claude.ai/new",
    settingsLabel: "Customize → Connectors",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    logo: "/ai-tools/chatgpt.svg",
    settingsUrl: "https://chatgpt.com/#settings/Connectors",
    newChatUrl: "https://chatgpt.com/",
    settingsLabel: "Settings → Connectors",
  },
  {
    id: "cursor",
    name: "Cursor",
    logo: "/ai-tools/cursor.svg",
    settingsUrl: "https://docs.cursor.com/context/model-context-protocol",
    newChatUrl: "https://cursor.com/",
    settingsLabel: "Settings → MCP",
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    logo: "/ai-tools/openclaw.svg",
    settingsUrl: "#contact",
    newChatUrl: "#contact",
    settingsLabel: "Settings → Connectors",
  },
  {
    id: "hermes",
    name: "Hermes",
    logo: "/ai-tools/hermes.svg",
    settingsUrl: "#contact",
    newChatUrl: "#contact",
    settingsLabel: "Settings → Connectors",
  },
];

export const MCP_MODES: readonly { id: McpMode; label: string }[] = [
  { id: "mcp", label: "MCP" },
  { id: "cli", label: "CLI" },
  { id: "skill", label: "Skill" },
];

export const CONNECTOR_URI = "plugin://stoner-s-design@personal";
export const CLI_COMMAND = "npx stoners-design init";
export const SKILL_COMMAND = "npx stoners-design skill add";

/** The three steps shown for a given agent and setup method. */
export function mcpSteps(agent: McpAgent, mode: McpMode): McpStep[] {
  if (mode === "mcp") {
    return [
      {
        title: "Copy the Stoner's Design connector URI",
        body: `You'll paste this URI into ${agent.name} in the next step.`,
        copyValue: CONNECTOR_URI,
      },
      {
        title: `Go to ${agent.name} → ${agent.settingsLabel.split(" → ")[0]}`,
        body: `In ${agent.name}, open ${agent.settingsLabel}. Add a connector, name it Stoner's Design, and paste the URI.`,
        action: {
          label: `Open ${agent.name} settings`,
          href: agent.settingsUrl,
          variant: "secondary",
        },
      },
      {
        title: "Add it and start designing",
        body: `Connect Stoner's Design, then ask ${agent.name} to audit, redesign, or build an interface.`,
        action: {
          label: "Start designing",
          href: agent.newChatUrl,
          variant: "primary",
        },
      },
    ];
  }

  if (mode === "cli") {
    return [
      {
        title: "Install the toolkit",
        body: "Run this in the repo you want the design skills to work against.",
        copyValue: CLI_COMMAND,
      },
      {
        title: `Point it at ${agent.name}`,
        body: `The installer writes the MCP config ${agent.name} reads, so there is nothing to paste by hand.`,
        copyValue: `npx stoners-design link ${agent.id}`,
      },
      {
        title: "Start designing",
        body: `Reopen ${agent.name} and all 51 product, visual, frontend, and motion skills are available.`,
        action: {
          label: "Start designing",
          href: agent.newChatUrl,
          variant: "primary",
        },
      },
    ];
  }

  return [
    {
      title: "Add the skill files",
      body: "Skills are plain files — versioned with your repo and reviewable in a pull request.",
      copyValue: SKILL_COMMAND,
    },
    {
      title: "Commit them",
      body: `Anyone on the team who opens the repo in ${agent.name} inherits the same design skills.`,
      copyValue: "git add .claude && git commit -m 'Add design skills'",
    },
    {
      title: "Start designing",
      body: `Ask ${agent.name} to audit, redesign, or build an interface — no connector required.`,
      action: {
        label: "Start designing",
        href: agent.newChatUrl,
        variant: "primary",
      },
    },
  ];
}

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
   Capabilities, experience, closing
   ------------------------------------------------------------------------ */

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

export const PERSPECTIVE = {
  kicker: "Design perspective",
  title: "Start before the interface.",
  text: "Define the behavior. Name the constraint. Pick the success signal. Then make the screen feel obvious.",
} as const;

export const CONTACT = {
  kicker: "Contact",
  title: "Building something that needs trust?",
  email: "studioinfj@gmail.com",
} as const;

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
