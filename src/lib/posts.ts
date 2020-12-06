import fs from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import { getMarkdownData, MarkdownSource } from './markdown';

export interface PostData {
  date: string;
  title: string;
  slug: string;
  tags?: string[];
  author: string;
}

export type PostContent = PostData & MarkdownSource;

export function getPostSlugs() {
  return fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'posts'))
    .map((page) => page.slice(0, page.length - 4));
}

export async function getPostData(slug: string) {
  const markdownData = getMarkdownData<PostData>('posts', slug);
  const mdxSource = await renderToString(markdownData.content);
  return {
    title: markdownData.data.title,
    date: markdownData.data.date,
    slug: markdownData.data.slug,
    tags: markdownData.data.tags,
    author: markdownData.data.author,
    source: mdxSource,
  };
}

export async function getPostsData() {
  const slugs = getPostSlugs();
  return Promise.all(slugs.map((slug) => getPostData(slug).then(({ source, ...data }) => data)));
}
