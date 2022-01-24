import css from 'styled-jsx/css';
import { useHydratedMdx } from '../lib/mdx/hydrate';
import { sansSerif, sansSerifSizes } from '../lib/styles/tokens/fonts';
import { MarkdownSource } from '../lib/mdx/read';
import { TGuild } from './svgs/TGuild';
import { headerBackground } from '../lib/styles/tokens/colors';

const tGuildStyles = css.resolve`
  top: calc(50% - (3.875rem / 2));
  left: calc(50% - (4.25rem / 2));

  @media (min-width: 769px) {
    top: calc(50% - (6rem / 2));
    left: calc(50% - (6.625rem / 2));
  }
`;

export interface TestimonialData {
  category: string;
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
      <div className="container">
        {testimonial.headshot ? (
          <img src={testimonial.headshot} alt="" />
        ) : (
          <div className="tguild-wrapper">
            <TGuild className={tGuildStyles.className} />
          </div>
        )}
        <div className="text-container">
          <h4>
            {testimonial.name}
            {testimonial.role && `, ${testimonial.role}`}
          </h4>
          {content}
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.medium};
          margin-bottom: 2rem;
          clear: right;
        }

        h4 {
          margin: 0;
        }

        .text-container :global(p) {
          margin-top: 0.5rem;
        }

        .tguild-wrapper {
          background-color: ${headerBackground};
          flex-shrink: 0;
        }

        img,
        .tguild-wrapper {
          width: 5.25rem;
          height: 5.25rem;
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

          img,
          .tguild-wrapper {
            width: 7.5rem;
            height: 7.5rem;
            margin-left: 0;
          }

          .text-container {
            display: flex;
            flex-direction: column;
            padding-right: 2rem;
          }
        }
      `}</style>
      {tGuildStyles.styles}
    </>
  );
}
