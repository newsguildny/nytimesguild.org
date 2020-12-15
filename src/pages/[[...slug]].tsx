import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxSource } from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import { getPageData, getPageTitles } from '../lib/pages';
import { withNav } from '../lib/withNav';
import Navigation from '../components/Navigation';

interface Props {
  source: MdxSource;
  title: string;
}

const Page = ({ source, title }: Props) => {
  const content = hydrate(source, { components: { Navigation } });
  return (
    <>
      <Head>
        <title>{title} - The New York Times Guild</title>
      </Head>
      <main>
        <div>{content}</div>
      </main>
      <style jsx>{`
        h1 {
          font-size: 2.5rem;
          margin: 0;
          font-weight: 500;
        }
        h2 {
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .fancy {
          color: #15847d;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
        }

        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.25rem;
          }
        }
      `}</style>
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
  const pageTitles = getPageTitles();
  const paths = pageTitles.map((pageTitle) => ({
    params: { slug: pageTitle === 'index' ? [] : [pageTitle] },
  }));
  return {
    paths,
    fallback: false,
  };
};
