import fs from 'fs';
import path from 'path';
import { getMarkdownData } from '../mdx/read';
import { StaticContextValue } from '../staticContext/StaticContext';
import { renderToString } from '../mdx/renderToString';
import { components } from '../../components/customEditorComponents';

export interface IssueData {
  date: string;
  filename: string;
  headline: string;
  issue: string;
  slug: string;
}

export function getIssueFiles() {
  const files = fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'theTable'))
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
  const markdownData = getMarkdownData<IssueData>('theTable', filename);
  const formattedDate = new Date(markdownData.data.date).toString().slice(3, 15);

  return { markdownData, formattedDate };
};

export async function getIssueData(filename: string, staticContext?: StaticContextValue) {
  const { markdownData, formattedDate } = formatMarkdownData(filename);

  const mdxSource = await renderToString(markdownData.content, {
    components,
    staticContext,
  });

  return {
    date: formattedDate,
    headline: markdownData.data.headline,
    issue: markdownData.data.issue,
    slug: markdownData.data.slug,
    context: 'the-table',
    source: mdxSource,
  };
}

export async function getTeaserData(filename: string) {
  const { markdownData, formattedDate } = formatMarkdownData(filename);

  return {
    date: formattedDate,
    headline: markdownData.data.headline,
    issue: markdownData.data.issue,
    slug: markdownData.data.slug,
  };
}

export function getLatestIssue() {
  const [latestIssue] = getLatestIssueFile();
  return getIssueData(latestIssue);
}

export async function getPreviousIssues() {
  const previousIssueFiles = getIssueFiles().slice(1);

  return previousIssueFiles.map(async (file: string) => {
    const teaserData = await getTeaserData(file);
    return teaserData;
  });
}
