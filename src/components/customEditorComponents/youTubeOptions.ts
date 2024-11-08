import { EditorComponentOptions } from "netlify-cms-core";

/**
 * TODO: Upgrade @babel/core and replace with template literal type `${number}:${number}`
 * @babel/core@7.7.7 emits the following error, even though TS 4.2.x supports
 * the above template literal type:
 * ```
 * Syntax error: Template literal types cannot have any substitution)
 * ```
 */
export type AspectRatio = string;

function parseAspectRatio(aspectRatio: AspectRatio) {
  const [width, height] = aspectRatio
    .split(":")
    .map((dimension) => parseInt(dimension, 10));
  return { width, height };
}

export function getAspectRatioHeight(
  baseWidth: number,
  aspectRatio: AspectRatio,
) {
  const { width, height } = parseAspectRatio(aspectRatio);
  return baseWidth * (height / width);
}

interface Props {
  url?: string;
  title?: string;
  aspectRatio?: AspectRatio;
}

export const youTubeOptions: EditorComponentOptions = {
  id: "youtube",
  label: "YouTube Embed",
  fields: [
    {
      name: "title",
      label: "Title",
      widget: "string",
    },
    {
      name: "url",
      label: "Video URL",
      widget: "string",
    },
    {
      name: "aspectRatio",
      label: "Aspect Ratio",
      widget: "select",
      options: ["16:9", "4:3", "1:1", "3:4", "9:16"] as AspectRatio[],
      default: "16:9" as AspectRatio,
    },
  ],
  /** Use a non-capturing group `(?:)` for aspectRatio JSX prop markup */
  pattern: /<YouTube url="(.*)" title="(.*?)"(?: aspectRatio="(\d+:\d+)")? \/>/,
  fromBlock: (match): Props => ({
    url: match[1],
    title: match[2],
    aspectRatio: match[3] as AspectRatio,
  }),
  toBlock: (data: Props) =>
    `<YouTube url="${data.url}" title="${data.title}"${
      data.aspectRatio ? ` aspectRatio="${data.aspectRatio}"` : ""
    } />`,
  toPreview: (data: Props) => `
    <div style="position: relative; width: 100%; height: 0; padding-bottom: ${getAspectRatioHeight(
      100,
      data.aspectRatio || "16:9",
    )}%;">
      <iframe
        title=${data.title}
        style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"
        src=${`https://www.youtube.com/embed/${
          data.url?.match(
            /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#&?]*).*/,
          )?.[1] ?? ""
        }`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      </div>
    `,
};
