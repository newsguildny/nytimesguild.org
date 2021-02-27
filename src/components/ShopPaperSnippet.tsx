import Link from 'next/link';
import css from 'styled-jsx/css';
import { ShopPaperContent } from '../lib/papers';
import ArrowIcon from './icons/ArrowIcon';

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
      <h4>{paper.headline}</h4>
      <p>{paper.snippet}</p>
      <Link href={`/papers/${paper.slug}`}>
        <a>
          Continue Reading <ArrowIcon className={arrowStyles.className} />
        </a>
      </Link>
      <style jsx>{`
        h4 {
          font-family: Public Sans;
          font-weight: 700;
          font-size: 1.5rem;
          color: #666;
        }

        p {
          font-family: Crimson Pro;
          font-size: 1.5rem;
          color: #666;
        }

        a {
          display: flex;
          width: max-content;
          font-family: Public Sans;
          font-weight: 600;
          font-size: 1rem;
          color: #666;
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
