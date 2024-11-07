"use client";

import { CmsConfig } from "netlify-cms-core";
import { useEffect } from "react";
import { init } from "src/lib/netlify";

interface Props {
  config: CmsConfig;
}

export function Netlify({ config }: Props) {
  useEffect(() => {
    init(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <style jsx global>{`
      // Hide the next.js container; Netlify CMS completely takes over
      // and manages its own DOM. The next.js container interferes with
      // some Netlify CMS styling.
      #__next {
        display: none;
      }
    `}</style>
  );
}
