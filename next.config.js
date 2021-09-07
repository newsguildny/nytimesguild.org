const {resolve} = require('path');
const { withStaticContext } = require('next-static-context/lib/withStaticContext');

module.exports = withStaticContext({
  env: {
    NEXT_STATIC_CONTEXT_REQUIRE_CONTEXT: resolve('./src/components'),
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
});
