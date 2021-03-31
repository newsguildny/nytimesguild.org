import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxSource } from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import { getPageData, getPagesMetadata } from '../lib/pages';
import { components } from '../lib/customEditorComponents';
import HomeHeader from '../components/HomeHeader';
import PageHeader from '../components/PageHeader';
import withStaticContext from '../staticContext/withStaticContext';

interface Props {
  slug: string;
  source: MdxSource;
  title: string;
  heading: string;
  subheading: string;
}

const Page = ({ slug, source, title, heading, subheading }: Props) => {
  const isHome = slug === 'index';
  const content = hydrate(source, { components });
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
  const { source, title, heading, subheading } = await getPageData(slug);
  return withStaticContext({
    props: {
      slug,
      source,
      title,
      heading: heading ?? '',
      subheading: subheading ?? '',
    },
  });
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
