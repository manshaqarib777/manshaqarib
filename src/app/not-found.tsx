import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-wide flex min-h-svh flex-col justify-center py-32">
      <p className="label-meta">Error 404</p>
      <h1 className="text-display mt-6 max-w-[14ch] text-[clamp(2.8rem,10vw,7rem)] text-white">
        This page slipped through the grid.
      </h1>
      <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-200">
        The link is broken, or the page has moved. Everything worth seeing is one
        click away.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[0.84rem] font-medium uppercase tracking-[0.14em] text-ink-950 transition-colors hover:bg-white/90"
        >
          Back home
        </Link>
        <Link
          href="/#work"
          className="inline-flex h-12 items-center rounded-full border border-white/18 px-6 text-[0.84rem] font-medium uppercase tracking-[0.14em] text-white/90 transition-colors hover:border-white/40"
        >
          See the work
        </Link>
      </div>

      <p className="mt-14 text-[0.85rem] text-ink-400">
        Or email me directly:{" "}
        <a href={`mailto:${SITE.email}`} className="link-underline text-white">
          {SITE.email}
        </a>
      </p>
    </div>
  );
}
