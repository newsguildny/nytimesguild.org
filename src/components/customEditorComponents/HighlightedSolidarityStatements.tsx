import {
  getSolidarityStatementData,
  getSolidarityStatementsMetadata,
} from "src/lib/collections/solidarityStatements";
import { SolidarityStatement } from "../SolidarityStatement";
import { CallToAction } from "./CallToAction";

export function HighlightedSolidarityStatements() {
  const allSolidarityStatementsMetadata = getSolidarityStatementsMetadata();
  const highlightedSolidarityStatementsMetadata =
    allSolidarityStatementsMetadata.filter(
      (solidarityStatement) => solidarityStatement.highlight,
    );
  const highlightedSolidarityStatements =
    highlightedSolidarityStatementsMetadata.map(({ filename }) =>
      getSolidarityStatementData(filename),
    );

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
