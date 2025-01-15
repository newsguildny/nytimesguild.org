import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkPrism from "remark-prism";
import { remarkLineBreaks } from "src/lib/mdx/remarkPlugins";
import { Pluggable } from "unified";

export function MDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      options={{
        ...props.options,
        mdxOptions: {
          ...props.options?.mdxOptions,
          remarkPlugins: [remarkLineBreaks, remarkPrism as Pluggable],
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  );
}
