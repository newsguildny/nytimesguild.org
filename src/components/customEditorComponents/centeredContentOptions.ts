import { EditorComponentOptions } from "netlify-cms-core";

export const centeredContentOptions: EditorComponentOptions = {
  id: "centered-content",
  label: "Centered Content",
  fields: [
    {
      name: "content",
      label: "Content",
      widget: "string",
    },
  ],
  pattern: /<CenteredContent>(.*)<\/CenteredContent>/,
  fromBlock: (match) => ({
    content: match[1],
  }),
  toBlock: (data) => `<CenteredContent>${data.content}</CenteredContent>`,
  toPreview: (data) => `<div style="text-align:center;">${data.content}</div>`,
};
