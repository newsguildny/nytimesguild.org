import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { getPageData, getPagesMetadata, PageData } from '../lib/collections/pages';
import { components } from '../components/customEditorComponents';
import { HomeHeader } from '../components/HomeHeader';
import { PageHeader } from '../components/PageHeader';
import { PageLayout } from '../components/PageLayout';
import { useHydratedMdx } from '../lib/mdx/hydrate';
import { render } from '../lib/collections/render';
import { createContextValue, getStaticContextKeys } from '../lib/staticContext';
import { StaticContext } from '../lib/staticContext/StaticContext';

interface Props {
  slug: string;
  pagesMetadata: PageData[];
  source: MdxRemote.Source;
  title: string;
  heading: string;
  subheading: string;
  staticContextValue: Record<string, unknown>;
}

const siteTitle = 'The New York Times Guild';

const Page = ({
  slug,
  pagesMetadata,
  source,
  title,
  heading,
  subheading,
  staticContextValue,
}: Props) => {
  const isHome = slug === 'index';
  const content = useHydratedMdx(source, { components, staticContextValue });
  return (
    <>
      <Head>
        <title>{isHome ? siteTitle : `${title} - ${siteTitle}`}</title>
        <meta name="og:title" content={title} />
        <meta name="og:type" content="website" />
      </Head>
      <PageLayout slug={slug} pagesMetadata={pagesMetadata}>
        {isHome ? <HomeHeader /> : <PageHeader heading={heading} subheading={subheading} />}
        <main>
          <StaticContext.Provider value={staticContextValue}>{content}</StaticContext.Provider>
        </main>
      </PageLayout>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<Props, { slug: [string] }> = async ({ params }) => {
  const slug = params?.slug?.[0] || 'index';
  const pagesMetadata = getPagesMetadata();
  const collectionItem = getPageData(slug);
  const staticContextKeys = getStaticContextKeys(collectionItem.content);
  const staticContextValue = await createContextValue(staticContextKeys);
  const { source, title, heading, subheading } = await render(
    collectionItem,
    components,
    staticContextValue
  );
  return {
    props: {
      slug,
      pagesMetadata,
      source,
      title,
      heading: heading ?? '',
      subheading: subheading ?? '',
      staticContextValue,
    },
  };
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
