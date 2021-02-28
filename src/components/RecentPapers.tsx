import { ShopPaperContent } from '../lib/papers';
import ShopPaperSnippet from './ShopPaperSnippet';
import { Heading2 } from './Markdown';
import { rule } from '../styles/tokens/colors';

interface Props {
  papers: ShopPaperContent[];
}

const RecentPapers = ({ papers }: Props) => (
  <>
    <hr />
    <aside>
      <Heading2>Guild updates</Heading2>
      {papers.map((paper) => (
        <ShopPaperSnippet key={paper.slug} paper={paper} />
      ))}
    </aside>
    <style jsx>{`
      hr {
        border: ${rule} solid 0.25rem;
        margin-top: 5.375rem;
      }

      aside {
        padding: 2.25rem 2rem;
      }

      @media (min-width: 769px) {
        aside {
          padding: 3.5rem 5rem;
          max-width: 57rem;
        }
      }
    `}</style>
  </>
);

export default RecentPapers;
