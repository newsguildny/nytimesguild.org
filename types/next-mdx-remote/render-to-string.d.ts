import { MdxSource } from './MdxSource';

declare module 'next-mdx-remote/render-to-string' {
  export default function renderToString(content: string): MdxSource;
  export { MdxSource };
}
