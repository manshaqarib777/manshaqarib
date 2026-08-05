"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import {
  FiArrowRightCircle,
  FiCheck,
  FiCopy,
  FiFileText,
  FiLink,
  FiTerminal,
} from "react-icons/fi";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { MCP_AGENTS, MCP_MODES, mcpSteps, type McpMode } from "./data";

const MODE_ICON = {
  mcp: FiLink,
  cli: FiTerminal,
  skill: FiFileText,
} as const;

/**
 * The "connect the design toolkit to your agent" panel.
 *
 * Two tab groups drive one set of steps. Both groups use a roving tabindex —
 * one tab stop for the group, arrow keys to move within it — which is what the
 * ARIA tabs pattern expects and what keyboard users actually get elsewhere in
 * the OS.
 */
export function DesignMcpPanel() {
  const [agentId, setAgentId] = useState(MCP_AGENTS[0].id);
  const [mode, setMode] = useState<McpMode>("mcp");
  const panelId = useId();

  const agent = MCP_AGENTS.find((item) => item.id === agentId) ?? MCP_AGENTS[0];
  const steps = mcpSteps(agent, mode);

  return (
    <div className="design-mcp-panel">
      <div className="design-mcp-toolbar" data-mode={mode}>
        <TabList
          label="Choose an AI agent"
          className="design-mcp-agent-tabs"
          panelId={panelId}
          items={MCP_AGENTS.map((item) => ({ id: item.id, label: item.name }))}
          activeId={agentId}
          onSelect={setAgentId}
          renderIcon={(id) => {
            const match = MCP_AGENTS.find((item) => item.id === id);
            if (!match) return null;
            return (
              <span className="design-mcp-agent-logo" aria-hidden="true">
                <Image
                  src={match.logo}
                  alt=""
                  width={20}
                  height={20}
                  loading="lazy"
                />
              </span>
            );
          }}
          tabClassName="design-mcp-agent-tab"
        />

        <TabList
          label="Setup method"
          className="design-mcp-mode-tabs"
          panelId={panelId}
          items={MCP_MODES.map((item) => ({ id: item.id, label: item.label }))}
          activeId={mode}
          onSelect={(id) => setMode(id as McpMode)}
          renderIcon={(id) => {
            const Icon = MODE_ICON[id as McpMode];
            return <Icon aria-hidden="true" />;
          }}
          tabClassName="design-mcp-mode-tab"
        />
      </div>

      <div className="design-mcp-steps" id={panelId} role="tabpanel">
        {steps.map((step, index) => (
          <article
            className="design-mcp-step"
            key={`${agent.id}-${mode}-${step.title}`}
          >
            <span className="design-mcp-number">{index + 1}</span>

            <div className="design-mcp-step-copy">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>

            {step.copyValue ? <CopyField value={step.copyValue} /> : null}

            {step.action ? (
              <a
                className={`design-mcp-action design-mcp-action-${step.action.variant}`}
                href={step.action.href}
                {...(step.action.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {step.action.label}
                <FiArrowRightCircle
                  className="design-mcp-chevron"
                  aria-hidden="true"
                />
              </a>
            ) : null}
          </article>
        ))}
      </div>

      {/* Cross-link to the other setup method, so neither path is a dead end. */}
      <div className="design-mcp-shortcut">
        <button type="button" onClick={() => setMode(mode === "cli" ? "mcp" : "cli")}>
          {mode === "cli" ? (
            <FiLink aria-hidden="true" />
          ) : (
            <FiTerminal aria-hidden="true" />
          )}
          <strong>{mode === "cli" ? "MCP" : "CLI"}</strong>
          <span>
            {mode === "cli"
              ? "Connect it to your agent instead"
              : "Install the full Stoner's Design toolkit from the command line"}
          </span>
          <FiArrowRightCircle
            className="design-mcp-chevron"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

interface TabListProps {
  label: string;
  className: string;
  tabClassName: string;
  panelId: string;
  items: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
  renderIcon: (id: string) => React.ReactNode;
}

function TabList({
  label,
  className,
  tabClassName,
  panelId,
  items,
  activeId,
  onSelect,
  renderIcon,
}: TabListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  /** Arrow keys move selection and focus together, wrapping at both ends. */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!delta) return;

    event.preventDefault();
    const current = items.findIndex((item) => item.id === activeId);
    const next = (current + delta + items.length) % items.length;
    onSelect(items[next].id);
    listRef.current
      ?.querySelectorAll<HTMLButtonElement>("button")
      [next]?.focus();
  };

  return (
    <div
      ref={listRef}
      className={`design-mcp-tabs ${className}`}
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            className={`design-mcp-tab ${tabClassName}`}
            data-active={active}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={panelId}
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(item.id)}
          >
            {renderIcon(item.id)}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function CopyField({ value }: { value: string }) {
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
        title="Copy"
        onClick={() => copy(value)}
      >
        {copied ? (
          <FiCheck aria-hidden="true" />
        ) : (
          <FiCopy aria-hidden="true" />
        )}
      </button>
      {/* Announced to screen readers only — the icon swap covers sighted users. */}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
