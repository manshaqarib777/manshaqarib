import { DESIGN_MCP } from "@/content/design-mcp";
import { DesignMcpPanel } from "../DesignMcpPanel";

/**
 * The frontend-starter band.
 *
 * `design-mcp-section` is kept as a class hook for the graph-paper `::before`,
 * whose `mask-image` has no utility equivalent.
 */
export function DesignMcp() {
  return (
    <section
      className="design-mcp-section relative isolate grid justify-items-center gap-[48px] overflow-hidden bg-[radial-gradient(circle_at_50%_4%,oklch(78%_0.086_78/0.09),#0000_34%),linear-gradient(oklch(10.5%_0.01_260)_0%,oklch(13%_0.012_260)_100%)] px-[max(24px,50vw_-_620px)] pt-[112px] pb-[104px] text-ink to-sm:gap-[34px] to-sm:px-[16px] to-sm:pt-[72px] to-sm:pb-[64px]"
      aria-labelledby="design-mcp-title"
    >
      <div className="design-mcp-copy grid w-[min(1120px,100%)] justify-items-center gap-[20px] text-center to-sm:gap-[14px]">
        <h2
          className="m-0 max-w-[1120px] font-display text-[clamp(44px,5.2vw,78px)] font-[760] leading-[0.96] tracking-[-0.055em] to-sm:w-full to-sm:max-w-full to-sm:text-[clamp(38px,11vw,48px)] to-sm:text-balance"
          id="design-mcp-title"
        >
          {DESIGN_MCP.title}
        </h2>
        <p className="m-0 max-w-[620px] text-[clamp(16px,1.5vw,20px)] leading-[1.45] text-mcp-muted to-sm:max-w-[31ch] to-sm:text-[16px]">
          {DESIGN_MCP.text}
        </p>
      </div>

      <DesignMcpPanel />
    </section>
  );
}
