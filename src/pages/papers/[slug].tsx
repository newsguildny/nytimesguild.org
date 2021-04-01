import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { useHydratedMdx } from '../../lib/mdx/hydrate';
import { getPaperData, getPapersFilenames } from '../../lib/collections/papers';
import { components } from '../../components/customEditorComponents';
import { RecentPapers } from '../../components/customEditorComponents/RecentPapers';
import { serif, serifSizes } from '../../lib/styles/tokens/fonts';
import { secondaryHeadingText } from '../../lib/styles/tokens/colors';
import { getStaticContext } from '../../lib/staticContext/contextGetters';

interface Props {
  source: MdxRemote.Source;
  headline: string;
}

const ShopPaper = ({ source, headline }: Props) => {
  const content = useHydratedMdx(source, { components });
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
  if (!params?.slug) {
    throw new Error('getStaticProps called without a slug in papers/[slug].tsx');
  }
  const staticContext = await getStaticContext(params.slug);
  const { source, headline } = await getPaperData(params.slug, staticContext);
  return {
    props: {
      slug: params!.slug,
      source,
      headline,
      staticContext,
    },
  };
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
