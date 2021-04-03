import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { getPageData, getPagesMetadata } from '../lib/collections/pages';
import { components } from '../components/customEditorComponents';
import { HomeHeader } from '../components/HomeHeader';
import { PageHeader } from '../components/PageHeader';
import { useHydratedMdx } from '../lib/mdx/hydrate';
import { getStaticContext } from '../lib/staticContext/getStaticContext';

interface Props {
  slug: string;
  source: MdxRemote.Source;
  title: string;
  heading: string;
  subheading: string;
}

const Page = ({ slug, source, title, heading, subheading }: Props) => {
  const isHome = slug === 'index';
  const content = useHydratedMdx(source, { components });
  return (
    <>
      <Head>
        <title>{title} - The New York Times Guild</title>
      </Head>
      {isHome ? <HomeHeader /> : <PageHeader heading={heading} subheading={subheading} />}
      <main>{content}</main>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<Props, { slug: [string] }> = async ({ params }) => {
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
