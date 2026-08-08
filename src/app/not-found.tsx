import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * This page used to be the last thing on the site still rendering the palette
 * and utilities of the design this portfolio replaced — cool near-black, a
 * different display face, a different button shape. Landing on it read as
 * arriving at another product. It now uses the same theme scope, header and
 * type scale as every other route, so a dead link stays inside the site.
 *
 * The shell classes mirror the home page's `<main>` for the same reason.
 */
const SHELL = [
  "portfolio relative flex min-h-svh flex-col justify-center",
  "bg-charcoal font-display tracking-[0px] text-ink",
  "px-[max(24px,50vw_-_590px)] pt-[168px] pb-[120px]",
  "[font-synthesis:none] [overflow-x:clip] to-sm:px-[20px]",
].join(" ");

const BUTTON = [
  "inline-flex min-h-[46px] items-center justify-center rounded-[999px]",
  "px-[20px] text-[13px] font-[650] whitespace-nowrap no-underline",
  "[border-width:1px] [border-style:solid]",
  "[transition:color_0.16s_ease,background-color_0.16s_ease,border-color_0.16s_ease,transform_0.14s_var(--ease-silk)]",
  "fine:hover:[transform:translateY(-1px)]",
].join(" ");

export default function NotFound() {
  return (
    <main className={SHELL} id="main">
      <SiteHeader
        brandHref="/"
        links={[
          { label: "Work", href: "/#work" },
          { label: "About", href: "/#capabilities" },
          { label: "Contact", href: "/#contact" },
        ]}
      />

      <p className="m-0 text-[12px] font-[760] tracking-[0.16em] text-accent uppercase">
        Error 404
      </p>

      <h1 className="m-0 mt-[clamp(20px,2vw,30px)] max-w-[14ch] font-display text-[clamp(48px,7vw,104px)] leading-[0.94] font-[600] tracking-[0px] to-sm:text-[clamp(42px,13vw,64px)]">
        This page slipped through the grid.
      </h1>

      <p className="mx-0 mt-[28px] mb-0 max-w-[560px] text-[21px] leading-[1.5] text-muted">
        The link is broken, or the page has moved. Everything worth seeing is one
        click away.
      </p>

      <div className="mt-[34px] flex flex-wrap gap-[12px]">
        <Link
          className={`${BUTTON} border-transparent bg-ink text-charcoal [box-shadow:0_10px_34px_#dab8761f]`}
          href="/"
        >
          Back home
        </Link>
        <Link
          className={`${BUTTON} border-line text-ink fine:hover:border-[#dab8769e] fine:hover:bg-[#dab87614]`}
          href="/#work"
        >
          See the work
        </Link>
      </div>

      <p className="mt-[56px] text-[15px] text-muted">
        Or email me directly:{" "}
        <a
          className="text-ink underline decoration-line underline-offset-4 transition-colors [transition-duration:0.16s] hover:decoration-accent"
          href={`mailto:${SITE.email}`}
        >
          {SITE.email}
        </a>
      </p>
    </main>
  );
}
