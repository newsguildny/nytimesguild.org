import rehypeSlug from 'rehype-slug';
import renderToStringMdxRemote from 'next-mdx-remote/render-to-string';
import { MdxRemote } from 'next-mdx-remote/types';
import prism from 'remark-prism';
import { StaticContext } from '../staticContext/StaticContext';
import { remarkLineBreaks } from './remarkPlugins';

export async function renderToString(
  source: string,
  params?: {
    components?: MdxRemote.Components;
    scope?: Record<string, unknown>;
    staticContextValue?: Record<string, unknown>;
  }
) {
  return renderToStringMdxRemote(source, {
    ...params,
    ...(params?.components && {
      provider: {
        component: StaticContext.Provider,
        props: { value: params?.staticContextValue ?? {} },
      },
    }),
    mdxOptions: {
      remarkPlugins: [remarkLineBreaks, prism],
      rehypePlugins: [rehypeSlug],
    },
  });
}
