/**
 * Education and certifications.
 *
 * NOT RENDERED YET. This design has no education section; the data is held here
 * so one can be built against it without going back to another project for the
 * facts.
 */

export const EDUCATION = {
  degree: "BS Computer Science",
  period: "2016 – 2020",
  location: "Pakistan",
  coursework: [
    "Object-Oriented Programming",
    "Web Development",
    "Database Systems",
    "Software Engineering",
    "Data Structures & Algorithms",
  ],
  projects: [
    "E-commerce Platform",
    "Database Management System",
    "Web Application Development",
  ],
} as const;

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  detail: string;
}

export const CERTIFICATIONS: readonly Certification[] = [
  {
    title: "Top Rated Plus Freelancer",
    issuer: "Upwork",
    year: "2023",
    detail:
      "Recognised for consistently delivering high-quality work and maintaining excellent client relationships.",
  },
  {
    title: "Next.js — All Concepts",
    issuer: "Udemy",
    year: "2024",
    detail:
      "App Router, Server Components, SSR/ISR and full-stack patterns.",
  },
];
