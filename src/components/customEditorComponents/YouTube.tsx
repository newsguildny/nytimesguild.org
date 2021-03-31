import { EditorComponentOptions } from 'netlify-cms-core';

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
  ],
  pattern: /<YouTube url="(.*)" title="(.*)" \/>/,
  fromBlock: (match) => ({
    url: match[1],
    title: match[2],
  }),
  toBlock: (data) => `<YouTube url="${data.url}" title="${data.title}" />`,
  toPreview: (data) => `
      <iframe
        title=${data.title}
        width="560"
        height="315"
        src=${`https://www.youtube.com/embed/${
          data.url.match(
            /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#&?]*).*/
          )?.[1] ?? ''
        }`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    `,
};

interface Props {
  url: string;
  title: string;
}

export function YouTube({ url, title }: Props) {
  const videoId =
    url.match(
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
        <div className="wrapper">
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
          height: 0;
          /**
           * Use a percentage-based padding-bottom to set up a responsive 16:9 aspect ratio for
           * embedded YouTube videos.
           *
           * Remember, percentage-based padding, even vertically, is based on the element's width.
           * @see https://css-tricks.com/aspect-ratio-boxes/
           */
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
