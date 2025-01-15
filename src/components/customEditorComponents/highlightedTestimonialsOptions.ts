import { EditorComponentOptions } from "netlify-cms-core";

export const highlightedTestimonialsOptions: EditorComponentOptions = {
  id: "highlighted-testimonials",
  label: "Highlighted Testimonials",
  fields: [
    {
      name: "category",
      label: "Category",
      widget: "select",
      options: ["why-union", "dei"],
    },
  ],
  pattern: /<HighlightedTestimonials category="([a-z-]*)" \/>/,
  fromBlock: (match) => ({ category: match?.[1] }),
  toBlock: ({ category }) =>
    `<HighlightedTestimonials category="${category}" />`,
  toPreview: () => `<p><strong>Highlighted Testimonials Block</strong></p>`,
};
