import fs from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import rehypeSlug from 'rehype-slug';
import { getMarkdownData, MarkdownSource } from './markdown';
import Navigation from '../components/Navigation';
import CallToAction from '../components/CallToAction';

interface ShopPaperData {
  slug: string;
  headline: string;
  snippet: string;
}

export function getPaperSlugs() {
  return fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'papers'))
    .map((paper) => paper.slice(0, paper.length - 4));
}

export function getPapersMetadata() {
  return getPaperSlugs().map((slug) => getMarkdownData<ShopPaperData>('papers', slug).data);
}

export type ShopPaperContent = ShopPaperData & MarkdownSource;

export async function getPaperData(slug: string) {
  const markdownData = getMarkdownData<ShopPaperData>('papers', slug);
  const mdxSource = await renderToString(markdownData.content, {
    components: { Navigation, CallToAction },
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  });
  return {
    headline: markdownData.data.headline,
    slug: markdownData.data.slug,
    snippet: markdownData.data.snippet,
    source: mdxSource,
  };
}

export async function getPapersData() {
  return Promise.all(getPaperSlugs().map((slug) => getPaperData(slug)));
}
