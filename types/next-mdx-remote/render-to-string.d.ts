/// <reference types="react" />

declare module 'next-mdx-remote/render-to-string' {
  interface Options {
    components: Record<string, React.Component | ((props: never) => React.ReactNode)>;
  }
  export interface MdxSource {
    compiledSource: string;
    renderedOutput: string;
    scope: Record<string, unknown>;
  }
  export default function renderToString(content: string, options?: Options): Promise<MdxSource>;
}
