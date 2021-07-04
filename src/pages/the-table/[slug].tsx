import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { getIssueData, getIssueFiles } from '../../lib/collections/theTable';
import { useHydratedMdx } from '../../lib/mdx/hydrate';
import { components } from '../../components/customEditorComponents';
import { sansSerif, sansSerifSizes } from '../../lib/styles/tokens/fonts';

interface Props {
  source: MdxRemote.Source;
}

const TheTable = ({ source }: Props) => {
  const content = useHydratedMdx(source, { components });
  return (
    <>
      <Head>
        <title>The Table</title>
        <meta name="og:title" content="The Table" />
        <meta name="og:type" content="website" />
      </Head>
      <header>
        <img src="/images/the-table-temp-header.jpg" alt="The Table logo" />
      </header>
      <main>{content}</main>
      <style jsx>{`
        header {
          display: flex;
          justify-content: center;
        }

        main {
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.medium};
          max-width: 720px;
          background-color: #ffebed;
          margin: 0 auto;
          padding: 0 10px 30px 10px;
        }

        img {
          max-width: 740px;
        }
      `}</style>
    </>
  );
};

export default TheTable;

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error('getStaticProps called without a slug in theTable/[slug].tsx');
  }

  const { source, headline, snippet } = await getIssueData(params.slug);

  return {
    props: {
      source,
      snippet,
      headline,
      slug: 'the-table',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = getIssueFiles();
  const paths = filenames.map((filename) => ({
    params: { slug: filename },
  }));

  return {
    paths,
    fallback: false,
  };
};
