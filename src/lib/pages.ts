import fs from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import { getMarkdownData, MarkdownSource } from './markdown';

export function getPageTitles() {
  return fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'pages'))
    .map((page) => page.slice(0, page.length - 4));
}

interface PageData {
  title: string;
}

export type PageContent = PageData & MarkdownSource;

export async function getPageData(slug: string) {
  const markdownData = getMarkdownData<PageData>('pages', slug);
  const mdxSource = await renderToString(markdownData.content);
  return {
    title: markdownData.data.title,
    source: mdxSource,
  };
}
