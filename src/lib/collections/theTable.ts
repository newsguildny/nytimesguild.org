import fs from "fs";
import path from "path";
import { getMarkdownData } from "../mdx/read";

export interface IssueData {
  date: string;
  filename: string;
  headline: string;
  issue: string;
  slug: string;
  thumbnail?: string;
}

export function getIssueFiles() {
  const files = fs
    .readdirSync(path.join(process.cwd(), "src", "markdown", "theTable"))
    .map((issue) => issue.slice(0, issue.length - 4));

  files.sort((a, b) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });

  return files;
}

export function getLatestIssueFile() {
  return getIssueFiles().slice(0, 1);
}

const formatMarkdownData = (filename: string) => {
  const markdownData = getMarkdownData<IssueData>("theTable", filename);
  const formattedDate = new Date(markdownData.data.date)
    .toString()
    .slice(3, 15);

  return { markdownData, formattedDate };
};

export function getIssueData(filename: string) {
  const { markdownData, formattedDate } = formatMarkdownData(filename);

  return {
    date: formattedDate,
    headline: markdownData.data.headline,
    issue: markdownData.data.issue,
    slug: filename,
    context: "the-table",
    content: markdownData.content,
  };
}

export function getTeaserData(filename: string) {
  const { markdownData, formattedDate } = formatMarkdownData(filename);

  return {
    date: formattedDate,
    headline: markdownData.data.headline,
    issue: markdownData.data.issue,
    slug: filename,
    thumbnail: markdownData.data.thumbnail,
  };
}

export function getLatestIssue() {
  const [latestIssue] = getLatestIssueFile();
  return getIssueData(latestIssue);
}

export function getPreviousIssues(selectedIssue?: string) {
  const previousIssueFiles = getIssueFiles()
    .slice(1)
    .filter((file) => {
      return file !== selectedIssue;
    });

  return previousIssueFiles.map(getTeaserData);
}
