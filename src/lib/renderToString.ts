import rehypeSlug from 'rehype-slug';
import renderToStringMdxRemote from 'next-mdx-remote/render-to-string';
import { MdxRemote } from 'next-mdx-remote/types';
import StaticContext, { StaticContextValue } from '../staticContext/StaticContext';

export async function renderToString(
  source: string,
  params?: {
    components?: MdxRemote.Components;
    scope?: Record<string, unknown>;
    staticContext?: StaticContextValue;
  }
) {
  return renderToStringMdxRemote(source, {
    ...params,
    provider: { component: StaticContext.Provider, props: { value: params?.staticContext } },
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  });
}
