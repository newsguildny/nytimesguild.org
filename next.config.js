// const { resolve } = require('path');
const { withStaticContext } = require('next-static-context/lib/withStaticContext');

module.exports = withStaticContext('./src/components', {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
});
