/**
 * Typed model for the project detail / case-study template.
 * Content lives in data/caseStudies.ts — never inside components.
 *
 * Page structure (numbering is derived from position, not stored):
 *   01 Hero · 02 Challenge · 03 Key Experience · 04 How It Works ·
 *   05 Build / Prototype · 06 My Contribution (optional, collaborative
 *   projects only) · 07 Outcome · Next Project (generated).
 *
 * Title, poster and href are NOT duplicated here — they come from
 * data/projects.ts, keyed by slug.
 */

export type CaseMediaKind = 'image' | 'video';

/** Aspect controls the media's shape; width comes from its block layout. */
export type CaseMediaAspect = 'native' | 'ultra' | 'wide' | 'square' | 'tall' | 'phone';

export interface CaseMedia {
  kind: CaseMediaKind;
  /** Path under public/; null renders a neutral surface block (no caption). */
  src: string | null;
  poster?: string;
  aspect: CaseMediaAspect;
  alt?: string;
  altZh?: string;
  /** Optional visible editorial heading; alt remains accessibility-only. */
  title?: string;
  titleZh?: string;
  caption?: string;
  captionZh?: string;
  /** Defaults to below the frame; supporting technical evidence may lead with its caption. */
  captionPosition?: 'before' | 'after';
  /** How the source is fitted into its editorially defined aspect-ratio frame. */
  fit?: 'cover' | 'contain';
  objectPosition?: string;
}

/**
 * Media rhythm — the page alternates between these deliberately:
 *   'full'  edge-to-edge, breaks the container (punctuation)
 *   'inset' sits inside the grid with warm ground around it (breath)
 *   'pair'  two items side by side, vertically staggered (comparison)
 */
export type CaseMediaLayout = 'full' | 'inset' | 'pair' | 'grid' | 'editorial' | 'detail-sequence' | 'technical-split';

export type CaseMediaScale = 'small' | 'medium' | 'large';
export type CaseMediaAlign = 'left' | 'center' | 'right';
export type CaseMediaSpacing = 'tight' | 'normal' | 'loose';

export interface CaseMediaBlock {
  layout: CaseMediaLayout;
  /** 1 item for full/inset, 2 for pair, 4 for editorial. */
  items: CaseMedia[];
  /** Optional editorial tuning. These fields are currently used by Signie only. */
  scale?: CaseMediaScale;
  align?: CaseMediaAlign;
  spacing?: CaseMediaSpacing;
  pairBalance?: 'primary' | 'equal';
}

/** Optional labelled points — used by "How It Works" design decisions and
 *  "Outcome" results; rendered as a spare definition list, not cards. */
export interface CasePoint {
  label: string;
  labelZh: string;
  text: string;
  textZh: string;
}

export interface CaseLearningStage {
  id: string;
  title: string;
  titleZh: string;
  copy: string;
  copyZh: string;
  media: CaseMedia;
}

export interface CaseLearningShowcase {
  stages: CaseLearningStage[];
  intervalMs?: number;
  /** When enabled, each active stage advances after one complete video duration. */
  useMediaDuration?: boolean;
  technicalAnnotation?: {
    title: string;
    titleZh: string;
    copy: string;
    copyZh: string;
    media: CaseMedia;
  };
}

export interface CaseSection {
  id: string;
  label: string;
  labelZh: string;
  /** Short lead line set larger than body copy. */
  lead: string;
  leadZh: string;
  body: string[];
  bodyZh: string[];
  points?: CasePoint[];
  media: CaseMediaBlock[];
  /** Opt-in presentation controls for the Signie editorial pilot. */
  density?: 'sparse' | 'medium' | 'dense' | 'strong';
  presentation?: 'standard' | 'sequence' | 'typography' | 'outcome' | 'media-spread';
  /** Signie V2-only interactive learning sequence. */
  learningShowcase?: CaseLearningShowcase;
}

export interface CaseCredit {
  role: string;
  roleZh: string;
  names: string;
}

export interface CaseWalkthrough {
  /** Local logical public path. Preview clips must not be used here. */
  src: string;
  poster?: string;
  title: string;
  titleZh: string;
}

export interface CaseStudy {
  /** Explicit registry key. Global identity and routing remain catalog-owned. */
  projectId: string;
  /** Opt-in page-level art direction; omitted projects keep the shared case-study layout. */
  artDirection?: 'campaign-editorial';
  /** Concise hero discipline line, e.g. "XR / Hand Tracking / Learning".
   *  Kept short — it sits on the hero's top rule opposite the back link. */
  discipline: string;
  disciplineZh: string;
  /** One-line proposition, set as a caption beneath the hero media. */
  proposition: string;
  propositionZh: string;
  /** Hero meta strip. */
  role: string;
  roleZh: string;
  team: string;
  teamZh: string;
  platform?: string;
  platformZh?: string;
  year?: string;
  outcome?: string;
  outcomeZh?: string;
  outcomeEmphasis?: boolean;
  hero: CaseMedia;
  /** Omit when no verified local full-length file exists; the CTA stays hidden. */
  walkthrough?: CaseWalkthrough;
  sections: CaseSection[];
  credits: CaseCredit[];
  /** Defaults to true. Signie keeps the ending focused on its award outcome. */
  showCredits?: boolean;
}
