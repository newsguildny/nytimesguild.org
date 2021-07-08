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
  return fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'theTable'))
    .map((issue) => issue.slice(0, issue.length - 4));
}

export function getLatestIssueFile() {
  const allFilenames = getIssueFiles();

  allFilenames.sort((a, b) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });

  return allFilenames.slice(0, 1);
}

export async function getIssueData(filename: string, staticContext?: StaticContextValue) {
  const markdownData = getMarkdownData<IssueData>('theTable', filename);
  const mdxSource = await renderToString(markdownData.content, {
    components,
    staticContext,
  });
  const formattedDate = new Date(markdownData.data.date).toString().slice(3, 15);

  return {
    date: formattedDate,
    headline: markdownData.data.headline,
    issue: markdownData.data.issue,
    slug: markdownData.data.slug,
    context: 'the-table',
    source: mdxSource,
  };
}

export function getLatestIssue() {
  const [latestIssue] = getLatestIssueFile();
  return getIssueData(latestIssue);
}
