import type { Metadata } from "next";
import { Resume } from "@/components/resume/Resume";
import { SITE } from "@/constants/site";
import { EDUCATION, CERTIFICATIONS, RESUME_SUMMARY } from "@/constants/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description: RESUME_SUMMARY,
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "profile",
    title: `Résumé — ${SITE.name}`,
    description: RESUME_SUMMARY,
    url: "/resume",
    images: [{ url: "/og.svg", alt: `${SITE.name} — ${SITE.role}` }],
  },
};

/**
 * Résumé route.
 *
 * `EducationalOccupationalCredential` entries are emitted alongside the person
 * so search engines can associate the certifications with the profile rather
 * than reading them as loose page text.
 */
export default function ResumePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    url: `${SITE.url}/resume`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Riyadh",
      addressCountry: "SA",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: EDUCATION.institution,
    },
    hasCredential: CERTIFICATIONS.map((certification) => ({
      "@type": "EducationalOccupationalCredential",
      name: certification.name,
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "HackerRank" },
      identifier: certification.id,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Resume />
    </>
  );
}
