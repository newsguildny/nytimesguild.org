import fs from 'fs';
import path from 'path';
import { getMarkdownData } from '../mdx/read';
import { ShopPaperData } from '../../components/ShopPaperSnippet';

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
  return allFilenames.slice(0, 3);
}

export function getPapersMetadata() {
  return getPapersFilenames().map((slug) => getMarkdownData<ShopPaperData>('papers', slug).data);
}

export function getPaperData(filename: string) {
  const markdownData = getMarkdownData<ShopPaperData>('papers', filename);
  return {
    filename: markdownData.data.filename,
    headline: markdownData.data.headline,
    slug: markdownData.data.slug,
    snippet: markdownData.data.snippet,
    content: markdownData.content,
  };
}

export function getPapersData() {
  return getPapersFilenames().map((filename) => getPaperData(filename));
}
