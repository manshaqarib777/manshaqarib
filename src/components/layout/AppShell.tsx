"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { ScrollRefresher } from "./ScrollRefresher";

/**
 * The WebGL scene is the single heaviest thing on the page (three + R3F + drei).
 * Loading it dynamically with `ssr: false` keeps it out of the server render and
 * out of the initial JS chunk, so first paint never waits on a renderer that only
 * draws decoration.
 */
const Scene = dynamic(() => import("@/components/webgl/Scene"), { ssr: false });

/**
 * Routes that bring their own header, footer and background, so the shared
 * chrome would only duplicate them.
 */
const BARE_ROUTES = ["/ashish", "/ashish-2"];

/**
 * Chrome shared by every route: skip link, background scene, navigation,
 * progress bar, preloader and footer. Pages supply only their own content.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const bare = BARE_ROUTES.some((route) => pathname?.startsWith(route));

  // A bare route still gets the skip link and the scroll refresher — those are
  // accessibility and layout correctness, not decoration.
  if (bare) {
    return (
      <>
        <SkipLink />
        <ScrollRefresher />
        {children}
      </>
    );
  }

  return (
    <>
      <SkipLink />

      <Preloader />
      <ScrollProgress />
      <ScrollRefresher />

      {/* Even with reduced motion the gradient field still renders — as a single
          static frame. It is background, not animation. */}
      <Scene key={prefersReducedMotion ? "static" : "live"} />

      <Navbar />

      <main id="main" className="relative">
        {children}
      </main>

      <Footer />
    </>
  );
}

/** First tab stop on every page. */
function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink-950"
    >
      Skip to content
    </a>
  );
}
