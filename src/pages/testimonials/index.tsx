import { CmsSelectWidgetOptionObject } from 'netlify-cms-core';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { HighlightedTestimonials } from '../../components/customEditorComponents/HighlightedTestimonials';
import { PageHeader } from '../../components/PageHeader';
import { getTestimonialCategories } from '../../lib/collections/testimonials';

interface Props {
  categories: CmsSelectWidgetOptionObject[];
}

const TestimonialsIndexPage = ({ categories }: Props) => (
  <>
    <Head>
      <title>Testimonials - The New York Times Guild</title>
      <meta name="og:title" content="Testimonials" />
      <meta name="og:type" content="website" />
    </Head>
    <PageHeader heading="Testimonials" />
    <main>
      <h2>Testimonials</h2>
      {categories.map(({ label, value }) => (
        <>
          <h3>{label}</h3>
          <HighlightedTestimonials category={value} />
        </>
      ))}
    </main>
  </>
);

export default TestimonialsIndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const categories = getTestimonialCategories();
  return {
    props: { categories },
  };
};
