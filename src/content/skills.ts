/**
 * Skills and tooling.
 *
 * NOT RENDERED YET. This design has no skills section — its equivalent is the
 * four-card "How I work" band in `home.ts`, which makes claims rather than
 * ratings. The data is held here so a section can be built against it without
 * anyone having to dig it out of another project.
 *
 * A caveat worth keeping with the data: the 0–100 levels are self-assessed, not
 * measured. A CV lists what you know, not a score out of a hundred. If these are
 * ever rendered, frame them as relative confidence rather than as credentials —
 * or drop the numbers and keep the grouping, which is the part that carries
 * information.
 */

export interface Skill {
  name: string;
  /** Self-assessed, 0–100. See the caveat above. */
  level: number;
}

export const SKILL_GROUPS: Readonly<Record<string, readonly Skill[]>> = {
  "AI / LLM": [
    { name: "OpenAI & Anthropic APIs", level: 90 },
    { name: "RAG pipelines", level: 88 },
    { name: "Vector search (pgvector)", level: 85 },
    { name: "Prompt engineering", level: 85 },
    { name: "LangChain", level: 80 },
  ],
  Frontend: [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 92 },
    { name: "Tailwind CSS", level: 88 },
    { name: "TypeScript", level: 85 },
  ],
  Backend: [
    { name: "Node.js", level: 90 },
    { name: "Prisma ORM", level: 88 },
    { name: "API Routes", level: 85 },
    { name: "Django (Python)", level: 70 },
  ],
  Database: [
    { name: "MongoDB", level: 90 },
    { name: "Prisma", level: 88 },
  ],
  "State & Auth": [
    { name: "Redux Toolkit", level: 92 },
    { name: "NextAuth.js", level: 87 },
    { name: "Redux Persist", level: 85 },
    { name: "JWT", level: 85 },
  ],
};

/**
 * Everything else in the toolbelt, grouped.
 *
 * The source data carried a per-item brand colour and a Simple Icons slug. Both
 * are dropped: this theme has one accent, and tinting a row of logos in six
 * brand colours is the thing it is deliberately not doing.
 */
export const TOOLING: Readonly<Record<string, readonly string[]>> = {
  "AI / LLM": [
    "OpenAI API",
    "Anthropic (Claude) API",
    "RAG pipelines",
    "LangChain",
    "pgvector",
    "Semantic search",
    "Text-to-SQL",
    "Vision-to-structured-data",
    "Prompt engineering",
  ],
  Frontend: ["React", "Vue.js", "Next.js", "Nuxt.js", "JavaScript", "Tailwind"],
  Backend: ["PHP", "Laravel", "Node.js", "Golang", "Python", "Django"],
  DevOps: ["Git", "GitHub Actions", "Docker", "Jenkins", "AWS", "Vercel"],
  Architecture: [
    "REST APIs",
    "GraphQL",
    "Microservices",
    "Onion Architecture",
    "CI/CD",
    "SEO",
    "Code Reviews",
    "Performance",
  ],
};
