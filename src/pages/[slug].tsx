import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import renderToString, { MdxSource } from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import Layout from '../components/Layout';

interface Props {
  source: MdxSource;
  title: string;
  pages: string[];
}

const Page = ({ source, title, pages }: Props) => {
  const content = hydrate(source);
  return (
    <Layout pages={pages}>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pages = fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'pages'))
    .map((page) => page.slice(0, page.length - 4));
  const filePath = path.join(process.cwd(), 'src', 'markdown', 'pages', `${params!.slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents, {
    engines: {
      // eslint-disable-next-line @typescript-eslint/ban-types
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  const mdxSource = await renderToString(matterResult.content);
  return {
    props: {
      pages,
      source: mdxSource,
      title: matterResult.data.title,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'pages'))
    .map((page) => page.slice(0, page.length - 4));
  const paths = pages.map((page) => ({ params: { slug: page } }));
  return {
    paths,
    fallback: false,
  };
};
