import { CmsSelectWidgetOptionObject } from 'netlify-cms-core';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { HighlightedTestimonials } from '../../components/customEditorComponents/HighlightedTestimonials';
import { PageHeader } from '../../components/PageHeader';
import { Testimonial, TestimonialContent } from '../../components/Testimonial';
import { render } from '../../lib/collections/render';
import { getTestimonialCategories, getTestimonialsData } from '../../lib/collections/testimonials';

interface Props {
  categoryValue: string;
  otherCategories: CmsSelectWidgetOptionObject[];
  testimonials: TestimonialContent[];
}

const TestimonialsPage = ({ categoryValue, otherCategories, testimonials }: Props) => {
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
  return {
    props: {
      categoryValue,
      otherCategories,
      testimonials,
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
