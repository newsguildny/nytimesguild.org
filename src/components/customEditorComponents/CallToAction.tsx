import Link from 'next/link';
import css from 'styled-jsx/css';
import { ReactNode } from 'react';
import { EditorComponentOptions } from 'netlify-cms-core';
import { ArrowIcon } from '../svgs/ArrowIcon';
import { sansSerif, sansSerifSizes } from '../../lib/styles/tokens/fonts';

export const options: EditorComponentOptions = {
  id: 'call-to-action',
  label: 'Call To Action',
  fields: [
    {
      name: 'destination',
      label: 'Destination',
      widget: 'string',
    },
    {
      name: 'content',
      label: 'Content',
      widget: 'string',
    },
  ],
  pattern: /<CallToAction to="([^\s]*)">(.*)<\/CallToAction>/,
  fromBlock: (match) => ({
    destination: match[1],
    content: match[2],
  }),
  toBlock: (data) => `<CallToAction to="${data.destination}">${data.content}</CallToAction>`,
  toPreview: (data) => `<a href="${data.destination}">${data.content}</a>`,
};

const arrowStyles = css.resolve`
  transition: transform 0.3s ease-out;
`;

interface Props {
  to: string;
  children: ReactNode;
}

export function CallToAction({ to, children }: Props) {
  return (
    <>
      <div>
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
      </div>
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
}
