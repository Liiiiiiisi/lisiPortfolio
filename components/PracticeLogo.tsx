import { practiceLogoPaths, type LogoId } from '@/data/practice';

/**
 * Small monochrome brand mark for the About page's Practice section.
 * Renders through `currentColor` only — no brand color is ever painted —
 * so every logo reads as one quiet, consistent gray regardless of the
 * source brand's own palette, and follows the surrounding text color.
 *
 * `fill-rule="evenodd"` is required for a couple of marks whose cut-out
 * details (e.g. chatgpt, meshy) rely on it, and is harmless for the
 * single-subpath marks that don't need it.
 */
export default function PracticeLogo({ id, className }: { id: LogoId; className?: string }) {
  const path = practiceLogoPaths[id];
  const paths = Array.isArray(path) ? path : [path];
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      fill="currentColor"
      fillRule="evenodd"
      className={className}
    >
      {paths.map((d, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
