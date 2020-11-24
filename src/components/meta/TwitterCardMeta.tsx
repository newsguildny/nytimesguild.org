import Head from 'next/head';
import config from '../../lib/config.json';

interface Props {
  url: string;
  title?: string;
  description?: string;
}

export default function TwitterCardMeta({ url, title, description }: Props) {
  return (
    <Head>
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content={config.twitterAccount} />
      <meta property="twitter:url" content={config.baseUrl + url} />
      <meta property="twitter:title" content={title ? [title, config.siteTitle].join(' | ') : ''} />
      <meta property="twitter:description" content={description || config.siteDescription} />
    </Head>
  );
}
