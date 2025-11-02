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
  async redirects() {
    return [
      {
        source: '/tech/index.html',
        destination: '/times-tech',
        permanent: true,
      },
      {
        source: '/tech',
        destination: '/times-tech',
        permanent: true,
      },
    ];
  },
};
