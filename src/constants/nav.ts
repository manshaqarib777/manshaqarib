import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "home", index: "01" },
  { label: "About", id: "about", index: "02" },
  { label: "Work", id: "work", index: "03" },
  { label: "Skills", id: "skills", index: "04" },
  { label: "Experience", id: "experience", index: "05" },
  { label: "Contact", id: "contact", index: "06" },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

/**
 * Real routes, as opposed to the in-page anchors above.
 *
 * Kept in a separate list because the active-section indicator and smooth-scroll
 * handler are driven by `NAV_ITEMS` and assume every entry is a section id on the
 * home page — adding a route there would break both.
 */
export const ROUTE_LINKS = [{ label: "Résumé", href: "/resume" }];
