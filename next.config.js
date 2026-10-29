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
  // Jobs data is uploaded independently from the next.js build, served without
  // CORS headers, so when running locally redirect those paths to the remote
  // server
  ...(process.env.NODE_ENV === "development" && {
    async rewrites() {
      return [
        {
          source: "/tech-guild-jobs/:path*",
          destination: "https://nytimesguild.org/tech-guild-jobs/:path*",
        },
      ];
    },
  }),
  async redirects() {
    return [
      {
        source: "/tech/index.html",
        destination: "/times-tech",
        permanent: true,
      },
      {
        source: "/tech",
        destination: "/times-tech",
        permanent: true,
      },
    ];
  },
};
