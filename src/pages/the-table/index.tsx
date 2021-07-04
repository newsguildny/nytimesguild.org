import { GetStaticProps } from 'next';
import { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { getLatestIssue } from '../../lib/collections/theTable';
import { useHydratedMdx } from '../../lib/mdx/hydrate';
import { components } from '../../components/customEditorComponents';

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
      <main>
        <div>Most recent edition will go here</div>
        <div>Links to all previous issues</div>
        {content}
      </main>
      <style jsx>{`
        main {
          padding-top: 2rem;
        }

        @media (min-width: 769px) {
          main {
            padding-top: 5rem;
          }
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
