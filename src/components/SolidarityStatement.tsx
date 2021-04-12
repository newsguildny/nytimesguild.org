import { useHydratedMdx } from '../lib/mdx/hydrate';
import { sansSerif, sansSerifSizes } from '../lib/styles/tokens/fonts';
import { MarkdownSource } from '../lib/mdx/read';

export interface SolidarityStatementData {
  filename: string;
  name: string;
  highlight: boolean;
  logo?: string;
}

export type SolidarityStatementContent = SolidarityStatementData & MarkdownSource;

interface Props {
  solidarityStatement: SolidarityStatementContent;
}

export function SolidarityStatement({ solidarityStatement }: Props) {
  const content = useHydratedMdx(solidarityStatement.source);
  return (
    <>
      <div className={`container ${solidarityStatement.logo ? '' : 'no-logo'}`}>
        {solidarityStatement.logo && <img src={solidarityStatement.logo} alt="" />}
        <div className="text-container">
          {content}
          <div>
            <strong>{solidarityStatement.name}</strong>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.medium};
          margin-bottom: 2rem;
        }

        .text-container :global(p) {
          margin-bottom: 0.5rem;
        }

        img {
          width: 120px;
          margin: 0 0 1rem 0.5rem;
          float: right;
        }

        @media (min-width: 769px) {
          .container {
            display: flex;
            flex-direction: row-reverse;
            align-items: flex-start;
          }

          img {
            margin-top: 1rem;
            margin-left: 0;
          }

          .container.no-logo {
            display: block;
          }

          .text-container {
            display: flex;
            flex-direction: column;
            padding-right: 2rem;
          }

          .container.no-logo .text-container {
            width: calc(100% - 2rem - 120px);
          }
        }
      `}</style>
    </>
  );
}
