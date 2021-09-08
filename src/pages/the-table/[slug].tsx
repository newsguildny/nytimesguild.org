import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { getIssueData, getIssueFiles, getPreviousIssues } from '../../lib/collections/theTable';
import { useHydratedMdx } from '../../lib/mdx/hydrate';
import { components } from '../../components/customEditorComponents';
import TheTableContent from '../../components/TheTableContent';
import { IssueProps } from './index';
import TheTableFooter, { TeaserProps } from '../../components/TheTableFooter';

interface IssuePageProps {
  issue: IssueProps;
  previousIssues: Array<TeaserProps>;
}

const TheTableIssue = ({ issue, previousIssues }: IssuePageProps) => {
  const { date, headline, issue: issueNumber, source } = issue;
  const content = useHydratedMdx(source, { components });
  const title = `The Table: ${headline}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="og:type" content="website" />
      </Head>
      <TheTableContent
        content={content}
        date={date}
        issue={issueNumber}
        navLink={{
          label: '← Back to Current Issue',
          link: '/the-table',
        }}
      />
      {!!previousIssues.length && <TheTableFooter teasers={previousIssues} />}
    </>
  );
};

export default TheTableIssue;

export const getStaticProps: GetStaticProps<IssuePageProps, { slug: string }> = async ({
  params,
}) => {
  if (!params?.slug) {
    throw new Error('getStaticProps called without a slug in theTable/[slug].tsx');
  }

  const previousIssues = await Promise.all(await getPreviousIssues(params.slug));

  const { date, issue, source, headline } = await getIssueData(params.slug);

  return {
    props: {
      issue: {
        date,
        headline,
        issue,
        source,
      },
      previousIssues,
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
