import fs from 'fs';
import path from 'path';
import { renderToString } from '../mdx/renderToString';
import { getMarkdownData, MarkdownSource } from '../mdx/read';
import { components } from '../../components/customEditorComponents';
import { StaticContextValue } from '../staticContext/StaticContext';

interface PageData {
  filename: string;
  slug: string;
  title: string;
  heading?: string;
  subheading?: string;
  showInNavigation: boolean;
  navigationOrder: number;
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

export async function getPageData(filename: string, staticContext?: StaticContextValue) {
  const markdownData = getMarkdownData<PageData>('pages', filename);
  const mdxSource = await renderToString(markdownData.content, {
    components,
    staticContext,
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

export const getNavigationData = async (slug?: string) => ({
  activeSlug: slug ?? null,
  pagesMetadata: getPagesMetadata()
    .filter(({ showInNavigation }) => showInNavigation)
    .sort((first, second) => {
      if (first.navigationOrder < second.navigationOrder) return -1;
      if (first.navigationOrder > second.navigationOrder) return 1;
      return 0;
    }),
});
