import { GetStaticProps } from 'next';
import Head from 'next/head';
import PageHeader from '../../components/PageHeader';
import ShopPaperSnippet from '../../components/ShopPaperSnippet';
import { getPapersData, ShopPaperContent } from '../../lib/papers';
import withStaticContext from '../../staticContext/withStaticContext';

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
  const papers = await getPapersData();
  return withStaticContext({
    props: {
      papers,
    },
  });
};

export default ShopPapers;
