import { GetStaticProps } from "next";
import fs from 'fs'
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import matter from "gray-matter";
import yaml from "js-yaml";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import PostList from "../../components/PostList";
import config from "../../lib/config";
import { listTags, TagContent } from "../../lib/tags";

type Props = {
  posts: any[];
  tags: TagContent[];
  pages: string[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ posts, pages, tags, pagination }: Props) {
  const url = "/posts";
  const title = "All posts";
  return (
    <Layout pages={pages}>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={posts} tags={tags} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = fs.readdirSync(path.join(process.cwd(), 'src', 'markdown', 'pages')).map(page => page.slice(0, page.length - 4))
  const fileNames = fs.readdirSync(path.join(process.cwd(), 'src', 'markdown', 'posts'))
  const paths = fileNames.map(fileName => path.join(process.cwd(), 'src', 'markdown', 'posts', fileName))
  const grayMatters = paths.map(path => matter(fs.readFileSync(path, 'utf-8'), {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  }));
  const posts = grayMatters.map(grayMatter => grayMatter.data)
  const tags = listTags();
  const pagination = {
    current: 1,
    pages: 1,
  };
  return {
    props: {
      pages,
      posts,
      tags,
      pagination,
    },
  };
};
