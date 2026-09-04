import type { NextConfig } from "next";

// The public env value is the single deployment-prefix source for both
// Next routing and lib/paths.ts. GitHub Actions sets it explicitly.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

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
