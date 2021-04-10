import { EditorComponentOptions } from 'netlify-cms-core';

/**
 * TODO: Upgrade @babel/core and replace with template literal type `${number}:${number}`
 * @babel/core@7.7.7 emits the following error, even though TS 4.2.x supports
 * the above template literal type:
 * ```
 * Syntax error: Template literal types cannot have any substitution)
 * ```
 */
export type AspectRatio = string;

function parseAspectRatio(aspectRatio: AspectRatio): Record<'width' | 'height', number> {
  const [width, height] = aspectRatio.split(':').map((dimension) => parseInt(dimension, 10));
  return { width, height };
}

function getAspectRatioHeight(baseWidth: number, aspectRatio: AspectRatio) {
  const { width, height } = parseAspectRatio(aspectRatio);
  return baseWidth * (height / width);
}

interface Props {
  url?: string;
  title?: string;
  aspectRatio?: AspectRatio;
}

export const options: EditorComponentOptions = {
  id: 'youtube',
  label: 'YouTube Embed',
  fields: [
    {
      name: 'title',
      label: 'Title',
      widget: 'string',
    },
    {
      name: 'url',
      label: 'Video URL',
      widget: 'string',
    },
    {
      name: 'aspectRatio',
      label: 'Aspect Ratio',
      widget: 'select',
      /**
       * For some reason, the `EditorComponentOptions` type definition doesn't have `options`,
       * even though this is supported for `widget: 'select'`:
       * @see https://www.netlifycms.org/docs/widgets/#select
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      options: ['16:9', '4:3', '1:1', '3:4', '9:16'] as AspectRatio[],
      default: '16:9' as AspectRatio,
    },
  ],
  pattern: /<YouTube url="(.*)" title="(.*?)"( aspectRatio="(\d+:\d+)")? \/>/,
  fromBlock: (match): Props => ({
    url: match[1],
    title: match[2],
    aspectRatio: match[4] as AspectRatio,
  }),
  toBlock: (data: Props) =>
    `<YouTube url="${data.url}" title="${data.title}"${
      data.aspectRatio ? ` aspectRatio="${data.aspectRatio}"` : ''
    } />`,
  toPreview: (data: Props) => `
    <div style="position: relative; width: 100%; height: 0; padding-bottom: ${getAspectRatioHeight(
      100,
      data.aspectRatio || '16:9'
    )}%;">
      <iframe
        title=${data.title}
        style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;"
        src=${`https://www.youtube.com/embed/${
          data.url?.match(
            /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#&?]*).*/
          )?.[1] ?? ''
        }`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      </div>
    `,
};

export function YouTube({ url, title, aspectRatio = '16:9' }: Props) {
  const videoId =
    url?.match(
      /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#&?]*).*/
    )?.[1] ?? '';
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <>
      {/**
       * This outer div gets a max-width and padding from the `:global(main) > *` selector, which
       * we don't want to override because it'll misalign the video with the rest of the content
       */}
      <div>
        <div
          className="wrapper"
          style={
            /**
             * First half of the Aspect Ratio Boxes layout technique:
             * @see https://css-tricks.com/aspect-ratio-boxes/
             *
             * Use a percentage-based padding-bottom to set up a responsive 16:9 aspect ratio for
             * embedded YouTube videos.
             *
             * Remember, percentage-based padding, even vertically, is based on the element's width.
             *
             * The second half is below, where we set `height: 0;` in the `<styled jsx>` element.
             */
            { paddingBottom: `${getAspectRatioHeight(100, aspectRatio)}%` }
          }
        >
          <iframe
            title={title}
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
          /**
           * Second half of the Aspect Ratio Boxes layout technique:
           * @see https://css-tricks.com/aspect-ratio-boxes/
           *
           * The first half is above, where we set a prop-specific aspect ratio
           * using the \`style\` prop.
           */
          height: 0;
          padding-bottom: calc(9 / 16 * 100%);
        }

        iframe {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}
