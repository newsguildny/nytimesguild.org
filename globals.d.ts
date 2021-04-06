/// <reference types="react" />

declare module 'react-twitter-embed' {
  export const TwitterTweetEmbed: React.Component;
}

declare module 'remark-sectionize';

declare module 'rehype-remark';

declare module 'netlify-cms-core' {
  export interface EditorComponentField {
    fields?: EditorComponentField[];
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
