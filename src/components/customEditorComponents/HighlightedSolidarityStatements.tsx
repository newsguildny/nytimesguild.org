import { EditorComponentOptions } from 'netlify-cms-core';
import { StaticContextKey, useStaticContext } from 'next-static-context';
import { render } from '../../lib/collections/render';
import {
  getSolidarityStatementData,
  getSolidarityStatementsMetadata,
} from '../../lib/collections/solidarityStatements';
import { SolidarityStatement } from '../SolidarityStatement';
import { CallToAction } from './CallToAction';

export const options: EditorComponentOptions = {
  id: 'highlighted-solidarity-statements',
  label: 'Highlighted Solidarity Statements',
  fields: [],
  pattern: /<HighlightedSolidarityStatements \/>/,
  fromBlock: () => ({}),
  toBlock: () => `<HighlightedSolidarityStatements />`,
  toPreview: () => `<p><strong>Highlighted Solidarity Statements Block</strong></p>`,
};

export function getStaticContext() {
  const allSolidarityStatementsMetadata = getSolidarityStatementsMetadata();
  const highlightedSolidarityStatementsMetadata = allSolidarityStatementsMetadata.filter(
    (solidarityStatement) => solidarityStatement.highlight
  );
  return Promise.all(
    highlightedSolidarityStatementsMetadata.map(({ filename }) =>
      render(getSolidarityStatementData(filename))
    )
  );
}

export const staticContextKey = new StaticContextKey<typeof getStaticContext>(
  'highlightedSolidarityStatements'
);

export function HighlightedSolidarityStatements() {
  const highlightedSolidarityStatements = useStaticContext(staticContextKey);
  return (
    <>
      {highlightedSolidarityStatements?.map((solidarityStatement) => (
        <SolidarityStatement
          key={solidarityStatement.name}
          solidarityStatement={solidarityStatement}
        />
      ))}
      <CallToAction to="/solidarity-statements">Read more</CallToAction>
    </>
  );
}
