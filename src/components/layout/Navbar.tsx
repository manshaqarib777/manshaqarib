"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Logo } from "@/components/ui/Logo";
import { NAV_ITEMS, ROUTE_LINKS } from "@/constants/nav";
import { SITE } from "@/constants/site";
import { SOCIALS } from "@/constants/socials";
import { EASE, TRANSITION } from "@/constants/motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useCursorProps, useLoading, useSmoothScroll } from "@/providers";
import { cn } from "@/lib/utils";

/**
 * Fixed, transparent navigation.
 *
 * Behaviour:
 *  - transparent at the top, glassy once scrolled
 *  - hides on scroll-down and returns on scroll-up, so it never covers content
 *    the visitor is reading
 *  - the active-section pill is a shared-layout element, so it slides between
 *    links rather than cross-fading
 *  - anchors are real `href="#id"` links: they work without JS, and the click
 *    handler only upgrades them to a smooth Lenis scroll
 */
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection();
  const { direction, isAtTop } = useScrollDirection();
  const { scrollTo } = useSmoothScroll();
  const { isLoading } = useLoading();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const logoCursor = useCursorProps({ variant: "hover" });

  const isHidden = !isAtTop && direction === "down" && !isMenuOpen;

  const handleNavigate = useCallback(
    (event: React.MouseEvent, id: string) => {
      if (!isHome) return; // Let the browser follow /#id from a sub-page.
      event.preventDefault();
      setIsMenuOpen(false);
      scrollTo(`#${id}`, -8);
    },
    [isHome, scrollTo],
  );

  // Close the mobile menu on Escape, and lock body scroll while it's open.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: isHidden ? -110 : 0,
          opacity: isLoading ? 0 : 1,
        }}
        transition={{ duration: 0.7, ease: EASE.silk }}
        className={cn(
          // Above the mobile menu overlay (z-60), not below it: the menu's close
          // button lives in this header, and a lower z-index would paint it
          // underneath the overlay it is supposed to dismiss.
          "fixed inset-x-0 top-0 z-[70] transition-colors duration-700",
          // The glass treatment is suppressed while the menu is open, so the
          // header reads as part of the overlay rather than a bar on top of it.
          !isAtTop &&
            !isMenuOpen &&
            "border-b border-white/[0.06] bg-ink-950/55 backdrop-blur-xl",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[72px] w-full max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
        >
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400"
            aria-label={`${SITE.name} — home`}
            {...logoCursor}
          >
            <span className="block h-8 w-8 text-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[18deg]">
              <Logo />
            </span>
            <span className="hidden text-sm font-medium tracking-[0.02em] text-white sm:block">
              {SITE.name}
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = isHome && activeId === item.id;
              return (
                <li key={item.id} className="relative">
                  <Link
                    href={isHome ? `#${item.id}` : `/#${item.id}`}
                    onClick={(event) => handleNavigate(event, item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-4 py-2 text-[0.8rem] tracking-[0.06em] transition-colors duration-400",
                      isActive ? "text-white" : "text-white/55 hover:text-white",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
                    )}
                  >
                    {item.label}
                  </Link>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10"
                      transition={TRANSITION.spring}
                    />
                  )}
                </li>
              );
            })}

            {/* Real routes sit after the anchors, separated by a hairline so the
                two kinds of destination read differently. */}
            <li aria-hidden className="mx-2 h-4 w-px bg-white/12" />
            {ROUTE_LINKS.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  aria-current={pathname === route.href ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-4 py-2 text-[0.8rem] tracking-[0.06em] transition-colors duration-400",
                    pathname === route.href
                      ? "text-white"
                      : "text-white/55 hover:text-white",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
                  )}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href={isHome ? "#contact" : "/#contact"}
              onClick={(event) => handleNavigate(event, "contact")}
              className="group hidden items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-white/85 transition-colors duration-500 hover:border-white/35 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400 sm:inline-flex"
            >
              Let&rsquo;s talk
              <FiArrowUpRight
                aria-hidden
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <MenuToggle
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen((open) => !open)}
            />
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            activeId={activeId}
            onNavigate={handleNavigate}
            onClose={() => setIsMenuOpen(false)}
            isHome={isHome}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function MenuToggle({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  const cursorProps = useCursorProps({ variant: "hover" });

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-500 hover:border-white/35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400 lg:hidden"
      {...cursorProps}
    >
      <span className="relative block h-3 w-5">
        {/* Two bars that rotate into a cross — no icon swap, so it can tween. */}
        <motion.span
          className="absolute left-0 block h-px w-full bg-current"
          animate={{ top: isOpen ? 6 : 1, rotate: isOpen ? 45 : 0 }}
          transition={TRANSITION.micro}
        />
        <motion.span
          className="absolute left-0 block h-px w-full bg-current"
          animate={{ top: isOpen ? 6 : 11, rotate: isOpen ? -45 : 0 }}
          transition={TRANSITION.micro}
        />
      </span>
    </button>
  );
}

function MobileMenu({
  activeId,
  onNavigate,
  onClose,
  isHome,
}: {
  activeId: string;
  onNavigate: (event: React.MouseEvent, id: string) => void;
  onClose: () => void;
  isHome: boolean;
}) {
  return (
    // Modelled as a disclosure, not a dialog. `aria-modal` would hide everything
    // outside this element from assistive tech — including the toggle in the
    // header, which is the only way to close it. `aria-expanded` +
    // `aria-controls` on that toggle already describe the relationship, and the
    // menu follows the header in DOM order so Tab reaches it naturally.
    <motion.nav
      id="mobile-menu"
      aria-label="Mobile"
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.8, ease: EASE.silk }}
      className="fixed inset-0 z-[60] flex flex-col justify-between bg-ink-950/97 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
    >
      <ul className="flex flex-col">
        {NAV_ITEMS.map((item, index) => (
          <motion.li
            key={item.id}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0, transition: { duration: 0.2 } }}
            transition={{
              duration: 0.7,
              delay: 0.12 + index * 0.06,
              ease: EASE.silk,
            }}
            className="border-b border-white/[0.07]"
          >
            <Link
              href={isHome ? `#${item.id}` : `/#${item.id}`}
              onClick={(event) => {
                onNavigate(event, item.id);
                onClose();
              }}
              className="flex items-baseline justify-between py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
            >
              <span
                className={cn(
                  "font-display text-[2.1rem] leading-none tracking-[-0.02em] transition-colors",
                  activeId === item.id ? "text-white" : "text-white/55",
                )}
              >
                {item.label}
              </span>
              <span className="text-[0.7rem] tracking-[0.2em] text-white/30">
                {item.index}
              </span>
            </Link>
          </motion.li>
        ))}

        {ROUTE_LINKS.map((route, index) => (
          <motion.li
            key={route.href}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0, transition: { duration: 0.2 } }}
            transition={{
              duration: 0.7,
              delay: 0.12 + (NAV_ITEMS.length + index) * 0.06,
              ease: EASE.silk,
            }}
            className="border-b border-white/[0.07]"
          >
            <Link
              href={route.href}
              onClick={onClose}
              className="flex items-baseline justify-between py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
            >
              <span className="font-display text-[2.1rem] leading-none tracking-[-0.02em] text-white/55">
                {route.label}
              </span>
              <span className="text-[0.7rem] tracking-[0.2em] text-accent-300">
                Page
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap items-center gap-x-5 gap-y-2"
      >
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            className="text-[0.72rem] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white"
          >
            {social.label}
          </a>
        ))}
      </motion.div>
    </motion.nav>
  );
}
