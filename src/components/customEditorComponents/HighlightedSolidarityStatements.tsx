import { EditorComponentOptions } from 'netlify-cms-core';
import { useStaticContext } from '../../lib/staticContext/useStaticContext';
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

export function HighlightedSolidarityStatements() {
  const { highlightedSolidarityStatements } = useStaticContext();
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
