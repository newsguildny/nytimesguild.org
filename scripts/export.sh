#!/usr/bin/env bash

# Build site
yarn next build

# Export entire site to dist directory
yarn next export -o ./dist

# We deploy public and private pages differently, so
# make public and private dist directories
mkdir public-dist private-dist

# Move all private pages to the private dist.
# If we want to add more private page prefixes,
# add them here.
# mv dist/tech-membership private-dist/

# Move everything else to the public dist.
mv dist/* public-dist/
