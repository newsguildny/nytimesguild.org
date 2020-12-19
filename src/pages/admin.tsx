import yaml from 'js-yaml';
import { CmsConfig } from 'netlify-cms-core';
import Head from 'next/head';
import path from 'path';
import fs from 'fs';
import { useEffect } from 'react';
import { init } from '../lib/netlify';

interface Props {
  config: CmsConfig;
}

const AdminPage = ({ config }: Props) => {
  useEffect(() => {
    init(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>Content Manager</title>
      </Head>
      <style jsx global>{`
        // Hide the next.js container; Netlify CMS completely takes over
        // and manages its own DOM. The next.js container interferes with
        // some Netlify CMS styling.
        #__next {
          display: none;
        }
      `}</style>
    </>
  );
};

export function getStaticProps() {
  const configFile = fs.readFileSync(
    path.join(process.cwd(), 'src', 'markdown', 'meta', 'config.yml'),
    'utf-8'
  );
  const config = yaml.safeLoad(configFile, {
    schema: yaml.JSON_SCHEMA,
  }) as CmsConfig;
  return {
    props: { config },
  };
}

export default AdminPage;
