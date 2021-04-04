import fs from 'fs';
import path from 'path';
import { renderToString } from '../mdx/renderToString';
import { getMarkdownData } from '../mdx/read';
import { components } from '../../components/customEditorComponents';
import { TestimonialContent, TestimonialData } from '../../components/Testimonial';

export function getTestimonialsFilenames() {
  return fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'testimonials'))
    .map((paper) => paper.slice(0, paper.length - 4));
}

export function getTestimonialsMetadata() {
  return getTestimonialsFilenames().map(
    (slug) => getMarkdownData<TestimonialData>('testimonials', slug).data
  );
}

export async function getTestimonialData(filename: string) {
  const markdownData = getMarkdownData<TestimonialData>('testimonials', filename);
  const mdxSource = await renderToString(markdownData.content, {
    components,
  });
  return {
    filename: markdownData.data.filename,
    name: markdownData.data.name,
    role: markdownData.data.role,
    highlight: markdownData.data.highlight,
    headshot: markdownData.data.headshot,
    source: mdxSource,
  };
}

export async function getTestimonialsData() {
  return Promise.all(getTestimonialsFilenames().map((filename) => getTestimonialData(filename)));
}

export async function getHighlightedTestimonialsData(): Promise<TestimonialContent[]> {
  const allTestimonialsMetadata = getTestimonialsMetadata();
  const highlightedTestimonialsMetadata = allTestimonialsMetadata.filter(
    (testimonial) => testimonial.highlight
  );
  return Promise.all(
    highlightedTestimonialsMetadata.map(({ filename }) => getTestimonialData(filename))
  );
}
