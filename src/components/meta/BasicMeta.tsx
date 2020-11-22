import Head from 'next/head';
import config from '../../lib/config.json';

interface Props {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  url: string;
}

export default function BasicMeta({ title, description, keywords, author, url }: Props) {
  return (
    <Head>
      <title>{title ? [title, config.siteTitle].join(' | ') : config.siteTitle}</title>
      <meta name="description" content={description || config.siteDescription} />
      <meta
        name="keywords"
        content={
          keywords ? keywords.join(',') : config.siteKeywords.map((it) => it.keyword).join(',')
        }
      />
      {author ? <meta name="author" content={author} /> : null}
      <link rel="canonical" href={config.baseUrl + url} />
    </Head>
  );
}
