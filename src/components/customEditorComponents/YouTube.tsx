"use client";

import { useEffect, useMemo } from "react";
import { AspectRatio, getAspectRatioHeight } from "./youTubeOptions";

interface Props {
  url?: string;
  title?: string;
  aspectRatio?: AspectRatio;
}

export function YouTube({ url, title, aspectRatio = "16:9" }: Props) {
  useEffect(() => {
    import("lite-youtube-embed/src/lite-yt-embed");
  }, []);

  const videoId = useMemo(
    () =>
      url?.match(
        /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#&?]*).*/,
      )?.[1] ?? "",
    [url],
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
