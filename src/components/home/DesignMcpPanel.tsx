"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  MCP_AGENTS,
  MCP_MODES,
  mcpSteps,
  type McpAction,
  type McpMode,
} from "@/content/design-mcp";
import {
  MCP_ACTION,
  MCP_ACTION_COPY,
  MCP_ACTION_PRIMARY,
  MCP_ACTION_SECONDARY,
  MCP_AGENT_TAB,
  MCP_CHEVRON,
  MCP_COPY_BUTTON,
  MCP_MODE_TAB,
  MCP_SHORTCUT_LINK,
  MCP_TAB,
  MCP_TABS,
} from "./styles";

/** Material Symbols renders by ligature, so the icon name is the text content. */
function Symbol({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={
        className
          ? `material-symbols-rounded ${className}`
          : "material-symbols-rounded"
      }
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

/** The chevron that trails an action or shortcut link. */
function Chevron() {
  return <Symbol name="expand_circle_right" className={MCP_CHEVRON} />;
}

/**
 * One copy action.
 *
 * Split into its own component so each button owns its own `copied` flag — a
 * single flag shared across the three steps would light all of them at once.
 */
function CopyAction({ value }: { value: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    // `design-mcp-action-copy` is retained: a CSS `:has()` rule tints the whole
    // field when the button inside it is hovered.
    <div className={`design-mcp-action-copy ${MCP_ACTION_COPY}`}>
      <span
        className="design-mcp-copy-value overflow-hidden text-ellipsis whitespace-nowrap font-[family-name:var(--font-courier-prime),'Courier_New',Courier,monospace] text-[14px] font-[700] leading-[1.2]"
        title={value}
      >
        {value}
      </span>
      <button
        className={`design-mcp-copy-button ${MCP_COPY_BUTTON}`}
        type="button"
        aria-label={`Copy: ${value}`}
        title={copied ? "Copied" : "Copy"}
        onClick={() => void copy(value)}
      >
        <Symbol
          name={copied ? "check" : "content_copy"}
          className="text-[21px]!"
        />
      </button>
      {/* Announces success to screen readers, which get no visual icon swap. */}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}

function StepAction({ action }: { action: McpAction }) {
  if (action.kind === "copy") return <CopyAction value={action.value} />;

  return (
    <a
      className={`design-mcp-action ${MCP_ACTION} ${
        action.variant === "primary" ? MCP_ACTION_PRIMARY : MCP_ACTION_SECONDARY
      }`}
      href={action.href}
      target="_blank"
      rel="noreferrer"
    >
      {action.label}
      <Chevron />
    </a>
  );
}

/**
 * Roving-tabindex keyboard handling for a tablist: only the active tab is
 * reachable by Tab, and the arrow keys move between them.
 */
function useRovingTabs<T>(items: readonly T[], onSelect: (index: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      const last = items.length - 1;
      let next: number | null = null;

      if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
      else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = last;

      if (next === null) return;
      event.preventDefault();
      onSelect(next);
      refs.current[next]?.focus();
    },
    [items.length, onSelect],
  );

  return { refs, onKeyDown };
}

/**
 * The Design MCP panel: an agent × setup-method matrix over three steps.
 *
 * Switching either axis replays a short blur-and-rise on the step panel. That
 * runs through the Web Animations API rather than a CSS transition because the
 * content is replaced in the same commit, so there is no state to transition
 * between — only a fresh subtree to animate in.
 */
export function DesignMcpPanel() {
  const [agentIndex, setAgentIndex] = useState(0);
  const [mode, setMode] = useState<McpMode>("mcp");

  const stepsRef = useRef<HTMLDivElement>(null);
  // Skips the entrance animation on first paint — only *changes* animate.
  const mountedRef = useRef(false);

  const agent = MCP_AGENTS[agentIndex];
  const steps = useMemo(() => mcpSteps(agent, mode), [agent, mode]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    const panel = stepsRef.current;
    if (!panel) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    panel.animate(
      reduced
        ? [{ opacity: 0.72 }, { opacity: 1 }]
        : [
            {
              opacity: 0.58,
              transform: "translate3d(0, 5px, 0)",
              filter: "blur(2px)",
            },
            { opacity: 1, transform: "translate3d(0, 0, 0)", filter: "blur(0)" },
          ],
      {
        duration: reduced ? 120 : 190,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    );
  }, [agentIndex, mode]);

  const selectMode = useCallback((next: McpMode) => setMode(next), []);
  const agentTabs = useRovingTabs(MCP_AGENTS, setAgentIndex);
  const modeTabs = useRovingTabs(MCP_MODES, (index) =>
    selectMode(MCP_MODES[index].id),
  );

  return (
    <div className="design-mcp-panel w-[min(1220px,100%)] rounded-[28px] border border-[oklch(95%_0.018_82/0.1)] [background:linear-gradient(180deg,oklch(23%_0.012_260/0.98),var(--color-mcp-panel))] p-[12px] [box-shadow:inset_0_1px_oklch(100%_0_0/0.06),0_34px_100px_oklch(3%_0.01_260/0.34)] to-sm:w-full to-sm:rounded-[22px] to-sm:p-[8px]">
      <div
        className="design-mcp-toolbar grid min-h-[68px] grid-cols-[minmax(0,1fr)_auto] items-center gap-[20px] p-[0_6px_12px] to-md:grid-cols-[1fr] to-md:gap-[7px] to-sm:min-h-auto to-sm:justify-stretch to-sm:gap-[7px] to-sm:p-[0_0_8px]"
        data-mode={mode}
      >
        <div
          className={`design-mcp-tabs design-mcp-agent-tabs ${MCP_TABS} to-sm:flex-wrap to-sm:overflow-x-visible`}
          role="tablist"
          aria-label="Choose an AI agent"
        >
          {MCP_AGENTS.map((item, index) => (
            <button
              className={`design-mcp-tab design-mcp-agent-tab ${MCP_TAB} ${MCP_AGENT_TAB}`}
              key={item.name}
              type="button"
              role="tab"
              data-active={index === agentIndex}
              aria-selected={index === agentIndex}
              aria-controls="design-mcp-workflow"
              tabIndex={index === agentIndex ? 0 : -1}
              ref={(node) => {
                agentTabs.refs.current[index] = node;
              }}
              onKeyDown={(event) => agentTabs.onKeyDown(event, index)}
              onClick={() => setAgentIndex(index)}
            >
              <span
                className="design-mcp-agent-logo inline-flex size-[27px] flex-none items-center justify-center rounded-[8px] border border-[oklch(16%_0.01_260/0.12)] bg-[oklch(94%_0.008_82)] [box-shadow:0_2px_8px_oklch(3%_0.01_260/0.16)]"
                aria-hidden="true"
              >
                <Image
                  className="size-[19px] object-contain"
                  src={item.logo}
                  alt=""
                  width={20}
                  height={20}
                  loading="lazy"
                />
              </span>
              {item.name}
            </button>
          ))}
        </div>

        <div
          className={`design-mcp-tabs design-mcp-mode-tabs ${MCP_TABS} to-md:border-t to-md:border-[oklch(95%_0.018_82/0.06)] to-md:pt-[8px] to-sm:border-[#f3efe70f]`}
          role="tablist"
          aria-label="Setup method"
        >
          {MCP_MODES.map((item, index) => (
            <button
              className={`design-mcp-tab design-mcp-mode-tab ${MCP_TAB} ${MCP_MODE_TAB}`}
              key={item.id}
              type="button"
              role="tab"
              data-active={item.id === mode}
              aria-selected={item.id === mode}
              aria-controls="design-mcp-workflow"
              tabIndex={item.id === mode ? 0 : -1}
              ref={(node) => {
                modeTabs.refs.current[index] = node;
              }}
              onKeyDown={(event) => modeTabs.onKeyDown(event, index)}
              onClick={() => selectMode(item.id)}
            >
              <Symbol name={item.symbol} className="text-[20px]!" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="design-mcp-steps grid grid-cols-[1.06fr_1fr_1fr] overflow-hidden rounded-[21px] border border-[oklch(95%_0.018_82/0.07)] [background:radial-gradient(circle_at_12%_0%,oklch(78%_0.086_78/0.035),transparent_30%),var(--color-mcp-surface)] to-sm:grid-cols-[1fr] to-sm:rounded-[16px]"
        id="design-mcp-workflow"
        role="tabpanel"
        ref={stepsRef}
      >
        {steps.map((step, index) => (
          <article
            className="design-mcp-step flex min-h-[344px] min-w-0 flex-col items-start p-[28px_26px_26px] [&+&]:border-l [&+&]:border-[oklch(95%_0.018_82/0.08)] to-sm:min-h-auto to-sm:p-[22px_20px_24px] to-sm:[&+&]:border-t to-sm:[&+&]:border-l-0 to-sm:[&+&]:border-[#f3efe714]"
            // Keyed by agent and mode so React replaces the subtree on switch
            // rather than patching text in place.
            key={`${agent.name}-${mode}-${index}`}
          >
            <span className="design-mcp-number inline-flex size-[34px] items-center justify-center rounded-[999px] border border-[oklch(95%_0.018_82/0.11)] bg-[oklch(100%_0_0/0.04)] text-center text-[13px] font-[760] leading-none text-[oklch(86%_0.018_82)]">
              {index + 1}
            </span>
            <div className="design-mcp-step-copy mt-[46px] to-sm:mt-[24px]">
              <h3 className="m-0 font-display text-[clamp(20px,1.75vw,27px)] leading-[1.08] tracking-[-0.03em] text-ink">
                {step.title}
              </h3>
              <p className="mx-0 mt-[12px] mb-0 max-w-[34ch] text-[15px] leading-[1.5] text-[oklch(69%_0.02_82)]">
                {step.body}
              </p>
            </div>
            <StepAction action={step.action} />
          </article>
        ))}
      </div>

      <div className="design-mcp-shortcut flex min-h-[58px] w-full items-center justify-center gap-[10px] [border:0] bg-[radial-gradient(at_50%_100%,oklch(78%_0.086_78/0.08),#0000_52%)] p-[12px_16px_0] text-center text-[14px] leading-[1.25] text-[oklch(69%_0.018_82)] [transition:color_0.16s_ease,transform_0.14s_var(--ease-silk)] to-sm:min-h-[52px] to-sm:flex-wrap to-sm:p-[12px_10px_2px] to-sm:text-[12px]">
        {mode === "mcp" ? (
          <button
            className={MCP_SHORTCUT_LINK}
            type="button"
            onClick={() => selectMode("cli")}
          >
            <Symbol name="terminal" />
            <strong className="font-[680] text-ink">CLI</strong>
            <span>
              Install the full Stoner&rsquo;s Design toolkit from the command
              line
            </span>
            <Chevron />
          </button>
        ) : mode === "skill" ? (
          <>
            <span>Using Codex? Install the full toolkit with the</span>
            <button
              className={MCP_SHORTCUT_LINK}
              type="button"
              onClick={() => selectMode("cli")}
            >
              CLI
              <Chevron />
            </button>
            <span aria-hidden="true">|</span>
            <a className={MCP_SHORTCUT_LINK} href="#capabilities">
              View all 51 skills
              <Chevron />
            </a>
          </>
        ) : (
          <a className={MCP_SHORTCUT_LINK} href="#capabilities">
            View all 51 Stoner&rsquo;s Design skills
            <Chevron />
          </a>
        )}
      </div>
    </div>
  );
}
