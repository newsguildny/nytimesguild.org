import { GetStaticProps } from 'next';
import Head from 'next/head';
import ShopPaperSnippet from '../../components/ShopPaperSnippet';
import { getPapersData, ShopPaperContent } from '../../lib/papers';
import { withNav } from '../../lib/withNav';

interface Props {
  papers: ShopPaperContent[];
}

const ShopPapers = ({ papers }: Props) => (
  <>
    <Head>
      <title>Shop Papers - The New York Times Guild</title>
    </Head>
    <main>
      {papers.map((paper) => (
        <ShopPaperSnippet key={paper.slug} paper={paper} />
      ))}
    </main>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const papers = await getPapersData();
  return withNav({
    props: {
      papers,
    },
  });
};

export default ShopPapers;
