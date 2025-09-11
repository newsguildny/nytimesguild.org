import { EditorComponentOptions } from "netlify-cms-core";

export const highlightedSolidarityStatementsOptions: EditorComponentOptions = {
  id: "highlighted-solidarity-statements",
  label: "Highlighted Solidarity Statements",
  fields: [],
  pattern: /<HighlightedSolidarityStatements \/>/,
  fromBlock: () => ({}),
  toBlock: () => `<HighlightedSolidarityStatements />`,
  toPreview: () =>
    `<p><strong>Highlighted Solidarity Statements Block</strong></p>`,
};
