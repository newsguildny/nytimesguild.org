import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { getIssueData, getIssueFiles } from '../../lib/collections/theTable';
import { useHydratedMdx } from '../../lib/mdx/hydrate';
import { components } from '../../components/customEditorComponents';
import TheTableContent from '../../components/TheTableContent';
import { IssueProps } from './index';

const TheTableIssue = ({ date, headline, issue, source }: IssueProps) => {
  const content = useHydratedMdx(source, { components });
  const title = `The Table: ${headline}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="og:type" content="website" />
      </Head>
      <div className="link">
        <Link href="/the-table">
          <a>← Back to Current Issue</a>
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

export default TheTableIssue;

export const getStaticProps: GetStaticProps<IssueProps, { slug: string }> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error('getStaticProps called without a slug in theTable/[slug].tsx');
  }

  const { context, date, issue, source, headline } = await getIssueData(params.slug);

  return {
    props: {
      date,
      headline,
      issue,
      source,
      context,
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
