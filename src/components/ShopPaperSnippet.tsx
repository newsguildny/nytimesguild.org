import Link from 'next/link';
import css from 'styled-jsx/css';
import { bodyText, secondaryHeadingText } from '../lib/styles/tokens/colors';
import { sansSerif, sansSerifSizes, serif, serifSizes } from '../lib/styles/tokens/fonts';
import { ArrowIcon } from './svgs/ArrowIcon';
import { MarkdownSource } from '../lib/mdx/read';

const arrowStyles = css.resolve`
  margin-top: 0.125rem;
  height: 1rem;
  width: 2rem;
  transition: transform 0.3s ease-out;
`;

export interface ShopPaperData {
  filename: string;
  slug: string;
  headline: string;
  snippet: string;
}

export type ShopPaperContent = ShopPaperData & MarkdownSource;

interface Props {
  paper: ShopPaperData;
}

export function ShopPaperSnippet({ paper }: Props) {
  return (
    <>
      <div className="snippet">
        <h3>{paper.headline}</h3>
        <p>{paper.snippet}</p>
        <Link href={`/papers/${paper.filename}/`}>
          <a>
            Continue Reading <ArrowIcon className={arrowStyles.className} />
          </a>
        </Link>
      </div>
      <style jsx>{`
        .snippet {
          margin: 3rem 0;
        }

        h3 {
          font-family: ${sansSerif};
          font-weight: 700;
          font-size: ${sansSerifSizes.extraLarge};
          color: ${secondaryHeadingText};
        }

        p {
          font-family: ${serif};
          font-size: ${serifSizes.small};
          color: ${bodyText};
        }

        a {
          display: flex;
          width: max-content;
          font-family: ${sansSerif};
          font-weight: 600;
          font-size: ${sansSerifSizes.small};
          color: ${bodyText};
          text-decoration: none;
        }

        a:hover > :global(svg) {
          transform: translateX(1rem);
        }
      `}</style>
      {arrowStyles.styles}
    </>
  );
}
