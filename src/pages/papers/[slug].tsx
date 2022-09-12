import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { useHydratedMdx } from '../../lib/mdx/hydrate';
import { getPaperData, getPapersFilenames } from '../../lib/collections/papers';
import { components } from '../../components/customEditorComponents';
import {
  RecentPapers,
  staticContextKey as recentPapersKey,
} from '../../components/customEditorComponents/RecentPapers';
import { serif, serifSizes } from '../../lib/styles/tokens/fonts';
import { secondaryHeadingText } from '../../lib/styles/tokens/colors';
import { render } from '../../lib/collections/render';
import { createContextValue, getStaticContextKeys } from '../../lib/staticContext';
import { getNavPagesMetadata, PageData } from '../../lib/collections/pages';
import { PageLayout } from '../../components/PageLayout';

interface Props {
  source: MdxRemote.Source;
  pagesMetadata: PageData[];
  headline: string;
  snippet: string;
}

const ShopPaper = ({ source, pagesMetadata, headline, snippet }: Props) => {
  const content = useHydratedMdx(source, { components });
  return (
    <>
      <Head>
        <title>{headline} - The New York Times Guild</title>
        <meta name="og:title" content={headline} />
        <meta name="og:type" content="article" />
        <meta name="og:description" content={snippet} />
      </Head>
      <PageLayout pagesMetadata={pagesMetadata}>
        <main>
          <h1>{headline}</h1>
          {content}
          <RecentPapers />
        </main>
      </PageLayout>
      <style jsx>
        {`
          h1 {
            font-family: ${serif};
            font-size: ${serifSizes.extraLarge};
            font-weight: 300;
            color: ${secondaryHeadingText};
          }

          :global(img) {
            max-width: 100%;
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
  const paperData = getPaperData(params.slug);
  const staticContextKeys = [...getStaticContextKeys(paperData.content), recentPapersKey];
  const staticContext = await createContextValue(staticContextKeys);
  const pagesMetadata = getNavPagesMetadata();
  const { source, headline, snippet } = await render(paperData, components, staticContext);
  return {
    props: {
      slug: params!.slug,
      pagesMetadata,
      source,
      snippet,
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
