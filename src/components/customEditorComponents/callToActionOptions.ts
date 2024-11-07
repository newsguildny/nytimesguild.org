import { EditorComponentOptions } from "netlify-cms-core";

export const callToActionOptions: EditorComponentOptions = {
  id: "call-to-action",
  label: "Call To Action",
  fields: [
    {
      name: "destination",
      label: "Destination",
      widget: "string",
    },
    {
      name: "content",
      label: "Content",
      widget: "string",
    },
  ],
  pattern: /<CallToAction to="([^\s]*)">(.*)<\/CallToAction>/,
  fromBlock: (match) => ({
    destination: match[1],
    content: match[2],
  }),
  toBlock: (data) =>
    `<CallToAction to="${data.destination}">${data.content}</CallToAction>`,
  toPreview: (data) => `<a href="${data.destination}">${data.content}</a>`,
};
