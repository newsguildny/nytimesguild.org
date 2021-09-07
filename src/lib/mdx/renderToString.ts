import rehypeSlug from 'rehype-slug';
import renderToStringMdxRemote from 'next-mdx-remote/render-to-string';
import { MdxRemote } from 'next-mdx-remote/types';
import { StaticContext } from 'next-static-context';
import { remarkLineBreaks } from './remarkPlugins';

export async function renderToString(
  source: string,
  params?: {
    components?: MdxRemote.Components;
    scope?: Record<string, unknown>;
    staticContext?: Record<string, unknown>;
  }
) {
  return renderToStringMdxRemote(source, {
    ...params,
    provider: { component: StaticContext.Provider, props: { value: params?.staticContext ?? {} } },
    mdxOptions: {
      remarkPlugins: [remarkLineBreaks],
      rehypePlugins: [rehypeSlug],
    },
  });
}
