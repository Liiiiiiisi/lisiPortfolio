/**
 * Get the base path for the application
 * In production with GitHub Pages, this will be the repository name
 * In development, this will be empty
 */
export function getBasePath(): string {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Client-side: try to detect from current path
    // GitHub Pages typically has the repo name as first segment
    const path = window.location.pathname;
    
    // Known routes that shouldn't be considered basePath
    const knownRoutes = ['project', 'about', 'resume', 'contact', 'projects', '_next'];
    
    // Extract first segment
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0 && !knownRoutes.includes(segments[0])) {
      // This might be basePath (repo name)
      return `/${segments[0]}`;
    }
  }
  
  // Server-side or fallback: use environment variable
  // This will be set during build in GitHub Actions
  if (process.env.NEXT_PUBLIC_BASE_PATH) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  
  // Default: no basePath for local development
  return '';
}

/**
 * Prefix a path with basePath if needed
 */
export function withBasePath(path: string): string {
  const basePath = getBasePath();
  if (!basePath) return path;
  
  // Don't double-prefix
  if (path.startsWith(basePath)) return path;
  
  // Don't prefix absolute URLs
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path;
  }
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
