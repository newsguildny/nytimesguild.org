import { CmsSelectWidgetOptionObject } from 'netlify-cms-core';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import {
  HighlightedTestimonials,
  staticContextKey as highlightedTestimonialsKey,
} from '../../components/customEditorComponents/HighlightedTestimonials';
import { PageHeader } from '../../components/PageHeader';
import { PageLayout } from '../../components/PageLayout';
import { getPagesMetadata, PageData } from '../../lib/collections/pages';
import { getTestimonialCategories } from '../../lib/collections/testimonials';
import { createContextValue } from '../../lib/staticContext';

interface Props {
  categories: CmsSelectWidgetOptionObject[];
  pagesMetadata: PageData[];
}

const TestimonialsIndexPage = ({ categories, pagesMetadata }: Props) => (
  <>
    <Head>
      <title>Testimonials - The New York Times Guild</title>
      <meta name="og:title" content="Testimonials" />
      <meta name="og:type" content="website" />
    </Head>
    <PageHeader heading="Testimonials" />
    <PageLayout pagesMetadata={pagesMetadata}>
      <main>
        <h2>Testimonials</h2>
        {categories.map(({ label, value }) => (
          <>
            <h3>{label}</h3>
            <HighlightedTestimonials category={value} />
          </>
        ))}
      </main>
    </PageLayout>
  </>
);

export default TestimonialsIndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const categories = getTestimonialCategories();
  const staticContext = await createContextValue([highlightedTestimonialsKey]);
  const pagesMetadata = getPagesMetadata();
  return {
    props: { categories, staticContext, pagesMetadata },
  };
};
