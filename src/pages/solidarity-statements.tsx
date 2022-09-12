import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PageHeader } from '../components/PageHeader';
import { PageLayout } from '../components/PageLayout';
import { SolidarityStatement, SolidarityStatementContent } from '../components/SolidarityStatement';
import { getPagesMetadata, PageData } from '../lib/collections/pages';
import { render } from '../lib/collections/render';
import { getSolidarityStatementsData } from '../lib/collections/solidarityStatements';

interface Props {
  solidarityStatements: SolidarityStatementContent[];
  pagesMetadata: PageData[];
}

const SolidarityStatements = ({ solidarityStatements, pagesMetadata }: Props) => (
  <>
    <Head>
      <title>Solidarity Statements - The New York Times Guild</title>
      <meta name="og:title" content="Solidarity Statements" />
      <meta name="og:type" content="website" />
    </Head>
    <PageLayout pagesMetadata={pagesMetadata}>
      <PageHeader heading="Solidarity Statements" />
      <main>
        {solidarityStatements.map((solidarityStatement) => (
          <SolidarityStatement
            key={solidarityStatement.name}
            solidarityStatement={solidarityStatement}
          />
        ))}
      </main>
    </PageLayout>
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
  const pagesMetadata = getPagesMetadata();
  return {
    props: {
      solidarityStatements,
      pagesMetadata,
    },
  };
};

export default SolidarityStatements;
