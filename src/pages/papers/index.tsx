import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PageHeader } from '../../components/PageHeader';
import { ShopPaperSnippet, ShopPaperContent } from '../../components/ShopPaperSnippet';
import { getPapersData } from '../../lib/collections/papers';
import { getStaticContext } from '../../lib/staticContext/contextGetters';

interface Props {
  papers: ShopPaperContent[];
}

const ShopPapers = ({ papers }: Props) => (
  <>
    <Head>
      <title>Shop Papers - The New York Times Guild</title>
    </Head>
    <PageHeader heading="Guild updates" />
    <main>
      {papers.map((paper) => (
        <ShopPaperSnippet key={paper.slug} paper={paper} />
      ))}
    </main>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const staticContext = await getStaticContext('papers');
  const papers = await getPapersData(staticContext);
  return {
    props: {
      papers,
      staticContext,
    },
  };
};

export default ShopPapers;
