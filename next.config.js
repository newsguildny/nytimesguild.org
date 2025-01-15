module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  experimental: {
    serverComponentsExternalPackages: ["remark-prism"],
  },
  output: "export",
  distDir: "dist",
};
