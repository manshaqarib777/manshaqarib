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
} from "./data";

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

/**
 * One copy action.
 *
 * Split into its own component so each button owns its own `copied` flag — a
 * single flag shared across the three steps would light all of them at once.
 */
function CopyAction({ value }: { value: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="design-mcp-action-copy">
      <span className="design-mcp-copy-value" title={value}>
        {value}
      </span>
      <button
        className="design-mcp-copy-button"
        type="button"
        aria-label={`Copy: ${value}`}
        title={copied ? "Copied" : "Copy"}
        onClick={() => void copy(value)}
      >
        <Symbol name={copied ? "check" : "content_copy"} />
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
      className={`design-mcp-action design-mcp-action-${action.variant}`}
      href={action.href}
      target="_blank"
      rel="noreferrer"
    >
      {action.label}
      <Symbol name="expand_circle_right" className="design-mcp-chevron" />
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
    <div className="design-mcp-panel">
      <div className="design-mcp-toolbar" data-mode={mode}>
        <div
          className="design-mcp-tabs design-mcp-agent-tabs"
          role="tablist"
          aria-label="Choose an AI agent"
        >
          {MCP_AGENTS.map((item, index) => (
            <button
              className="design-mcp-tab design-mcp-agent-tab"
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
              <span className="design-mcp-agent-logo" aria-hidden="true">
                <Image
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
          className="design-mcp-tabs design-mcp-mode-tabs"
          role="tablist"
          aria-label="Setup method"
        >
          {MCP_MODES.map((item, index) => (
            <button
              className="design-mcp-tab design-mcp-mode-tab"
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
              <Symbol name={item.symbol} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="design-mcp-steps"
        id="design-mcp-workflow"
        role="tabpanel"
        ref={stepsRef}
      >
        {steps.map((step, index) => (
          <article
            className="design-mcp-step"
            // Keyed by agent and mode so React replaces the subtree on switch
            // rather than patching text in place.
            key={`${agent.name}-${mode}-${index}`}
          >
            <span className="design-mcp-number">{index + 1}</span>
            <div className="design-mcp-step-copy">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
            <StepAction action={step.action} />
          </article>
        ))}
      </div>

      <div className="design-mcp-shortcut">
        {mode === "mcp" ? (
          <button type="button" onClick={() => selectMode("cli")}>
            <Symbol name="terminal" />
            <strong>CLI</strong>
            <span>
              Install the full Stoner&rsquo;s Design toolkit from the command
              line
            </span>
            <Symbol name="expand_circle_right" className="design-mcp-chevron" />
          </button>
        ) : mode === "skill" ? (
          <>
            <span>Using Codex? Install the full toolkit with the</span>
            <button type="button" onClick={() => selectMode("cli")}>
              CLI
              <Symbol
                name="expand_circle_right"
                className="design-mcp-chevron"
              />
            </button>
            <span aria-hidden="true">|</span>
            <a href="#capabilities">
              View all 51 skills
              <Symbol
                name="expand_circle_right"
                className="design-mcp-chevron"
              />
            </a>
          </>
        ) : (
          <a href="#capabilities">
            View all 51 Stoner&rsquo;s Design skills
            <Symbol name="expand_circle_right" className="design-mcp-chevron" />
          </a>
        )}
      </div>
    </div>
  );
}
