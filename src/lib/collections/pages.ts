import fs from "fs";
import path from "path";
import { getMarkdownData } from "../mdx/read";

export interface PageData {
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
    .readdirSync(path.join(process.cwd(), "src", "markdown", "pages"))
    .map((page) => page.slice(0, page.length - 4));
}

export function getPagesMetadata() {
  return getPageSlugs().map(
    (slug) => getMarkdownData<PageData>("pages", slug).data,
  );
}

export function getNavPagesMetadata() {
  return getPagesMetadata()
    .filter(({ showInNavigation }) => showInNavigation)
    .sort((first, second) => {
      if (first.navigationOrder < second.navigationOrder) return -1;
      if (first.navigationOrder > second.navigationOrder) return 1;
      return 0;
    });
}

export function getPageData(filename: string) {
  const markdownData = getMarkdownData<PageData>("pages", filename);
  return {
    filename: markdownData.data.filename,
    title: markdownData.data.title,
    slug: markdownData.data.slug,
    heading: markdownData.data.heading,
    subheading: markdownData.data.subheading,
    content: markdownData.content,
  };
}
