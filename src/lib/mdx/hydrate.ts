import hydrate from 'next-mdx-remote/hydrate';
import { MdxRemote } from 'next-mdx-remote/types';
import { Children, cloneElement, isValidElement, ReactElement } from 'react';
import { StaticContext } from '../staticContext/StaticContext';

export function useHydratedMdx(
  source: MdxRemote.Source,
  params?: {
    components?: MdxRemote.Components;
    staticContextValue?: Record<string, unknown>;
  }
) {
  const content = hydrate(source, {
    ...params,
    provider: {
      component: StaticContext.Provider,
      props: { value: params?.staticContextValue ?? {} },
    },
  });
  // On the server side, next-mdx-remote wraps its mdx content with a div,
  // which we need to target with global styles to avoid a flash of incorrectly
  // styled content first page load (see pages/_app.tsx for more details),
  // so we add a className prop to the div before returning it.
  const child = Children.only(content);
  if (isValidElement(child)) {
    return cloneElement(child as ReactElement, { className: 'mdx-wrapper' });
  }
  return child;
}
