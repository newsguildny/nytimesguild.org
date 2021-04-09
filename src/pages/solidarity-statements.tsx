import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PageHeader } from '../components/PageHeader';
import { SolidarityStatement, SolidarityStatementContent } from '../components/SolidarityStatement';
import { getSolidarityStatementsData } from '../lib/collections/solidarityStatements';
import { getStaticContext } from '../lib/staticContext/getStaticContext';

interface Props {
  solidarityStatements: SolidarityStatementContent[];
}

const SolidarityStatements = ({ solidarityStatements }: Props) => (
  <>
    <Head>
      <title>Solidarity Statements - The New York Times Guild</title>
    </Head>
    <PageHeader heading="Solidarity Statements" />
    <main>
      {solidarityStatements.map((solidarityStatement) => (
        <SolidarityStatement
          key={solidarityStatement.name}
          solidarityStatement={solidarityStatement}
        />
      ))}
    </main>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const staticContext = await getStaticContext('solidarity-statements');
  const solidarityStatements = await getSolidarityStatementsData();
  return {
    props: {
      solidarityStatements,
      staticContext,
    },
  };
};

export default SolidarityStatements;
