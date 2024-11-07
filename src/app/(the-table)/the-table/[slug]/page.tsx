import { Metadata } from "next";
import TheTableContent from "src/components/TheTableContent";
import TheTableFooter from "src/components/TheTableFooter";
import {
  getIssueData,
  getIssueFiles,
  getPreviousIssues,
} from "src/lib/collections/theTable";

interface Props {
  params: {
    slug: string;
  };
}

export default function TheTableIssue({ params }: Props) {
  const previousIssues = getPreviousIssues(params.slug);

  const { date, issue, content } = getIssueData(params.slug);

  return (
    <>
      <TheTableContent
        content={content}
        date={date}
        issue={issue}
        navLink={{
          label: "← Back to Current Issue",
          link: "/the-table/",
        }}
      />
      {previousIssues.length && <TheTableFooter teasers={previousIssues} />}
    </>
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const { headline } = getIssueData(params.slug);

  const title = `The Table: ${headline}`;

  return {
    title,
    openGraph: {
      title,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  const filenames = getIssueFiles();

  return filenames.map((filename) => ({ slug: filename }));
}
