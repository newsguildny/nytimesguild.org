import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxSource } from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import { getPageData, getPagesMetadata } from '../lib/pages';
import { withNav } from '../lib/withNav';
import Navigation from '../components/Navigation';
import CallToAction from '../components/CallToAction';
import { Heading1, Heading2, Heading3, Paragraph, HorizontalRule } from '../components/Markdown';

interface Props {
  source: MdxSource;
  title: string;
  seoHeadline: string;
}

const components = {
  Navigation,
  CallToAction,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  hr: HorizontalRule,
};

const Page = ({ source, title, seoHeadline }: Props) => {
  const content = hydrate(source, { components });
  return (
    <>
      <Head>
        <title>{title} - The New York Times Guild</title>
      </Head>
      <main>
        {seoHeadline ? (
          <section>
            <h1>{seoHeadline}</h1>
            {content}
          </section>
        ) : (
          content
        )}
      </main>
      <style jsx>
        {`
          h1 {
            display: none;
          }

          @media (min-width: 769px) {
            main {
              max-width: 47rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<Props, { slug: [string] }> = async ({ params }) => {
  const { source, title, seoHeadline } = await getPageData(params!.slug?.[0] || 'index');
  return withNav({
    props: {
      source,
      title,
      seoHeadline: seoHeadline ?? null,
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
