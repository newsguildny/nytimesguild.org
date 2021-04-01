import { EditorComponentOptions } from 'netlify-cms-core';
import { ShopPaperSnippet, ShopPaperContent } from '../ShopPaperSnippet';
import { rule } from '../../lib/styles/tokens/colors';
import { useStaticContext } from '../../lib/staticContext/useStaticContext';

export const options: EditorComponentOptions = {
  id: 'recent-papers',
  label: 'Recent Shop Papers',
  fields: [],
  pattern: /<RecentPapers \/>/,
  fromBlock: () => ({}),
  toBlock: () => `<RecentPapers />`,
  toPreview: () => `<p><strong>Recent Shop Papers Block</strong></p>`,
};

export type StaticContextType = ShopPaperContent[];

export const staticContextKey = 'recentPapers';

export function RecentPapers() {
  const papers = useStaticContext<StaticContextType>(staticContextKey);
  return (
    <>
      <hr />
      <aside>
        <h2>Guild updates</h2>
        {papers?.map((paper) => (
          <ShopPaperSnippet key={paper.slug} paper={paper} />
        ))}
      </aside>
      <style jsx>{`
        hr {
          border: ${rule} solid 0.25rem;
          margin-top: 5.375rem;
          padding: 0;
          max-width: 100%;
        }

        aside {
          padding: 2.25rem 2rem;
        }

        @media (min-width: 769px) {
          aside {
            padding: 0 5rem 3.5rem;
            max-width: 47rem;
          }
        }
      `}</style>
    </>
  );
}
