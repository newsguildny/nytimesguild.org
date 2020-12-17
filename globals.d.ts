/// <reference types="react" />

interface RenderOptions {
  components?: Record<string, React.Component | ((props: never) => React.ReactNode)>;
  mdxOptions?: {
    remarkPlugins?: unknown[];
    rehypePlugins?: unknown[];
    hastPlugins?: unknown[];
    compilers?: unknown[];
    filepath?: string;
  };
  scope?: Record<string, unknown>;
}

interface HydrateOptions {
  components?: Record<string, React.Component | ((props: never) => React.ReactNode)>;
}

declare module 'next-mdx-remote/hydrate' {
  export interface MdxSource {
    compiledSource: string;
    renderedOutput: string;
    scope: Record<string, unknown>;
  }
  export default function hydrate(source: MdxSource, options?: HydrateOptions): React.ReactNode;
}

declare module 'next-mdx-remote/render-to-string' {
  export interface MdxSource {
    compiledSource: string;
    renderedOutput: string;
    scope: Record<string, unknown>;
  }
  export default function renderToString(
    content: string,
    options?: RenderOptions
  ): Promise<MdxSource>;
}

declare module 'react-twitter-embed' {
  export const TwitterTweetEmbed: React.Component;
}

declare module 'remark-sectionize';
