import Link from "next/link";
import { BRAND } from "@/content/home";

/**
 * The page chrome shared by the home page and its case studies.
 *
 * Both routes carried their own copy of this markup, and they had already
 * drifted: the case page's links were written without the type utilities, so
 * they rendered at the UA's default size and case instead of the tracked,
 * uppercase column the home route shows. Everything the two genuinely differ on
 * is a prop — where the wordmark points, which links exist, and which one is
 * being read — and everything else is now written once.
 *
 * A server component, like the sections it sits above: the dot marker, the
 * hovered/current shift and the sibling dimming are all CSS in `src/styles/home.css`,
 * so the header needs no JavaScript at all.
 *
 * `mix-blend-difference` is what inverts the nav against whatever scrolls
 * beneath it — which is also why it survives the page's cream/charcoal
 * alternation without a scroll listener. The keyframes ease it in from `normal`
 * so the first paint is not a flash of inverted colour.
 */

const BRAND_LINK = [
  "brand inline-block whitespace-nowrap font-display",
  "text-[clamp(20px,1.532vw,30px)] font-[600] leading-[1.17] tracking-[-0.04em]",
  "text-[#f7f7f7] no-underline to-sm:text-[20px]",
].join(" ");

const NAV_LINK = [
  "relative block whitespace-nowrap py-[0.1em]",
  "text-[clamp(15px,1.184vw,23px)] font-[600] uppercase leading-[1.17] tracking-[-0.04em]",
  "text-[#f7f7f7] no-underline to-sm:py-px to-sm:text-[14px]",
].join(" ");

interface SiteHeaderProps {
  /** The wordmark's target: the home route's own top, or back to it. */
  brandHref: string;
  links: readonly { readonly label: string; readonly href: string }[];
  /**
   * The link to mark as the section being read.
   *
   * `aria-current="location"` rather than `page`: these point at sections of the
   * current document, not at another page. It is also what lights the dot in
   * `src/styles/home.css`, so the marker and the announcement stay the same fact.
   */
  currentHref?: string;
}

export function SiteHeader({ brandHref, links, currentHref }: SiteHeaderProps) {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-[1000] w-full animate-[header-invert_2.2s_both] py-[0.4vw] text-[#f7f7f7] mix-blend-difference motion-reduce:animate-none to-sm:py-[1vw]">
      <nav
        className="site-nav relative mx-auto my-[1.2em] flex min-h-[64px] w-[calc(100%-4vw)] max-w-[1900px] items-center justify-between gap-[24px] p-0 to-sm:my-[12px] to-sm:min-h-[54px] to-sm:w-[calc(100%-28px)] to-sm:gap-[10px]"
        aria-label="Page navigation"
      >
        <Link
          className={BRAND_LINK}
          href={brandHref}
          aria-label="Mansha Qarib portfolio home"
        >
          {BRAND}
        </Link>

        <div className="nav-links inline-flex flex-col items-end justify-end gap-[5px] text-right to-sm:gap-[4px]">
          {links.map((link) => (
            <a
              className={NAV_LINK}
              href={link.href}
              key={link.href}
              aria-current={link.href === currentHref ? "location" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
