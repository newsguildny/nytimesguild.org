import { GetStaticProps } from 'next';
import Link from 'next/link';
import { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { getLatestIssue } from '../../lib/collections/theTable';
import { useHydratedMdx } from '../../lib/mdx/hydrate';
import { components } from '../../components/customEditorComponents';
import TheTableContent from '../../components/TheTableContent';

export interface IssueProps {
  date: string;
  headline?: string;
  issue: string;
  source: MdxRemote.Source;
}

const TheTable = ({ date, issue, source }: IssueProps) => {
  const content = useHydratedMdx(source, { components });

  return (
    <>
      <Head>
        <title>The Table</title>
        <meta name="og:title" content="The Table" />
        <meta name="og:type" content="website" />
      </Head>
      <div className="link">
        <Link href="/">
          <a>← The Times Guild Site</a>
        </Link>
      </div>
      <TheTableContent content={content} date={date} issue={issue} />
      <style jsx>{`
        .link {
          font-family: 'Public Sans';
          font-size: 18px;
          margin: 48px 0 0 48px;
        }

        a {
          text-decoration: none;
        }
      `}</style>
    </>
  );
};

export default TheTable;

export const getStaticProps: GetStaticProps = async () => {
  const { context, date, issue, source } = await getLatestIssue();

  return {
    props: {
      date,
      issue,
      source,
      context,
      slug: 'the-table',
    },
  };
};
