import { BlogPosting } from 'schema-dts';
import { jsonLdScriptProps } from 'react-schemaorg';
import { formatISO } from 'date-fns';
import Head from 'next/head';
import config from '../../lib/config.json';

interface Props {
  url: string;
  title: string;
  keywords?: string[];
  date: Date;
  author?: string;
  image?: string;
  description?: string;
}

export default function JsonLdMeta({
  url,
  title,
  keywords,
  date,
  author,
  image,
  description,
}: Props) {
  return (
    <Head>
      <script
        {...jsonLdScriptProps<BlogPosting>({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          mainEntityOfPage: config.baseUrl + url,
          headline: title,
          ...(keywords && {
            keywords: keywords.join(','),
          }),
          datePublished: formatISO(date),
          author,
          image,
          description,
        })}
      />
    </Head>
  );
}
