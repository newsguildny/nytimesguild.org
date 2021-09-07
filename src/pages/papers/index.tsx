import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PageHeader } from '../../components/PageHeader';
import { ShopPaperSnippet, ShopPaperData } from '../../components/ShopPaperSnippet';
import { getPapersData } from '../../lib/collections/papers';

interface Props {
  papers: ShopPaperData[];
}

const ShopPapers = ({ papers }: Props) => (
  <>
    <Head>
      <title>Shop Papers - The New York Times Guild</title>
      <meta name="og:title" content="Shop Papers" />
      <meta name="og:type" content="website" />
    </Head>
    <PageHeader heading="Guild Updates" />
    <main>
      {papers.map((paper) => (
        <ShopPaperSnippet key={paper.slug} paper={paper} />
      ))}
    </main>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const papers = getPapersData();
  return {
    props: {
      papers,
    },
  };
};

export default ShopPapers;
