import type { IconType } from "react-icons";

/** A single portfolio project. `slug` drives the /work/[slug] case-study route. */
export interface Project {
  slug: string;
  title: string;
  /** Short category label shown next to the title. */
  discipline: string;
  year: string;
  client: string;
  role: string;
  /** One-line hook used in the index list. */
  excerpt: string;
  /** Longer intro used at the top of the case study. */
  summary: string;
  cover: string;
  /** Additional imagery for the case-study gallery. */
  gallery: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Two accent colours used for the project's gradient treatment. */
  accent: [string, string];
  metrics: { label: string; value: string }[];
  /** Case-study body, rendered as sequential prose blocks. */
  chapters: { heading: string; body: string[] }[];
}

export interface SkillGroup {
  title: string;
  caption: string;
  skills: { name: string; level: number }[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon: IconType;
  /**
   * False for `mailto:` / `tel:` links. Opening those with `target="_blank"`
   * leaves an empty tab behind in several browsers.
   */
  external: boolean;
}

export interface NavItem {
  label: string;
  /** DOM id of the target section. */
  id: string;
  index: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}
