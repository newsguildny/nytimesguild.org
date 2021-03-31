import { EditorComponentOptions } from 'netlify-cms-core';
import { useStaticContext } from '../../staticContext/useStaticContext';
import Testimonial, { TestimonialContent } from '../Testimonial';
import CallToAction from './CallToAction';

export const options: EditorComponentOptions = {
  id: 'highlighted-testimonials',
  label: 'Highlighted Testimonials',
  fields: [],
  pattern: /<HighlightedTestimonials \/>/,
  fromBlock: () => ({}),
  toBlock: () => `<HighlightedTestimonials />`,
  toPreview: () => `<p><strong>Highlighted Testimonials Block</strong></p>`,
};

export const staticContextKey = 'highlightedTestimonials';

export type StaticContextType = TestimonialContent[];

const HighlightedTestimonials = () => {
  const testimonials = useStaticContext<StaticContextType>(staticContextKey);
  return (
    <>
      {testimonials?.map((testimonial) => (
        <Testimonial key={testimonial.name} testimonial={testimonial} />
      ))}
      <div>
        <CallToAction to="/testimonials">Read more testimonials</CallToAction>
      </div>
    </>
  );
};

export default HighlightedTestimonials;
