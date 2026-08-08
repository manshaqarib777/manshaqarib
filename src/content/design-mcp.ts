/**
 * The frontend-starter panel: an agent × setup-method matrix over three steps.
 *
 * The copy is per-agent rather than templated, because the real instructions
 * differ per product and a generic sentence would be wrong for most of them.
 */

export const DESIGN_MCP = {
  title: "Mansha's frontend starter for any AI agent.",
  text: "Component primitives, per-route rendering and accessibility defaults — wired into the agent you already work in.",
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

export const MCP_AGENTS: readonly McpAgent[] = [
  {
    name: "Claude",
    logo: "/ai-tools/claude.svg",
    settingsHref:
      "https://claude.ai/customize/connectors?modal=add-custom-connector",
    settingsLabel: "Open Claude Customize",
    settingsTitle: "Go to Claude → Customize",
    settingsBody:
      "In Claude Desktop or on claude.ai, go to Customize → Connectors. Click Add, name the connector MQ Frontend, and paste the URI.",
    startHref: "https://claude.ai/new",
    startLabel: "Start building",
  },
  {
    name: "ChatGPT",
    logo: "/ai-tools/chatgpt.svg",
    settingsHref: "https://chatgpt.com/",
    settingsLabel: "Open ChatGPT Settings",
    settingsTitle: "Go to ChatGPT → Settings",
    settingsBody:
      "Open Settings → Apps → Advanced settings. Add MQ Frontend and paste the connector URI.",
    startHref: "https://chatgpt.com/",
    startLabel: "Start building",
  },
  {
    name: "Cursor",
    logo: "/ai-tools/cursor.svg",
    settingsHref: "https://cursor.com/",
    settingsLabel: "Open Cursor",
    settingsTitle: "Go to Cursor → Integrations",
    settingsBody:
      "Open Cursor settings, add a custom integration named MQ Frontend, and paste the connector URI.",
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
      "Open the skill hub, add MQ Frontend, and keep the component brief in the same agent session.",
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
      "Open the official Hermes Agent project, add MQ Frontend, and start from the real component context.",
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

/**
 * TODO before launch: these four are placeholders for a toolkit that is not
 * published yet. `CONNECTOR_URI` resolves to nothing and `create-mq-app` is not
 * on npm — publish them, or point the panel at a real repository, before this
 * page goes live. Everything else on the page is real and verifiable.
 */
const CONNECTOR_URI = "plugin://mq-frontend@personal";
const CLI_INSTALL = "npx create-mq-app@latest";
const CLI_VERIFY = "npx create-mq-app --version";
const CLI_PROMPT = "Use the MQ frontend conventions to scaffold this screen";
const SKILL_PROMPT =
  "$mq-frontend Audit this component for accessibility and render cost";

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
        title: "Scaffold the project",
        body: "One command sets up the Next.js App Router baseline — TypeScript, Tailwind, the component primitives and the accessibility defaults.",
        action: { kind: "copy", value: CLI_INSTALL },
      },
      {
        title: "Confirm it is ready",
        body: "Check the generator resolves before pointing an agent at the project.",
        action: { kind: "copy", value: CLI_VERIFY },
      },
      {
        title: "Start building",
        body: `Ask ${agent.name} to work inside the conventions rather than inventing its own.`,
        action: { kind: "copy", value: CLI_PROMPT },
      },
    ];
  }

  if (mode === "skill") {
    return [
      {
        title: "Add the skill",
        body: "One command pulls the frontend conventions in as a callable skill.",
        action: { kind: "copy", value: CLI_INSTALL },
      },
      {
        title: "Confirm the install",
        body: "Check it is enabled before starting the build task.",
        action: { kind: "copy", value: CLI_VERIFY },
      },
      {
        title: "Plug it into your prompt",
        body: "Call it for a focused pass on accessibility and render cost, or by name for anything else.",
        action: { kind: "copy", value: SKILL_PROMPT },
      },
    ];
  }

  return [
    {
      title: "Copy the connector URI",
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
      title: "Add it and start building",
      body: `Connect it, then ask ${agent.name} to scaffold, audit or refactor a screen.`,
      action: {
        kind: "external",
        label: agent.startLabel,
        href: agent.startHref,
        variant: "primary",
      },
    },
  ];
}
