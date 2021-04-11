import { EditorComponentOptions } from 'netlify-cms-core';
import { ShopPaperSnippet } from '../ShopPaperSnippet';
import { secondaryBackground } from '../../lib/styles/tokens/colors';
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

export function RecentPapers() {
  const { recentPapers } = useStaticContext();
  return (
    <>
      <hr className="recent-papers-rule" />
      <aside>
        <h2>Guild updates</h2>
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
