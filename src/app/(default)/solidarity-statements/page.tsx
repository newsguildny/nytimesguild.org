import { PageHeader } from "src/components/PageHeader";
import { SolidarityStatement } from "src/components/SolidarityStatement";
import { getSolidarityStatementsData } from "src/lib/collections/solidarityStatements";
import { Metadata } from "next";
import styles from "./page.module.css";

export default function SolidarityStatementsPage() {
  const solidarityStatements = getSolidarityStatementsData();

  return (
    <>
      <PageHeader heading="Solidarity Statements" />
      <main className={styles.main}>
        {solidarityStatements.map((solidarityStatement) => (
          <SolidarityStatement
            key={solidarityStatement.name}
            solidarityStatement={solidarityStatement}
          />
        ))}
      </main>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Solidarity - The New York Times Guild",
    openGraph: {
      title: "Solidarity",
      type: "website",
    },
  };
}
