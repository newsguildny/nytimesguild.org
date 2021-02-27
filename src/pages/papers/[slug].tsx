import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxSource } from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import { YouTube } from 'mdx-embed';
import { getPaperData, getPapersMetadata } from '../../lib/papers';
import { withNav } from '../../lib/withNav';
import Navigation from '../../components/Navigation';
import CallToAction from '../../components/CallToAction';
import { Heading1, Heading2, Heading3, Paragraph, HorizontalRule } from '../../components/Markdown';

interface Props {
  source: MdxSource;
  headline: string;
}

const components = {
  Navigation,
  CallToAction,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  hr: HorizontalRule,
  YouTube,
};

const ShopPaper = ({ source, headline }: Props) => {
  const content = hydrate(source, { components });
  return (
    <>
      <Head>
        <title>{headline} - The New York Times Guild</title>
      </Head>
      <main>
        <section>
          <Heading1>{headline}</Heading1>
          {content}
        </section>
      </main>
      <style jsx>
        {`
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

export default ShopPaper;

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  const { source, headline } = await getPaperData(params!.slug);
  return withNav({
    props: {
      source,
      headline,
    },
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const papersMetadata = getPapersMetadata();
  const paths = papersMetadata.map(({ slug }) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  };
};
