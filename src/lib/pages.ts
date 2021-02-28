import fs from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import rehypeSlug from 'rehype-slug';
import { getMarkdownData, MarkdownSource } from './markdown';
import Navigation from '../components/Navigation';
import CallToAction from '../components/CallToAction';

interface PageData {
  slug: string;
  title: string;
  heading?: string;
  subheading?: string;
}

export function getPageSlugs() {
  return fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'pages'))
    .map((page) => page.slice(0, page.length - 4));
}

export function getPagesMetadata() {
  return getPageSlugs().map((slug) => getMarkdownData<PageData>('pages', slug).data);
}

export type PageContent = PageData & MarkdownSource;

export async function getPageData(slug: string) {
  const markdownData = getMarkdownData<PageData>('pages', slug);
  const mdxSource = await renderToString(markdownData.content, {
    components: { Navigation, CallToAction },
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  });
  return {
    title: markdownData.data.title,
    slug: markdownData.data.slug,
    heading: markdownData.data.heading,
    subheading: markdownData.data.subheading,
    source: mdxSource,
  };
}
