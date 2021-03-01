import fs from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import rehypeSlug from 'rehype-slug';
import { getMarkdownData, MarkdownSource } from './markdown';
import CallToAction from '../components/CallToAction';
import YouTube from '../components/YouTube';
import HighlightedTestimonials from '../components/HighlightedTestimonials';
import { FullBleedImage } from '../components/Markdown';

interface PageData {
  filename: string;
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

export async function getPageData(filename: string) {
  const markdownData = getMarkdownData<PageData>('pages', filename);
  const mdxSource = await renderToString(markdownData.content, {
    components: { CallToAction, YouTube, HighlightedTestimonials, FullBleedImage },
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  });
  return {
    filename: markdownData.data.filename,
    title: markdownData.data.title,
    slug: markdownData.data.slug,
    heading: markdownData.data.heading,
    subheading: markdownData.data.subheading,
    source: mdxSource,
  };
}
