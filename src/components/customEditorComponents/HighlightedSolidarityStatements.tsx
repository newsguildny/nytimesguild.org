import { EditorComponentOptions } from 'netlify-cms-core';
import { MdxRemote } from 'next-mdx-remote/types';
import { StaticContextKey, useStaticContext } from '../../lib/staticContext/StaticContext';
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
  // eslint-disable-next-line no-use-before-define
  const highlightedSolidarityStatements = useStaticContext(staticContextKey);
  return (
    <>
      {highlightedSolidarityStatements?.map((solidarityStatement) => (
        <SolidarityStatement
          key={solidarityStatement.name}
          solidarityStatement={solidarityStatement}
        />
      ))}
      <CallToAction to="/solidarity-statements/">Read more</CallToAction>
    </>
  );
}

export const staticContextKey = new StaticContextKey<
  Array<{
    source: MdxRemote.Source;
    logo?: string | undefined;
    filename: string;
    name: string;
    highlight: boolean;
  }>
>('HighlightedSolidarityStatements');
