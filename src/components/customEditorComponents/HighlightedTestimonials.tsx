import { EditorComponentOptions } from 'netlify-cms-core';
import { MdxRemote } from 'next-mdx-remote/types';
import { StaticContextKey, useStaticContext } from '../../lib/staticContext/StaticContext';
import { Testimonial } from '../Testimonial';
import { CallToAction } from './CallToAction';

export const options: EditorComponentOptions = {
  id: 'highlighted-testimonials',
  label: 'Highlighted Testimonials',
  fields: [
    {
      name: 'category',
      label: 'Category',
      widget: 'select',
      options: ['why-union', 'dei'],
    },
  ],
  pattern: /<HighlightedTestimonials category="([a-z-]*)" \/>/,
  fromBlock: (match) => ({ category: match?.[1] }),
  toBlock: ({ category }) => `<HighlightedTestimonials category="${category}" />`,
  toPreview: () => `<p><strong>Highlighted Testimonials Block</strong></p>`,
};

interface Props {
  category: string;
}

export function HighlightedTestimonials({ category }: Props) {
  // eslint-disable-next-line no-use-before-define
  const highlightedTestimonials = useStaticContext(staticContextKey);
  return (
    <>
      {highlightedTestimonials
        ?.filter((testimonial) => testimonial.category === category)
        .map((testimonial) => (
          <Testimonial key={testimonial.name} testimonial={testimonial} />
        ))}
      <CallToAction to={`/testimonials/${category}/`}>Read more testimonials</CallToAction>
    </>
  );
}

export const staticContextKey = new StaticContextKey<
  Array<{
    source: MdxRemote.Source;
    headshot?: string | undefined;
    category: string;
    filename: string;
    name: string;
    role: string;
    highlight: boolean;
  }>
>('HighlightedTestimonials');
