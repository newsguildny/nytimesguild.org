import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PageHeader } from '../components/PageHeader';
import { Testimonial, TestimonialContent } from '../components/Testimonial';
import { getTestimonialsData } from '../lib/collections/testimonials';
import { getStaticContext } from '../lib/staticContext/contextGetters';

interface Props {
  testimonials: TestimonialContent[];
}

const Testimonials = ({ testimonials }: Props) => (
  <>
    <Head>
      <title>Testimonials - The New York Times Guild</title>
    </Head>
    <PageHeader heading="Testimonials" />
    <main>
      {testimonials.map((testimonial) => (
        <Testimonial key={testimonial.name} testimonial={testimonial} />
      ))}
    </main>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const staticContext = await getStaticContext('testimonials');
  const testimonials = await getTestimonialsData();
  return {
    props: {
      testimonials,
      staticContext,
    },
  };
};

export default Testimonials;
