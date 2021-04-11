import { EditorComponentOptions } from 'netlify-cms-core';
import { useStaticContext } from '../../lib/staticContext/useStaticContext';
import { Testimonial } from '../Testimonial';
import { CallToAction } from './CallToAction';

export const options: EditorComponentOptions = {
  id: 'highlighted-testimonials',
  label: 'Highlighted Testimonials',
  fields: [],
  pattern: /<HighlightedTestimonials \/>/,
  fromBlock: () => ({}),
  toBlock: () => `<HighlightedTestimonials />`,
  toPreview: () => `<p><strong>Highlighted Testimonials Block</strong></p>`,
};

export function HighlightedTestimonials() {
  const { highlightedTestimonials } = useStaticContext();
  return (
    <>
      {highlightedTestimonials?.map((testimonial) => (
        <Testimonial key={testimonial.name} testimonial={testimonial} />
      ))}
      <CallToAction to="/testimonials">Read more testimonials</CallToAction>
    </>
  );
}
