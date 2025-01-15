import {
  getTestimonialData,
  getTestimonialsMetadata,
} from "../../lib/collections/testimonials";
import { Testimonial } from "../Testimonial";
import { CallToAction } from "./CallToAction";

interface Props {
  category: string;
}

export function HighlightedTestimonials({ category }: Props) {
  const allTestimonialsMetadata = getTestimonialsMetadata();
  const highlightedTestimonialsMetadata = allTestimonialsMetadata.filter(
    (testimonial) => testimonial.highlight,
  );
  const highlightedTestimonials = highlightedTestimonialsMetadata.map(
    ({ filename }) => getTestimonialData(filename),
  );
  return (
    <>
      {highlightedTestimonials
        ?.filter((testimonial) => testimonial.category === category)
        .map((testimonial) => (
          <Testimonial key={testimonial.name} testimonial={testimonial} />
        ))}
      <CallToAction to={`/testimonials/${category}/`}>
        Read more testimonials
      </CallToAction>
    </>
  );
}
