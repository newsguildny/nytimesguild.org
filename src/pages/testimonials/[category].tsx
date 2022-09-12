import { CmsSelectWidgetOptionObject } from 'netlify-cms-core';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import {
  HighlightedTestimonials,
  staticContextKey as highlightedTestimonialsKey,
} from '../../components/customEditorComponents/HighlightedTestimonials';
import { PageHeader } from '../../components/PageHeader';
import { PageLayout } from '../../components/PageLayout';
import { Testimonial, TestimonialContent } from '../../components/Testimonial';
import { getPagesMetadata, PageData } from '../../lib/collections/pages';
import { render } from '../../lib/collections/render';
import { getTestimonialCategories, getTestimonialsData } from '../../lib/collections/testimonials';
import { createContextValue } from '../../lib/staticContext';

interface Props {
  categoryValue: string;
  otherCategories: CmsSelectWidgetOptionObject[];
  testimonials: TestimonialContent[];
  pagesMetadata: PageData[];
}

const TestimonialsPage = ({
  categoryValue,
  otherCategories,
  testimonials,
  pagesMetadata,
}: Props) => {
  const categoryLabel = otherCategories.find(
    (otherCategory) => otherCategory.value === categoryValue
  )?.label;
  return (
    <>
      <Head>
        <title>{categoryLabel} - The New York Times Guild</title>
        <meta name="og:title" content={categoryLabel} />
        <meta name="og:type" content="website" />
      </Head>
      <PageLayout pagesMetadata={pagesMetadata}>
        <PageHeader heading={categoryLabel} />
        <main>
          {testimonials.map((testimonial) => (
            <Testimonial key={testimonial.name} testimonial={testimonial} />
          ))}
          <hr />
          <section>
            <h2>More testimonials</h2>
            {otherCategories
              .filter((otherCategory) => otherCategory.value !== categoryValue)
              .map(({ label, value }) => (
                <>
                  <h3>{label}</h3>
                  <HighlightedTestimonials category={value} />
                </>
              ))}
          </section>
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
};

export default TestimonialsPage;

export const getStaticProps: GetStaticProps<Props, { category: string }> = async ({ params }) => {
  const categoryValue = params!.category!;
  const testimonials = await render(getTestimonialsData(categoryValue));
  const otherCategories = getTestimonialCategories();
  const pagesMetadata = getPagesMetadata();
  const staticContext = await createContextValue([highlightedTestimonialsKey]);
  return {
    props: {
      categoryValue,
      otherCategories,
      testimonials,
      staticContext,
      pagesMetadata,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const categories = getTestimonialCategories();
  return {
    paths: categories.map((category) => `/testimonials/${category.value}`),
    fallback: false,
  };
};
