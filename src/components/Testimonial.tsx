import { useHydratedMdx } from '../lib/mdx/hydrate';
import { sansSerif, sansSerifSizes } from '../lib/styles/tokens/fonts';
import { MarkdownSource } from '../lib/mdx/read';

export interface TestimonialData {
  filename: string;
  name: string;
  role: string;
  highlight: boolean;
  headshot?: string;
}

export type TestimonialContent = TestimonialData & MarkdownSource;

interface Props {
  testimonial: TestimonialContent;
}

export function Testimonial({ testimonial }: Props) {
  const content = useHydratedMdx(testimonial.source);
  return (
    <>
      <div className={`container ${testimonial.headshot ? '' : 'no-headshot'}`}>
        {testimonial.headshot && <img src={testimonial.headshot} alt="" />}
        <div className="text-container">
          {content}
          <div>
            <strong>
              {testimonial.name}
              {testimonial.role && `, ${testimonial.role}`}
            </strong>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.medium};
          margin-bottom: 2rem;
        }

        .text-container :global(p) {
          margin-bottom: 0.5rem;
        }

        img {
          width: 120px;
          margin: 0 0 1rem 0.25rem;
          border-radius: 50%;
          float: right;
          shape-outside: circle(50%);
        }

        @media (min-width: 769px) {
          .container {
            display: flex;
            flex-direction: row-reverse;
            align-items: flex-start;
          }

          img {
            margin-top: 1rem;
            margin-left: 0;
          }

          .container.no-headshot {
            display: block;
          }

          .text-container {
            display: flex;
            flex-direction: column;
            padding-right: 2rem;
          }

          .container.no-headshot .text-container {
            width: calc(100% - 2rem - 120px);
          }
        }
      `}</style>
    </>
  );
}
