import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PageHeader } from '../../components/PageHeader';
import { PageLayout } from '../../components/PageLayout';
import { ShopPaperSnippet, ShopPaperData } from '../../components/ShopPaperSnippet';
import { getPagesMetadata, PageData } from '../../lib/collections/pages';
import { getPapersData } from '../../lib/collections/papers';

interface Props {
  papers: ShopPaperData[];
  pagesMetadata: PageData[];
}

const ShopPapers = ({ papers, pagesMetadata }: Props) => (
  <>
    <Head>
      <title>Shop Papers - The New York Times Guild</title>
      <meta name="og:title" content="Shop Papers" />
      <meta name="og:type" content="website" />
    </Head>
    <PageLayout pagesMetadata={pagesMetadata}>
      <PageHeader heading="Guild Updates" />
      <main>
        {papers.map((paper) => (
          <ShopPaperSnippet key={paper.slug} paper={paper} />
        ))}
      </main>
    </PageLayout>
  </>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pagesMetadata = getPagesMetadata();
  const papers = getPapersData();
  return {
    props: {
      papers,
      pagesMetadata,
    },
  };
};

export default ShopPapers;
