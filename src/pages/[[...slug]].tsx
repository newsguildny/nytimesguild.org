import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxSource } from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import YouTube from '../components/YouTube';
import { getPageData, getPagesMetadata } from '../lib/pages';
import { withNav } from '../lib/withNav';
import Navigation from '../components/Navigation';
import CallToAction from '../components/CallToAction';
import { Heading2, Heading3, Paragraph, HorizontalRule } from '../components/Markdown';
import HomeHeader from '../components/HomeHeader';
import PageHeader from '../components/PageHeader';

interface Props {
  slug: string;
  source: MdxSource;
  title: string;
  heading: string;
  subheading: string;
}

const components = {
  Navigation,
  CallToAction,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  hr: HorizontalRule,
  YouTube,
};

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
  return withNav({
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
