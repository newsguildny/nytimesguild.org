// const { resolve } = require('path');
// const { withStaticContext } = require('next-static-context/lib/withStaticContext');

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  experimental: {
    serverComponentsExternalPackages: ["remark-prism"],
  },
};
