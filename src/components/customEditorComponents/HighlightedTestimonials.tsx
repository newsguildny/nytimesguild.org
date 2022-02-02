import { StaticContextKey, useStaticContext } from 'next-static-context';
import { EditorComponentOptions } from 'netlify-cms-core';
import { Testimonial } from '../Testimonial';
import { CallToAction } from './CallToAction';
import { getTestimonialData, getTestimonialsMetadata } from '../../lib/collections/testimonials';
import { render } from '../../lib/collections/render';

export const options: EditorComponentOptions = {
  id: 'highlighted-testimonials',
  label: 'Highlighted Testimonials',
  fields: [
    {
      name: 'category',
      label: 'Category',
      widget: 'select',
      options: ['why-union', 'dei', 'supporter'],
    },
  ],
  pattern: /<HighlightedTestimonials category="([a-z-]*)" \/>/,
  fromBlock: (match) => ({ category: match?.[1] }),
  toBlock: ({ category }) => `<HighlightedTestimonials category="${category}" />`,
  toPreview: () => `<p><strong>Highlighted Testimonials Block</strong></p>`,
};

export function getStaticContext() {
  const allTestimonialsMetadata = getTestimonialsMetadata();
  const highlightedTestimonialsMetadata = allTestimonialsMetadata.filter(
    (testimonial) => testimonial.highlight
  );
  return Promise.all(
    highlightedTestimonialsMetadata.map(({ filename }) => render(getTestimonialData(filename)))
  );
}

export const staticContextKey = new StaticContextKey<typeof getStaticContext>(
  'highlightedTestimonials'
);

interface Props {
  category: string;
}

export function HighlightedTestimonials({ category }: Props) {
  const highlightedTestimonials = useStaticContext(staticContextKey);
  return (
    <>
      {highlightedTestimonials
        ?.filter((testimonial) => testimonial.category === category)
        .map((testimonial) => (
          <Testimonial key={testimonial.name} testimonial={testimonial} />
        ))}
      <CallToAction to={`/testimonials/${category}`}>Read more testimonials</CallToAction>
    </>
  );
}
