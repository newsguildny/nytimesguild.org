/// <reference types="react" />

declare module 'next-mdx-remote/hydrate' {
  interface Options {
    components: Record<string, React.Component | ((props: never) => React.ReactNode)>;
  }
  export interface MdxSource {
    compiledSource: string;
    renderedOutput: string;
    scope: Record<string, unknown>;
  }
  export default function hydrate(source: MdxSource, options?: Options): React.ReactNode;
}
