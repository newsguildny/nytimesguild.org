import fs from 'fs';
import path from 'path';
import { renderToString } from '../mdx/renderToString';
import { getMarkdownData } from '../mdx/read';
import { components } from '../../components/customEditorComponents';
import {
  SolidarityStatementContent,
  SolidarityStatementData,
} from '../../components/SolidarityStatement';

export function getSolidarityStatementsFilenames() {
  return fs
    .readdirSync(path.join(process.cwd(), 'src', 'markdown', 'solidarityStatements'))
    .map((paper) => paper.slice(0, paper.length - 4));
}

export function getSolidarityStatementsMetadata() {
  return getSolidarityStatementsFilenames().map(
    (slug) => getMarkdownData<SolidarityStatementData>('solidarityStatements', slug).data
  );
}

export async function getSolidarityStatementData(filename: string) {
  const markdownData = getMarkdownData<SolidarityStatementData>('solidarityStatements', filename);
  const mdxSource = await renderToString(markdownData.content, {
    components,
  });
  return {
    filename: markdownData.data.filename,
    name: markdownData.data.name,
    highlight: markdownData.data.highlight,
    ...(markdownData.data.logo && { logo: markdownData.data.logo }),
    source: mdxSource,
  };
}

export async function getSolidarityStatementsData() {
  return Promise.all(
    getSolidarityStatementsFilenames().map((filename) => getSolidarityStatementData(filename))
  );
}

export async function getHighlightedSolidarityStatementsData(): Promise<
  SolidarityStatementContent[]
> {
  const allSolidarityStatementsMetadata = getSolidarityStatementsMetadata();
  const highlightedSolidarityStatementsMetadata = allSolidarityStatementsMetadata.filter(
    (solidarityStatement) => solidarityStatement.highlight
  );
  return Promise.all(
    highlightedSolidarityStatementsMetadata.map(({ filename }) =>
      getSolidarityStatementData(filename)
    )
  );
}
