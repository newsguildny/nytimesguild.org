import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PageHeader } from '../components/PageHeader';
import { Testimonial, TestimonialContent } from '../components/Testimonial';
import { render } from '../lib/collections/render';
import { getTestimonialsData } from '../lib/collections/testimonials';

interface Props {
  testimonials: TestimonialContent[];
}

const Testimonials = ({ testimonials }: Props) => (
  <>
    <Head>
      <title>Testimonials - The New York Times Guild</title>
      <meta name="og:title" content="Testimonials" />
      <meta name="og:type" content="website" />
    </Head>
    <PageHeader heading="Testimonials" />
    <main>
      {testimonials.map((testimonial) => (
        <Testimonial key={testimonial.name} testimonial={testimonial} />
      ))}
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

export const getStaticProps: GetStaticProps = async () => {
  const testimonials = await render(getTestimonialsData());
  return {
    props: {
      testimonials,
    },
  };
};

export default Testimonials;
