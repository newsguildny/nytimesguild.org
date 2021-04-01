import fs from 'fs';
import path from 'path';
import { renderToString } from './renderToString';
import { getMarkdownData } from './markdown';
import { components } from '../components/customEditorComponents';
import { ShopPaperData } from '../components/ShopPaperSnippet';
import { StaticContextValue } from '../staticContext/StaticContext';

export function getPapersFilenames() {
  return fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'papers'))
    .map((paper) => paper.slice(0, paper.length - 4));
}

export function getRecentPapersFilenames() {
  const allFilenames = getPapersFilenames();
  allFilenames.sort((a, b) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });
  return allFilenames.slice(0, 2);
}

export function getPapersMetadata() {
  return getPapersFilenames().map((slug) => getMarkdownData<ShopPaperData>('papers', slug).data);
}

export async function getPaperData(filename: string, staticContext?: StaticContextValue) {
  const markdownData = getMarkdownData<ShopPaperData>('papers', filename);
  const mdxSource = await renderToString(markdownData.content, {
    components,
    staticContext,
  });
  return {
    filename: markdownData.data.filename,
    headline: markdownData.data.headline,
    slug: markdownData.data.slug,
    snippet: markdownData.data.snippet,
    source: mdxSource,
  };
}

export async function getPapersData(staticContext: StaticContextValue) {
  return Promise.all(getPapersFilenames().map((filename) => getPaperData(filename, staticContext)));
}

export async function getRecentPapersData() {
  return Promise.all(getRecentPapersFilenames().map((filename) => getPaperData(filename)));
}
