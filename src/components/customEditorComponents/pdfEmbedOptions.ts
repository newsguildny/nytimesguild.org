import { EditorComponentOptions } from "netlify-cms-core";

interface PDFEmbedProps {
  src?: string;
  title?: string;
}

export const pdfEmbedOptions: EditorComponentOptions = {
  id: "pdf",
  label: "PDF Embed",
  fields: [],
  pattern: /<PDFEmbed src="(.*)" title="(.*?)" \/>/,
  fromBlock: (match) => ({
    src: match[1],
    title: match[2],
  }),
  toBlock: ({ src, title }: PDFEmbedProps) =>
    `<PDFEmbed src="${src}" title="${title}" />`,
  toPreview: ({ title }: PDFEmbedProps) => `<p><strong>${title}</strong></p>`,
};
