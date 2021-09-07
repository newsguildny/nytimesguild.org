import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PageHeader } from '../components/PageHeader';
import { SolidarityStatement, SolidarityStatementContent } from '../components/SolidarityStatement';
import { render } from '../lib/collections/render';
import { getSolidarityStatementsData } from '../lib/collections/solidarityStatements';

interface Props {
  solidarityStatements: SolidarityStatementContent[];
}

const SolidarityStatements = ({ solidarityStatements }: Props) => (
  <>
    <Head>
      <title>Solidarity Statements - The New York Times Guild</title>
      <meta name="og:title" content="Solidarity Statements" />
      <meta name="og:type" content="website" />
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
    <style jsx>{`
      main {
        padding-top: 2rem;
      }

      @media (min-width: 769px) {
        main {
          padding-top: 5rem;
        }
      }
    `}</style>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const solidarityStatements = await render(getSolidarityStatementsData());
  return {
    props: {
      solidarityStatements,
    },
  };
};

export default SolidarityStatements;
