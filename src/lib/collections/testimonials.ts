import fs from 'fs';
import path from 'path';
import { getMarkdownData } from '../mdx/read';
import { TestimonialData } from '../../components/Testimonial';

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

export function getTestimonialData(filename: string) {
  const markdownData = getMarkdownData<TestimonialData>('testimonials', filename);
  return {
    filename: markdownData.data.filename,
    name: markdownData.data.name,
    role: markdownData.data.role,
    highlight: markdownData.data.highlight,
    ...(markdownData.data.headshot && { headshot: markdownData.data.headshot }),
    content: markdownData.content,
  };
}

export function getTestimonialsData() {
  return getTestimonialsFilenames().map((filename) => getTestimonialData(filename));
}
