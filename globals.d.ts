/// <reference types="react" />

interface LiteYoutubeEmbedProps extends React.HTMLAttributes {
  videoid: string;
  playlabel?: string;
  params?: string;
  style?: React.CSSProperties;
  // eslint-disable-next-line no-use-before-define
  children?: JSX.Element;
}

declare namespace JSX {
  interface IntrinsicElements {
    'lite-youtube': LiteYoutubeEmbedProps;
  }
}

declare module 'lite-youtube-embed/src/lite-yt-embed';

declare module 'react-twitter-embed' {
  export const TwitterTweetEmbed: React.Component;
}

declare module 'remark-sectionize';

declare module 'rehype-remark';

declare module 'netlify-cms-core' {
  export interface EditorComponentField {
    fields?: EditorComponentField[];
    /**
     * For some reason, the `EditorComponentOptions` type definition doesn't have `options`,
     * even though this is supported for `widget: 'select'`:
     * @see https://www.netlifycms.org/docs/widgets/#select
     */
    options?: unknown[];
    /** Same issue as above: the `EditorComponentOptions` type definition doesn't have `default` */
    default?: unknown;
  }
}

/** @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types */
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: unknown[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;
