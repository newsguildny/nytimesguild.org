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
      <div className="container">
        {solidarityStatement.logo && <img src={solidarityStatement.logo} alt="" />}
        <div className="text-container">
          {content}
          <p>
            <strong>{solidarityStatement.name}</strong>
          </p>
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.medium};
        }

        img {
          margin: 0 0 1rem 0.5rem;
          border-radius: 50%;
          float: right;
        }

        @media (min-width: 769px) {
          .container {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
          }

          .text-container {
            display: flex;
            flex-direction: column;
            padding-right: 2rem;
          }
        }
      `}</style>
    </>
  );
}
