import fs from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import rehypeSlug from 'rehype-slug';
import { getMarkdownData, MarkdownSource } from './markdown';
import Navigation from '../components/Navigation';
import CallToAction from '../components/CallToAction';
import YouTube from '../components/YouTube';

interface ShopPaperData {
  filename: string;
  slug: string;
  headline: string;
  snippet: string;
}

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

export type ShopPaperContent = ShopPaperData & MarkdownSource;

export async function getPaperData(filename: string) {
  const markdownData = getMarkdownData<ShopPaperData>('papers', filename);
  const mdxSource = await renderToString(markdownData.content, {
    components: { Navigation, CallToAction, YouTube },
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  });
  return {
    filename,
    headline: markdownData.data.headline,
    slug: markdownData.data.slug,
    snippet: markdownData.data.snippet,
    source: mdxSource,
  };
}

export async function getPapersData() {
  return Promise.all(getPapersFilenames().map((filename) => getPaperData(filename)));
}

export async function getRecentPapersData() {
  return Promise.all(getRecentPapersFilenames().map((filename) => getPaperData(filename)));
}
