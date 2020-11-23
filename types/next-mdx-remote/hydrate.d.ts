import { ReactNode } from 'react';
import { MdxSource } from './MdxSource';

declare module 'next-mdx-remote/hydrate' {
  export function hydrate(source: MdxSource): ReactNode;
  export { MdxSource };
}
