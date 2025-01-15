import fs from "fs";
import path from "path";
import { getMarkdownData } from "../mdx/read";

export interface SolidarityStatementData {
  filename: string;
  name: string;
  highlight: boolean;
  logo?: string;
}

export function getSolidarityStatementsFilenames() {
  return fs
    .readdirSync(
      path.join(process.cwd(), "src", "markdown", "solidarityStatements"),
    )
    .map((paper) => paper.slice(0, paper.length - 4));
}

export function getSolidarityStatementsMetadata() {
  return getSolidarityStatementsFilenames().map(
    (slug) =>
      getMarkdownData<SolidarityStatementData>("solidarityStatements", slug)
        .data,
  );
}

export function getSolidarityStatementData(filename: string) {
  const markdownData = getMarkdownData<SolidarityStatementData>(
    "solidarityStatements",
    filename,
  );
  return {
    filename: markdownData.data.filename,
    name: markdownData.data.name,
    highlight: markdownData.data.highlight,
    ...(markdownData.data.logo && { logo: markdownData.data.logo }),
    content: markdownData.content,
  };
}

export function getSolidarityStatementsData() {
  return getSolidarityStatementsFilenames().map((filename) =>
    getSolidarityStatementData(filename),
  );
}
