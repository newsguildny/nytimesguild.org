import { Metadata } from "next";
import { HighlightedTestimonials } from "src/components/customEditorComponents/HighlightedTestimonials";
import { getTestimonialCategories } from "src/lib/collections/testimonials";

export default function TestimonialsIndexPage() {
  const categories = getTestimonialCategories();

  return (
    <main>
      <h2>Testimonials</h2>
      {categories.map(({ label, value }) => (
        <>
          <h3>{label}</h3>
          <HighlightedTestimonials category={value} />
        </>
      ))}
    </main>
  );
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
