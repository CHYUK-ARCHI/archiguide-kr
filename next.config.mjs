const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] || "archiguide-kr";
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubPagesBuild ? `/${repositoryName}` : "";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: isGithubPagesBuild ? "export" : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined
};

export default nextConfig;
