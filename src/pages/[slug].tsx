import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxSource } from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import { getPageData, getPageTitles } from '../lib/pages';
import Layout from '../components/Layout';
import { withNav } from '../lib/withNav';

interface Props {
  source: MdxSource;
  title: string;
}

const Page = ({ source, title }: Props) => {
  const content = hydrate(source);
  return (
    <Layout>
      <div className="container">
        <div>
          <h1>{title}</h1>
          {content}
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 1.5rem;
        }
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
    </Layout>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  const { source, title } = await getPageData(params!.slug);
  return withNav({
    props: {
      source,
      title,
    },
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pageTitles = getPageTitles();
  const paths = pageTitles.map((pageTitle) => ({ params: { slug: pageTitle } }));
  return {
    paths,
    fallback: false,
  };
};
