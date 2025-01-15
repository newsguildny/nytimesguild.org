import { EditorComponentOptions } from "netlify-cms-core";

export const downloadOptions: EditorComponentOptions = {
  id: "download",
  label: "Download",
  fields: [
    {
      name: "source",
      label: "Source",
      widget: "string",
    },
    {
      name: "content",
      label: "Content",
      widget: "string",
    },
  ],
  pattern: /<Download to="([^\s]*)">(.*)<\/Download>/,
  fromBlock: (match) => ({
    destination: match[1],
    content: match[2],
  }),
  toBlock: (data) => `<Download to="${data.source}">${data.content}</Download>`,
  toPreview: (data) => `<a href="${data.source}">${data.content}</a>`,
};
