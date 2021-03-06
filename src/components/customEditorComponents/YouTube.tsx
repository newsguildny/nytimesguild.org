import { EditorComponentOptions } from 'netlify-cms-core';
import { useEffect, useMemo } from 'react';

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
      options: ['16:9', '4:3', '1:1', '3:4', '9:16'] as AspectRatio[],
      default: '16:9' as AspectRatio,
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
  useEffect(() => {
    import('lite-youtube-embed/src/lite-yt-embed');
  }, []);

  const videoId = useMemo(
    () =>
      url?.match(
        /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#&?]*).*/
      )?.[1] ?? '',
    [url]
  );

  return (
    <>
      {/**
       * This outer div gets a max-width and padding from the `:global(main) > *` selector, which
       * we don't want to override because it'll misalign the video with the rest of the content
       */}
      <div>
        <div className="wrapper">
          <lite-youtube
            videoid={videoId}
            playlabel={title}
            style={{
              backgroundImage: `url('https://i.ytimg.com/vi/${videoId}/hqdefault.jpg')`,
            }}
          >
            <button type="button" className="lty-playbtn">
              <span className="lyt-visually-hidden">{title}</span>
            </button>
          </lite-youtube>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
          height: 0;
          /**
           * Use a percentage-based padding-bottom to set up a responsive, prop-based aspect ratio
           * for embedded YouTube videos.
           *
           * Remember, percentage-based padding, even vertically, is based on the element's width.
           * 
           * This is known as the Aspect Ratio Boxes layout technique:
           * @see https://css-tricks.com/aspect-ratio-boxes/
           */
          padding-bottom: ${getAspectRatioHeight(100, aspectRatio)}%;
        }

        .wrapper :global(lite-youtube) {
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
