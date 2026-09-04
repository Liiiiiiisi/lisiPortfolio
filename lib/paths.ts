/**
 * Environment-driven base path handling.
 * Same public interface as the existing portfolio's withBasePath(path),
 * but implemented via NEXT_PUBLIC_BASE_PATH instead of route guessing.
 *
 * NEXT_PUBLIC_BASE_PATH is inlined at build time by Next.js.
 * Empty for local dev; set to "/<repo-name>" for GitHub Pages later.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(path: string): string {
  // Only absolute logical paths under public/ belong to this helper.
  // External URLs, protocols such as mailto:, hash links, and relative
  // values are intentionally returned unchanged.
  if (!path.startsWith('/') || path.startsWith('//')) return path;

  // Idempotency: a path carrying the current deployment prefix is final.
  if (BASE_PATH && (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`))) return path;
  return `${BASE_PATH}${path}`;
}
