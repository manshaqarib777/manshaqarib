"use client";

import Link from "next/link";
import { FiArrowUp } from "react-icons/fi";
import { TextReveal } from "@/components/ui/TextReveal";
import { NAV_ITEMS, ROUTE_LINKS } from "@/constants/nav";
import { SITE } from "@/constants/site";
import { SOCIALS } from "@/constants/socials";
import { useCursorProps, useSmoothScroll } from "@/providers";

/**
 * Footer.
 *
 * The oversized wordmark is the last beat of the page — it reveals on scroll like
 * every other heading, so arriving at the bottom feels like a destination rather
 * than running out of content.
 */
export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const topCursor = useCursorProps({ variant: "text", label: "Top" });
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.07] pt-20 pb-10">
      <div className="container-wide flex flex-col gap-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <TextReveal
            as="p"
            granularity="chars"
            className="text-display text-[clamp(3rem,13vw,11rem)] leading-[0.82] text-white"
          >
            {SITE.name}
          </TextReveal>

          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="group flex shrink-0 items-center gap-3 self-start rounded-full border border-white/12 px-5 py-3 text-[0.72rem] uppercase tracking-[0.16em] text-ink-200 transition-colors duration-500 hover:border-white/35 hover:text-white lg:self-auto"
            {...topCursor}
          >
            Back to top
            <FiArrowUp
              aria-hidden
              className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
            />
          </button>
        </div>

        <div className="grid gap-10 border-t border-white/[0.07] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <span className="label-meta">Navigate</span>
            <ul className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    className="link-underline text-[0.92rem] text-ink-200 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {ROUTE_LINKS.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="link-underline text-[0.92rem] text-ink-200 transition-colors hover:text-white"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="label-meta">Elsewhere</span>
            <ul className="flex flex-col gap-1.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className="link-underline text-[0.92rem] text-ink-200 transition-colors hover:text-white"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="label-meta">Get in touch</span>
            <a
              href={`mailto:${SITE.email}`}
              className="link-underline w-fit text-[0.92rem] text-ink-200 transition-colors hover:text-white"
            >
              {SITE.email}
            </a>
            <p className="text-[0.92rem] text-ink-400">{SITE.location}</p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="label-meta">Status</span>
            <p className="flex items-center gap-2 text-[0.92rem] text-ink-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              {SITE.availability}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-8 text-[0.78rem] text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>
            Designed and built by me — Next.js, TypeScript, GSAP, WebGL.
          </p>
        </div>
      </div>
    </footer>
  );
}
