import fs from 'fs';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import rehypeSlug from 'rehype-slug';
import { getMarkdownData } from './markdown';
import { components } from './customEditorComponents';
import { TestimonialData } from '../components/Testimonial';

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
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  });
  return {
    filename: markdownData.data.filename,
    name: markdownData.data.name,
    role: markdownData.data.role,
    highlighted: markdownData.data.highlight,
    headshot: markdownData.data.headshot,
    source: mdxSource,
  };
}

export async function getTestimonialsData() {
  return Promise.all(getTestimonialsFilenames().map((filename) => getTestimonialData(filename)));
}

export async function getHighlightedTestimonialsData() {
  const allTestimonialsMetadata = getTestimonialsMetadata();
  const highlightedTestimonialsMetadata = allTestimonialsMetadata.filter(
    (testimonial) => testimonial.highlight
  );
  return Promise.all(
    highlightedTestimonialsMetadata.map(({ filename }) => getTestimonialData(filename))
  );
}
