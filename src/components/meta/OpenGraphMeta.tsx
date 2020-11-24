import Head from 'next/head';
import config from '../../lib/config.json';

interface Props {
  url: string;
  title?: string;
  description?: string;
  image?: string;
}

export default function OpenGraphMeta({ url, title, description, image }: Props) {
  return (
    <Head>
      <meta property="og:site_name" content={config.siteTitle} />
      <meta property="og:url" content={config.baseUrl + url} />
      <meta property="og:title" content={title ? [title, config.siteTitle].join(' | ') : ''} />
      <meta property="og:description" content={description || config.siteDescription} />
      <meta property="og:image" content={image || `${config.baseUrl}/og_image.png`} />
      <meta property="og:type" content="article" />
    </Head>
  );
}
