import Link from 'next/link';
import css from 'styled-jsx/css';
import { ShopPaperContent } from '../lib/papers';
import { bodyText, secondaryHeadingText } from '../styles/tokens/colors';
import { sansSerif, sansSerifSizes, serif, serifSizes } from '../styles/tokens/fonts';
import ArrowIcon from './svgs/ArrowIcon';

const arrowStyles = css.resolve`
  margin-top: 0.125rem;
  height: 1rem;
  width: 2rem;
  transition: transform 0.3s ease-out;
`;

interface Props {
  paper: ShopPaperContent;
}

const ShopPaperSnippet = ({ paper }: Props) => {
  return (
    <>
      <div className="snippet">
        <h3>{paper.headline}</h3>
        <p>{paper.snippet}</p>
        <Link href={`/papers/${paper.slug}`}>
          <a>
            Continue Reading <ArrowIcon className={arrowStyles.className} />
          </a>
        </Link>
      </div>
      <style jsx>{`
        .snippet {
          margin-bottom: 2rem;
        }

        h3 {
          font-family: ${sansSerif};
          font-weight: 700;
          font-size: 1.5rem;
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
};

export default ShopPaperSnippet;
