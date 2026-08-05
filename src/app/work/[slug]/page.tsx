import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { PROJECTS, getAdjacentProject, getProject } from "@/constants/projects";
import { SITE } from "@/constants/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Every case study is known at build time, so all four are statically rendered.
 * `dynamicParams: false` makes any other slug a 404 rather than an attempted
 * on-demand render.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — ${project.discipline}`,
    description: project.excerpt,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${SITE.name}`,
      description: project.excerpt,
      url: `/work/${project.slug}`,
      images: [{ url: project.cover, alt: `${project.title} cover` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${SITE.name}`,
      description: project.excerpt,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = getAdjacentProject(slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title} — ${project.discipline}`,
    description: project.summary,
    dateCreated: project.year,
    creator: { "@type": "Person", name: SITE.name, url: SITE.url },
    about: project.stack,
    url: `${SITE.url}/work/${project.slug}`,
    image: `${SITE.url}${project.cover}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CaseStudy project={project} next={next} />
    </>
  );
}
