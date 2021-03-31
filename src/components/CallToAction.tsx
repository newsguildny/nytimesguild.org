import Link from 'next/link';
import css from 'styled-jsx/css';
import { FC } from 'react';
import ArrowIcon from './svgs/ArrowIcon';
import { sansSerif, sansSerifSizes } from '../styles/tokens/fonts';

const arrowStyles = css.resolve`
  transition: transform 0.3s ease-out;
`;

interface Props {
  to: string;
}

const CallToAction: FC<Props> = ({ to, children }) => (
  <>
    {/* CallToActions can point to internal or external links.
        If links are external, then we can't use next/link. */}
    {to.includes('://') ? (
      <a href={to}>
        {children}
        <ArrowIcon className={arrowStyles.className} />
      </a>
    ) : (
      <Link href={to} passHref>
        <a>
          {children}
          <ArrowIcon className={arrowStyles.className} />
        </a>
      </Link>
    )}
    <style jsx>{`
      a {
        font-family: ${sansSerif};
        display: block;
        margin: 3rem 0 6rem 0;
        width: max-content;
        padding: 1rem 1.5rem;
        border: 2px solid #dedede;
        font-size: ${sansSerifSizes.large};
        line-height: 1.875rem;
        color: #666;
        text-decoration: none;
        transition: color 0.3s;
        transition: border 0.3s;
      }

      a:hover {
        border-color: #666;
        color: #222;
      }

      a:hover > :global(svg) {
        transform: translateX(2.5rem);
      }
    `}</style>
    {arrowStyles.styles}
  </>
);

export default CallToAction;
