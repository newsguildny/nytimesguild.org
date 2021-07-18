import { GetStaticProps } from 'next';
import { MdxRemote } from 'next-mdx-remote/types';
import Head from 'next/head';
import { getLatestIssue, getPreviousIssues } from '../../lib/collections/theTable';
import { useHydratedMdx } from '../../lib/mdx/hydrate';
import { components } from '../../components/customEditorComponents';
import TheTableContent from '../../components/TheTableContent';
import TheTableFooter, { TeaserProps } from '../../components/TheTableFooter';

export interface IssueProps {
  date: string;
  headline: string;
  issue: string;
  slug?: string;
  source: MdxRemote.Source;
}

export interface Props {
  context: string;
  latestIssue: IssueProps;
  previousIssues: Array<TeaserProps>;
}

const TheTable = ({ latestIssue, previousIssues }: Props) => {
  const content = useHydratedMdx(latestIssue.source, { components });

  return (
    <>
      <Head>
        <title>The Table</title>
        <meta name="og:title" content="The Table" />
        <meta name="og:type" content="website" />
      </Head>
      <TheTableContent
        content={content}
        date={latestIssue.date}
        issue={latestIssue.issue}
        navLink={{
          label: '← The Times Guild Site',
          link: '/',
        }}
      />
      {!!previousIssues.length && <TheTableFooter teasers={previousIssues} />}
    </>
  );
};

export default TheTable;

export const getStaticProps: GetStaticProps = async () => {
  const { context, date, issue, source } = await getLatestIssue();
  const previousIssues = await Promise.all(await getPreviousIssues());

  return {
    props: {
      context,
      latestIssue: {
        date,
        issue,
        source,
      },
      previousIssues,
    },
  };
};
