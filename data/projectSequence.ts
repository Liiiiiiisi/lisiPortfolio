import { projectCatalog, projectHref } from '@/data/projectCatalog';
import type { ProjectCatalogEntry } from '@/types/project';

export interface SequenceEntry {
  project: ProjectCatalogEntry;
  id: string;
  slug: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  index: number;
  href: string;
  poster: string;
  thumbnail: string;
}

export const projectSequence: readonly SequenceEntry[] = projectCatalog.map((project) => ({
  project,
  id: project.id,
  slug: project.slug,
  title: project.title,
  titleZh: project.titleZh,
  description: project.description,
  descriptionZh: project.descriptionZh,
  index: project.order - 1,
  href: projectHref(project),
  poster: project.cover,
  thumbnail: project.navThumbnail ?? project.cover,
}));

export function sequenceEntryBySlug(slug: string): SequenceEntry | undefined {
  return projectSequence.find((entry) => entry.project.slug === slug);
}

export function nextSequenceEntry(slug: string): SequenceEntry | undefined {
  const current = projectSequence.find((entry) => entry.project.slug === slug);
  if (!current) return undefined;
  const nextOrder = current.project.order === projectCatalog.length ? 1 : current.project.order + 1;
  return projectSequence.find((entry) => entry.project.order === nextOrder);
}
