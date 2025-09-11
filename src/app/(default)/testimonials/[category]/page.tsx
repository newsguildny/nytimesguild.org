import { Fragment } from "react";
import { HighlightedTestimonials } from "src/components/customEditorComponents/HighlightedTestimonials";
import { PageHeader } from "src/components/PageHeader";
import { Testimonial } from "src/components/Testimonial";
import {
  getTestimonialCategories,
  getTestimonialsData,
} from "src/lib/collections/testimonials";
import { Metadata } from "next";
import styles from "./page.module.css";

interface Props {
  params: {
    category: string;
  };
}

export default function TestimonialsCategory({ params }: Props) {
  const categoryValue = params.category;
  const testimonials = getTestimonialsData(categoryValue);
  const otherCategories = getTestimonialCategories();
  const categoryLabel = otherCategories.find(
    (otherCategory) => otherCategory.value === categoryValue,
  )?.label;

  return (
    <>
      {" "}
      <PageHeader heading={categoryLabel} />{" "}
      <main className={styles.main}>
        {testimonials.map((testimonial) => (
          <Testimonial key={testimonial.name} testimonial={testimonial} />
        ))}
        <hr />
        <section>
          <h2>More testimonials</h2>
          {otherCategories
            .filter((otherCategory) => otherCategory.value !== categoryValue)
            .map(({ label, value }) => (
              <Fragment key={label}>
                <h3>{label}</h3>
                <HighlightedTestimonials category={value} />
              </Fragment>
            ))}
        </section>
      </main>
    </>
  );
}

export function generateStaticParams() {
  const categories = getTestimonialCategories();
  return categories.map((category) => ({
    category: `/testimonials/${category.value}`,
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Testimonials - The New York Times Guild",
    openGraph: {
      title: "Testimonials",
      type: "website",
    },
  };
}
