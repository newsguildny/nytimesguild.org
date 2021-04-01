/// <reference types="react" />

declare module 'react-twitter-embed' {
  export const TwitterTweetEmbed: React.Component;
}

declare module 'remark-sectionize';

declare module 'netlify-cms-core' {
  export interface EditorComponentField {
    fields?: EditorComponentField[];
  }
}
