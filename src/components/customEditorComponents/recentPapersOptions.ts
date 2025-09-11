import { EditorComponentOptions } from "netlify-cms-core";

export const recentPapersOptions: EditorComponentOptions = {
  id: "recent-papers",
  label: "Recent Shop Papers",
  fields: [],
  pattern: /<RecentPapers \/>/,
  fromBlock: () => ({}),
  toBlock: () => `<RecentPapers />`,
  toPreview: () => `<p><strong>Recent Shop Papers Block</strong></p>`,
};
