import { GetStaticProps } from 'next';
import { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { getLatestIssue } from '../../lib/collections/theTable';
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
      <header>The Table</header>
      <main>
        <article>{content}</article>
      </main>
      <style jsx>{`
        header {
          font-family: 'Public Sans';
          font-size: 6em;
          font-weight: 900;
          display: flex;
          justify-content: center;
          color: #490606;
          position: relative;
          top: 0.4em;
        }

        main {
          background-color: #ffebed;
          padding-bottom: 48px;
        }

        article {
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.medium};
          margin: 0 auto;
        }

        img {
          max-width: 740px;
        }
      `}</style>
    </>
  );
};

export default TheTable;

export const getStaticProps: GetStaticProps = async () => {
  const { source, headline, snippet } = await getLatestIssue();

  return {
    props: {
      source,
      snippet,
      headline,
      slug: 'the-table',
    },
  };
};
