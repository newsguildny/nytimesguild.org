import Link from 'next/link';
import { useState } from 'react';
import css from 'styled-jsx/css';
import Burger from './Burger';

const burgerStyles = css.resolve`
  display: block;
  position: absolute;
  top: 1.5rem;
  right: 0;

  @media (min-width: 769px) {
    display: none;
  }
`;

interface Props {
  activeSlug: string;
  pagesMetadata: Array<{ slug: string; title: string }>;
}

export default function Navigation({ activeSlug, pagesMetadata }: Props) {
  const [isNavShown, setIsNavShown] = useState(false);
  return (
    <>
      <nav>
        <Link href="/">
          <a>NYT Tech Workers</a>
        </Link>
        <ul className={isNavShown ? 'shown' : ''}>
          {pagesMetadata?.map((pageMetadata) => (
            <li key={pageMetadata.slug}>
              <Link href={`/${pageMetadata.slug}`}>
                <a className={activeSlug === pageMetadata.slug ? 'active' : ''}>
                  {pageMetadata.title}
                </a>
              </Link>
            </li>
          ))}
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
            position: sticky;
            top: 0;
            padding: 1.125rem 0 1.25rem;
            border-bottom: 0.125rem solid #dedede;
            background: white;
            font-family: Public Sans;
            font-size: 1.5rem;
            font-weight: normal;
            line-height: 1.875rem;
            color: #666;
            text-decoration: none;
            z-index: 1;
          }
          ul {
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
            margin: 0.5rem 0;
          }
          li:last-child {
            margin: 0;
          }
          a {
            text-decoration: none;
            color: #222;
            width: max-content;
          }
          li > a {
            display: block;
            width: 100%;
            padding: 0.5rem 0;
            font-size: 1rem;
            line-height: 1.25rem;
            color: #666;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          li > a.active {
            font-weight: 600;
            color: #222;
          }
          li > a:hover {
            color: #222;
          }

          @media (min-width: 769px) {
            nav {
              flex-direction: row;
              padding: 1.875rem 0 1.875rem;
            }
            ul {
              display: block;
              margin: 0;
            }
            li {
              display: inline-block;
              margin: 0 1.875rem 0 0;
            }
            li:last-child {
              margin-right: 0;
            }
            li > a {
              padding: 0;
            }
          }
        `}
      </style>
      {burgerStyles.styles}
    </>
  );
}
