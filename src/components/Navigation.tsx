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
  pagesMetadata: Array<{ slug: string; title: string }>;
}

export default function Navigation({ pagesMetadata }: Props) {
  const [isNavShown, setIsNavShown] = useState(false);
  return (
    <>
      <nav>
        <div>NYT tech workers</div>
        <ul className={isNavShown ? 'shown' : ''}>
          {pagesMetadata?.map((pageMetadata) => (
            <li key={pageMetadata.slug}>
              <Link href={`/${pageMetadata.slug}`}>
                <a>{pageMetadata.title}</a>
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
          }
          ul {
            display: none;
            margin: 0;
            padding: 0;
            list-style: none;
          }
          ul.shown {
            display: block;
          }
          li {
            display: block;
            margin-top: 1rem;
          }
          li:last-child {
            margin-right: 0;
          }
          a {
            font-size: 1rem;
            line-height: 1.25rem;
            color: #666;
            text-decoration: none;
          }

          @media (min-width: 769px) {
            nav {
              flex-direction: row;
              padding: 1.875rem 0 1.875rem;
            }
            ul {
              display: block;
            }
            li {
              display: inline-block;
              margin-top: 0;
              margin-right: 1.875rem;
            }
          }
        `}
      </style>
      {burgerStyles.styles}
    </>
  );
}
