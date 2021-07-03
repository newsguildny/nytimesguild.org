import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { getPageData, getPagesMetadata } from '../lib/collections/pages';
import { components } from '../components/customEditorComponents';
import { HomeHeader } from '../components/HomeHeader';
import { PageHeader } from '../components/PageHeader';
import { getStaticContext } from '../lib/staticContext/getStaticContext';
import { useHydratedMdx } from '../lib/mdx/hydrate';

interface HeaderProps {
  slug: string;
  heading: string;
  subheading: string;
}

const siteTitle = 'The New York Times Guild';

const Header = ({ slug, heading, subheading }: HeaderProps) => {
  // if (slug === 'the-table') return null

  return slug === 'index' ? (
    <HomeHeader />
  ) : (
    <PageHeader heading={heading} subheading={subheading} />
  );
};

interface PageProps {
  slug: string;
  source: MdxRemote.Source;
  title: string;
  heading: string;
  subheading: string;
}

const Page = ({ slug, source, title, heading, subheading }: PageProps) => {
  const isHome = slug === 'index';
  const content = useHydratedMdx(source, { components });
  return (
    <>
      <Head>
        <title>{isHome ? siteTitle : `${title} - ${siteTitle}`}</title>
        <meta name="og:title" content={title} />
        <meta name="og:type" content="website" />
      </Head>
      <Header slug={slug} heading={heading} subheading={subheading} />
      <main>{content}</main>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<PageProps, { slug: [string] }> = async ({ params }) => {
  const slug = params?.slug?.[0] || 'index';
  const staticContext = await getStaticContext(slug);
  const { source, title, heading, subheading } = await getPageData(slug, staticContext);
  return {
    props: {
      slug,
      source,
      title,
      heading: heading ?? '',
      subheading: subheading ?? '',
      staticContext,
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
