import type { ProjectCatalogEntry } from '@/types/project';
import type { CaseStudy } from '@/types/caseStudy';
import { signieCaseStudy } from '@/data/caseStudies/signie';

const finalCaseStudies: Readonly<Record<string, CaseStudy>> = {
  signie: signieCaseStudy,
};

export function getCaseStudy(project: ProjectCatalogEntry): CaseStudy | undefined {
  return finalCaseStudies[project.id];
}

export function hasFinalCaseStudy(project: ProjectCatalogEntry): boolean {
  return Boolean(finalCaseStudies[project.id]);
}
