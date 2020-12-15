import fs from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import rehypeSlug from 'rehype-slug';
import { getMarkdownData, MarkdownSource } from './markdown';
import Navigation from '../components/Navigation';

interface PageData {
  slug: string;
  title: string;
}

export function getPageTitles() {
  return fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'pages'))
    .map((page) => page.slice(0, page.length - 4));
}

export function getPagesMetadata() {
  return getPageTitles().map((slug) => getMarkdownData<PageData>('pages', slug).data);
}

export type PageContent = PageData & MarkdownSource;

export async function getPageData(slug: string) {
  const markdownData = getMarkdownData<PageData>('pages', slug);
  const mdxSource = await renderToString(markdownData.content, {
    components: { Navigation },
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  });
  return {
    title: markdownData.data.title,
    slug: markdownData.data.slug,
    source: mdxSource,
  };
}
