import type { NextConfig } from "next";

// For GitHub Pages: if repo name is not username.github.io, need basePath
// This will be set automatically in GitHub Actions via environment variable
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\//, '') || 'lisiPortfolio';
const isProduction = process.env.NODE_ENV === 'production';
// Only use basePath if repo name is not a .github.io repo and we have the env var
const basePath = (isProduction && process.env.NEXT_PUBLIC_BASE_PATH) 
  ? process.env.NEXT_PUBLIC_BASE_PATH 
  : (isProduction && !repoName.includes('.github.io')) 
    ? `/${repoName}` 
    : '';

const nextConfig: NextConfig = {
  output: 'export', // Enable static export for GitHub Pages
  basePath: basePath, // Set base path for GitHub Pages subdirectory
  assetPrefix: basePath, // Set asset prefix for static assets
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Helps with GitHub Pages routing
};

export default nextConfig;
