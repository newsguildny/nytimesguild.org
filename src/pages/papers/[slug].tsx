import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxSource } from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import { getPaperData, getPapersFilenames } from '../../lib/papers';
import { components } from '../../lib/customEditorComponents';
import RecentPapers from '../../components/RecentPapers';
import { serif, serifSizes } from '../../styles/tokens/fonts';
import { secondaryHeadingText } from '../../styles/tokens/colors';
import withStaticContext from '../../staticContext/withStaticContext';

interface Props {
  source: MdxSource;
  headline: string;
}

const ShopPaper = ({ source, headline }: Props) => {
  const content = hydrate(source, { components });
  return (
    <>
      <Head>
        <title>{headline} - The New York Times Guild</title>
      </Head>
      <main>
        <h1>{headline}</h1>
        {content}
        <RecentPapers />
      </main>
      <style jsx>
        {`
          h1 {
            font-family: ${serif};
            font-size: ${serifSizes.large};
            font-weight: 300;
            color: ${secondaryHeadingText};
          }
        `}
      </style>
    </>
  );
};

export default ShopPaper;

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  const { source, headline } = await getPaperData(params!.slug);
  return withStaticContext({
    props: {
      slug: params!.slug,
      source,
      headline,
    },
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = getPapersFilenames();
  const paths = filenames.map((filename) => ({
    params: { slug: filename },
  }));
  return {
    paths,
    fallback: false,
  };
};
