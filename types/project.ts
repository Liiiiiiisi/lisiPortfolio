export type ProjectPlacement = 'featured' | 'more';
export type HeroSlot = 'left' | 'mid-left' | 'center' | 'right';

export interface ProjectCatalogEntry {
  id: string;
  slug: string;
  order: number;
  title: string;
  titleZh: string;
  placement: ProjectPlacement;
  cover: string;
  homepageCover?: string;
  navThumbnail?: string;
  preview: string;
  previewPoster: string;
  category: string;
  categoryZh: string;
  description: string;
  descriptionZh: string;
  role: string;
  roleZh: string;
  focus: string;
  focusZh: string;
  outcome?: string;
  outcomeZh?: string;
  year?: string;
  heroSlot?: HeroSlot;
  heroMobileOrder?: number;
}

export type Project = ProjectCatalogEntry;
