import hydrateMdxRemote from 'next-mdx-remote/hydrate';
import { MdxRemote } from 'next-mdx-remote/types';
import { Children, cloneElement, isValidElement } from 'react';

interface Options {
  components?: MdxRemote.Components;
  provider?: MdxRemote.Provider;
}

export function hydrate(source: MdxRemote.Source, options?: Options) {
  const content = hydrateMdxRemote(source, options);
  // On the server side, next-mdx-remote wraps its mdx content with a div,
  // which we need to target with global styles to avoid a flash of incorrectly
  // styled content first page load (see pages/_app.tsx for more details),
  // so we add a className prop to the div before returning it.
  const child = Children.only(content);
  if (isValidElement(child)) {
    return cloneElement(child, { className: 'mdx-wrapper' });
  }
  return child;
}
