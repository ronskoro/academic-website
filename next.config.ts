import type { NextConfig } from "next";

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/academic-website" : "",
  assetPrefix: isGitHubPages ? "/academic-website/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
