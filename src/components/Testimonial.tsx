import hydrate from 'next-mdx-remote/hydrate';
import { TestimonialContent } from '../lib/testimonials';
import { sansSerif, sansSerifSizes } from '../styles/tokens/fonts';

interface Props {
  testimonial: TestimonialContent;
}

const Testimonial = ({ testimonial }: Props) => {
  const content = hydrate(testimonial.source);
  return (
    <>
      <div className="container">
        <div className="text-container">
          {content}
          <p>
            <strong>
              {testimonial.name}, {testimonial.role}
            </strong>
          </p>
        </div>
        <div>
          <img src={testimonial.headshot} alt="" />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.medium};
        }

        .text-container {
          display: flex;
          flex-direction: column;
          padding-right: 2rem;
        }

        img {
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};

export default Testimonial;
