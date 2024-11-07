import { EditorComponentOptions } from "netlify-cms-core";

export const fullBleedImageOptions: EditorComponentOptions = {
  id: "full-bleed-image",
  label: "Full Bleed Image",
  fields: [
    {
      name: "alt",
      label: "Alt text",
      widget: "string",
    },
    {
      name: "src",
      label: "Image",
      widget: "image",
    },
  ],
  pattern: /<FullBleedImage alt="(.*)" src="(.*)" \/>/,
  fromBlock: (match) => ({
    alt: match[1],
    src: match[2],
  }),
  toBlock: (data) => `<FullBleedImage alt="${data.alt}" src="${data.src}" />`,
  toPreview: (data) => `<img alt="${data.alt}" src="${data.src}" />`,
};
