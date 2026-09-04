import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyPage from '@/components/CaseStudyPage';
import LegacyProjectAdapter from '@/components/LegacyProjectAdapter';
import { hasFinalCaseStudy } from '@/data/caseStudies';
import { projectBySlug, projectCatalog } from '@/data/projectCatalog';

export const dynamicParams = false;

export function generateStaticParams() {
  return projectCatalog.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  return {
    title: project ? `${project.title} — Lisi Xie` : 'Project — Lisi Xie',
    description: project?.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return (
    <main id="main">
      {hasFinalCaseStudy(project) ? (
        <CaseStudyPage slug={project.slug} />
      ) : (
        <LegacyProjectAdapter project={project} />
      )}
    </main>
  );
}
