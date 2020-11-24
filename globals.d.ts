/// <reference types="react" />

interface Options {
  components: Record<string, React.Component | ((props: never) => React.ReactNode)>;
}

declare module 'next-mdx-remote/hydrate' {
  export interface MdxSource {
    compiledSource: string;
    renderedOutput: string;
    scope: Record<string, unknown>;
  }
  export default function hydrate(source: MdxSource, options?: Options): React.ReactNode;
}

declare module 'next-mdx-remote/render-to-string' {
  export interface MdxSource {
    compiledSource: string;
    renderedOutput: string;
    scope: Record<string, unknown>;
  }
  export default function renderToString(content: string, options?: Options): Promise<MdxSource>;
}

declare module 'react-twitter-embed' {
  export const TwitterTweetEmbed: React.Component;
}
