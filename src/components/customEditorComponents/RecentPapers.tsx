import { EditorComponentOptions } from 'netlify-cms-core';
import { StaticContextKey, useStaticContext } from '../../lib/staticContext/StaticContext';
import { ShopPaperSnippet } from '../ShopPaperSnippet';
import { secondaryBackground } from '../../lib/styles/tokens/colors';

export const options: EditorComponentOptions = {
  id: 'recent-papers',
  label: 'Recent Shop Papers',
  fields: [],
  pattern: /<RecentPapers \/>/,
  fromBlock: () => ({}),
  toBlock: () => `<RecentPapers />`,
  toPreview: () => `<p><strong>Recent Shop Papers Block</strong></p>`,
};

export function RecentPapers() {
  // eslint-disable-next-line no-use-before-define
  const recentPapers = useStaticContext(staticContextKey);
  return (
    <>
      <hr className="recent-papers-rule" />
      <aside>
        <h2>Guild Updates</h2>
        {recentPapers?.map((paper) => (
          <ShopPaperSnippet key={paper.slug} paper={paper} />
        ))}
      </aside>
      <style jsx>{`
        hr.recent-papers-rule {
          border: ${secondaryBackground} solid 0.25rem;
          margin-top: 5.375rem;
          margin-left: 0;
          margin-right: 0;
          max-width: 100%;
        }

        aside {
          padding: 2.25rem 0;
        }

        @media (min-width: 769px) {
          aside {
            padding: 0 0 3.5rem;
            max-width: 47rem;
          }
        }
      `}</style>
    </>
  );
}

export const staticContextKey = new StaticContextKey<
  Array<{
    filename: string;
    headline: string;
    slug: string;
    snippet: string;
    content: string;
  }>
>('RecentPapers');
