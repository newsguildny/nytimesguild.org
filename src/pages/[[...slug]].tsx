import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { getStaticContext } from 'next-static-context';
import { getPageData, getPagesMetadata } from '../lib/collections/pages';
import { components } from '../components/customEditorComponents';
import { HomeHeader } from '../components/HomeHeader';
import { PageHeader } from '../components/PageHeader';
import { useHydratedMdx } from '../lib/mdx/hydrate';
import { render } from '../lib/collections/render';

interface Props {
  slug: string;
  source: MdxRemote.Source;
  title: string;
  heading: string;
  subheading: string;
}

const siteTitle = 'The New York Times Guild';

const Page = ({ slug, source, title, heading, subheading }: Props) => {
  const isHome = slug === 'index';
  const content = useHydratedMdx(source, { components });
  return (
    <>
      <Head>
        <title>{isHome ? siteTitle : `${title} - ${siteTitle}`}</title>
        <meta name="og:title" content={title} />
        <meta name="og:type" content="website" />
      </Head>
      {isHome ? <HomeHeader /> : <PageHeader heading={heading} subheading={subheading} />}
      <main>{content}</main>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<Props, { slug: [string] }> = async ({ params }) => {
  const slug = params?.slug?.[0] || 'index';
  const staticContext = await getStaticContext(require.context('../components'));
  const { source, title, heading, subheading } = await render(
    getPageData(slug),
    components,
    staticContext
  );
  return {
    props: {
      slug,
      source,
      title,
      heading: heading ?? '',
      subheading: subheading ?? '',
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
