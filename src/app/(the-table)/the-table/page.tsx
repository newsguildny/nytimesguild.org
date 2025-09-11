import TheTableContent from "src/components/TheTableContent";
import TheTableFooter from "src/components/TheTableFooter";
import {
  getLatestIssue,
  getPreviousIssues,
} from "src/lib/collections/theTable";

export default function TheTable() {
  const latestIssue = getLatestIssue();
  const previousIssues = getPreviousIssues();

  return (
    <>
      <TheTableContent
        content={latestIssue.content}
        date={latestIssue.date}
        issue={latestIssue.issue}
        navLink={{
          label: "← The Times Guild Site",
          link: "/",
        }}
      />
      {previousIssues.length && <TheTableFooter teasers={previousIssues} />}
    </>
  );
}
