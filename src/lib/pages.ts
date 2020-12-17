import fs from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import rehypeSlug from 'rehype-slug';
import sectionize from 'remark-sectionize';
import { getMarkdownData, MarkdownSource } from './markdown';
import Navigation from '../components/Navigation';
import CallToAction from '../components/CallToAction';

interface PageData {
  slug: string;
  title: string;
  seoHeadline: string;
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
    components: { Navigation, CallToAction },
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [sectionize],
    },
  });
  return {
    title: markdownData.data.title,
    slug: markdownData.data.slug,
    seoHeadline: markdownData.data.seoHeadline,
    source: mdxSource,
  };
}
