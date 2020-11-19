import fs from 'fs'
import { GetStaticProps, GetStaticPaths } from "next";
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import matter from "gray-matter";
import yaml from "js-yaml";

const Page = ({ source, title }) => {
  const content = hydrate(source, { components: { Page } })
  return <div className="wrapper"><h1>{title}</h1>{content}</div>
}

export default Page

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'src', 'markdown', 'pages', `${params.slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const matterResult = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  const mdxSource = await renderToString(matterResult.content, { components: { Page } })
  return {
    props: {
      source: mdxSource,
      title: matterResult.data.title
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = fs.readdirSync(path.join(process.cwd(), 'src', 'markdown', 'pages')).map(page => page.slice(0, page.length - 4))
  const paths = pages.map(page => ({ params: { slug: page } }))
  return {
    paths: paths,
    fallback: false,
  };
};
