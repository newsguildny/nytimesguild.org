import Link from 'next/link';
import { useState } from 'react';
import css from 'styled-jsx/css';
import TGuild from './svgs/TGuild';
import Burger from './Burger';
import { headerBackground, headerText } from '../styles/tokens/colors';
import { sansSerif, sansSerifSizes, serif, serifSizes } from '../styles/tokens/fonts';
import { useStaticContext } from '../staticContext/useStaticContext';

const burgerStyles = css.resolve`
  display: block;
  position: absolute;
  top: 2.5rem;
  right: 2rem;

  @media (min-width: 769px) {
    display: none;
  }
`;

export interface StaticContextType {
  activeSlug: string;
  pagesMetadata: Array<{ slug: string; title: string }>;
}

export const staticContextKey = 'navigation';

export default function Navigation() {
  const staticContext = useStaticContext<StaticContextType>(staticContextKey);
  const [isNavShown, setIsNavShown] = useState(false);
  return (
    <>
      <nav>
        <Link href="/">
          <a>
            <TGuild />
          </a>
        </Link>
        <ul className={isNavShown ? 'shown' : ''}>
          {staticContext?.pagesMetadata?.map((pageMetadata) => (
            <li key={pageMetadata.slug}>
              <Link href={`/${pageMetadata.slug}`}>
                <a className={staticContext?.activeSlug === pageMetadata.slug ? 'active' : ''}>
                  {pageMetadata.title}
                </a>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/papers">
              <a className={staticContext?.activeSlug === 'papers' ? 'active' : ''}>Updates</a>
            </Link>
          </li>
        </ul>
        <Burger
          className={burgerStyles.className}
          active={isNavShown}
          onClick={() => setIsNavShown((oldValue) => !oldValue)}
        />
      </nav>
      <style jsx>
        {`
          nav {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 1.5rem 1.5rem 0;
            background: white;
            font-family: ${serif};
            font-size: ${serifSizes.large};
            font-weight: normal;
            line-height: 1.875rem;
            color: ${headerText};
            background-color: ${headerBackground};
            text-decoration: none;
            z-index: 1;
          }
          ul {
            font-family: ${sansSerif};
            display: none;
            margin: 0.5rem 0 0;
            padding: 0;
            list-style: none;
          }
          ul.shown {
            display: block;
          }
          li {
            display: block;
          }
          li > a {
            display: block;
            width: max-content;
            padding: 0.625rem 0.625rem;
            border-radius: 0.25rem;
            font-size: ${sansSerifSizes.large};
            line-height: 1.25rem;
            color: ${headerText};
            text-decoration: none;
            transition: color 0.3s ease;
          }
          li > a.active {
            background-color: rgba(18, 18, 18, 0.3);
          }
          li > a:hover {
            color: ${headerText};
            background-color: rgba(18, 18, 18, 0.15);
          }

          @media (min-width: 769px) {
            nav {
              padding: 1.5rem 1.5rem;
              flex-direction: row;
              padding: 3.5rem 5rem 2.5rem;
              align-items: center;
            }
            ul {
              display: block;
              margin: 0;
            }
            li {
              display: inline-block;
            }
            li > a {
              font-size: ${sansSerifSizes.small};
            }
          }
        `}
      </style>
      {burgerStyles.styles}
    </>
  );
}
