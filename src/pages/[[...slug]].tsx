import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxSource } from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import { getPageData, getPagesMetadata } from '../lib/pages';
import { withNav } from '../lib/withNav';
import Navigation from '../components/Navigation';
import CallToAction from '../components/CallToAction';
import { Heading1, Heading2, Heading3, Paragraph } from '../components/Markdown';

interface Props {
  source: MdxSource;
  title: string;
}

const components = {
  Navigation,
  CallToAction,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
};

const Page = ({ source, title }: Props) => {
  const content = hydrate(source, { components });
  return (
    <>
      <Head>
        <title>{title} - The New York Times Guild</title>
      </Head>
      <main>
        <div>{content}</div>
      </main>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<Props, { slug: [string] }> = async ({ params }) => {
  const { source, title } = await getPageData(params!.slug?.[0] || 'index');
  return withNav({
    props: {
      source,
      title,
    },
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesMetadata = getPagesMetadata();
  const paths = pagesMetadata.map(({ slug }) => ({
    params: { slug: slug === 'index' ? [] : [slug] },
  }));
  return {
    paths,
    fallback: false,
  };
};
