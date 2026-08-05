import type { Metadata } from "next";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { SITE } from "@/constants/site";
import { EXPERIENCE } from "@/constants/experience";
import { SOCIALS } from "@/constants/socials";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

/**
 * Home.
 *
 * A server component: the section components are the only client boundaries, so
 * all the copy ships in the initial HTML for crawlers and for anyone whose JS
 * never arrives. Person structured data is emitted here rather than in the layout
 * so it appears exactly once.
 */
export default function HomePage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role,
    description: SITE.description,
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Riyadh",
      addressCountry: "SA",
    },
    worksFor: EXPERIENCE.slice(0, 1).map((entry) => ({
      "@type": "Organization",
      name: entry.company,
    })),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Sargodha",
    },
    sameAs: SOCIALS.filter((social) => social.external).map(
      (social) => social.href,
    ),
    knowsAbout: [...SITE.keywords],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Static, developer-authored JSON — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
