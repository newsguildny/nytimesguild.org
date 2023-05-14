import css from 'styled-jsx/css';
import { ReactNode } from 'react';
import { EditorComponentOptions } from 'netlify-cms-core';
import { ArrowIcon } from '../svgs/ArrowIcon';
import { sansSerif, sansSerifSizes } from '../../lib/styles/tokens/fonts';

export const options: EditorComponentOptions = {
  id: 'download',
  label: 'Download',
  fields: [
    {
      name: 'source',
      label: 'Source',
      widget: 'string',
    },
    {
      name: 'content',
      label: 'Content',
      widget: 'string',
    },
  ],
  pattern: /<Download to="([^\s]*)">(.*)<\/Download>/,
  fromBlock: (match) => ({
    destination: match[1],
    content: match[2],
  }),
  toBlock: (data) => `<Download to="${data.source}">${data.content}</Download>`,
  toPreview: (data) => `<a href="${data.source}">${data.content}</a>`,
};

const arrowStyles = css.resolve`
  transition: transform 0.3s ease-out;
`;

interface Props {
  to: string;
  children: ReactNode;
}

export function Download({ to, children }: Props) {
  return (
    <>
      <div>
        {/* Download expects downloadable links. */}
        <a href={to} type="text/calendar" download>
          {children}
          <ArrowIcon className={arrowStyles.className} />
        </a>
      </div>
      <style jsx>{`
        a {
          font-family: ${sansSerif};
          display: block;
          margin: 3rem 0 6rem 0;
          width: max-content;
          max-width: calc(100% - 4rem);
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
