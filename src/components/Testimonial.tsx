import { useHydratedMdx } from '../lib/mdx/hydrate';
import { sansSerif, sansSerifSizes } from '../lib/styles/tokens/fonts';
import { MarkdownSource } from '../lib/mdx/read';

export interface TestimonialData {
  filename: string;
  name: string;
  role: string;
  highlight: boolean;
  headshot: string;
}

export type TestimonialContent = TestimonialData & MarkdownSource;

interface Props {
  testimonial: TestimonialContent;
}

export function Testimonial({ testimonial }: Props) {
  const content = useHydratedMdx(testimonial.source);
  return (
    <>
      <div className="container">
        {testimonial.headshot && <img src={testimonial.headshot} alt="" />}
        <div className="text-container">
          {content}
          <p>
            <strong>
              {testimonial.name}, {testimonial.role}
            </strong>
          </p>
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.medium};
        }

        img {
          margin: 0 0 1rem 0.5rem;
          border-radius: 50%;
          float: right;
        }

        @media (min-width: 769px) {
          .container {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
          }

          .text-container {
            display: flex;
            flex-direction: column;
            padding-right: 2rem;
          }
        }
      `}</style>
    </>
  );
}
