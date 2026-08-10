/**
 * Identity and SEO — the single source of truth for anything that names the
 * site rather than describing its content.
 *
 * Page copy does not live here; it lives with the section that renders it, in
 * `src/content`. This is only what metadata, the sitemap and robots.txt need.
 *
 * `url` feeds `metadataBase`, every canonical tag, the sitemap and robots.txt,
 * so it must be the real production domain.
 */
export const SITE = {
  name: "Mansha Qarib",
  role: "Full-Stack Engineer — AI-Integrated Applications",
  description:
    "Full-stack engineer, 8+ years. React and Next.js in front, Node.js and Laravel behind, with LLM features shipped into live products — RAG assistants, vision-to-structured-data, semantic search and natural-language-to-SQL, on platforms serving 700+ financial institutions and 100,000+ users.",
  email: "manshaqarib@gmail.com",
  url: "https://manshaqarib.vercel.app",
  keywords: [
    "full-stack engineer",
    "ai integration",
    "llm integration",
    "rag pipeline",
    "openai api",
    "anthropic claude api",
    "semantic search",
    "pgvector",
    "text-to-sql",
    "workflow automation",
    "react developer",
    "next.js app router",
    "typescript",
    "node.js",
    "laravel",
    "riyadh",
    "saudi arabia",
  ],
} as const;
