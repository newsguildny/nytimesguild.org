import Link from 'next/link';
import { useEffect, useState } from 'react';
import css from 'styled-jsx/css';
import { TGuild } from './svgs/TGuild';
import { Burger } from './Burger';
import { headerBackground, headerText } from '../lib/styles/tokens/colors';
import { sansSerif, sansSerifSizes, serif, serifSizes } from '../lib/styles/tokens/fonts';
import type { PageData } from '../lib/collections/pages';

const burgerStyles = css.resolve`
  button {
    display: block;
    position: absolute;
    top: 2.5rem;
    right: 2rem;
  }

  @media (min-width: 769px) {
    button {
      display: none;
    }
  }
`;

interface Props {
  slug?: string;
  pagesMetadata?: PageData[];
}

export function Navigation({ slug, pagesMetadata }: Props) {
  const [isNavShown, setIsNavShown] = useState(false);

  useEffect(() => {
    const escapeKeyListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsNavShown(false);
      }
    };
    document.addEventListener('keydown', escapeKeyListener);
    return () => document.removeEventListener('keydown', escapeKeyListener);
  }, []);

  useEffect(() => {
    setIsNavShown(false);
  }, [slug]);

  return (
    <>
      <nav
        className={isNavShown ? 'shown' : ''}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as HTMLElement)) {
            setIsNavShown(false);
          }
        }}
      >
        <Link href="/">
          <a aria-label="Home">
            <TGuild />
          </a>
        </Link>
        <Burger
          className={burgerStyles.className}
          active={isNavShown}
          onClick={() => setIsNavShown((oldValue) => !oldValue)}
        />
        <ul>
          {pagesMetadata?.map((pageMetadata) => (
            <li key={pageMetadata.slug}>
              <Link href={`/${pageMetadata.slug}/`}>
                <a className={slug === pageMetadata.slug ? 'active' : ''}>{pageMetadata.title}</a>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/tech-vote-count/">
              <a className={slug === 'tech-vote-count' ? 'active' : ''}>Vote Count</a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>
        {`
          nav {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            padding: 1.5rem;
            background: white;
            font-family: ${serif};
            font-size: ${serifSizes.extraLarge};
            font-weight: normal;
            line-height: 1.875rem;
            color: ${headerText};
            background-color: ${headerBackground};
            text-decoration: none;
            z-index: 1;
          }
          nav.shown {
            box-shadow: 0 0 0 10000px rgba(20, 20, 20, 0.4);
          }
          ul {
            font-family: ${sansSerif};
            display: none;
            margin: 1.5rem 0;
            padding: 0;
            list-style: none;
          }
          nav.shown > ul {
            display: block;
          }
          li {
            display: block;
            margin-bottom: 0.5rem;
          }
          li:last-child {
            margin-bottom: 0;
          }
          a {
            width: max-content;
          }
          li > a {
            display: block;
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
              box-shadow: 0;
            }
            ul {
              display: block;
              margin: 0;
            }
            li {
              display: inline-block;
              margin-right: 0.5rem;
            }
            li:last-child {
              margin-right: 0;
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
