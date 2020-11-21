import React from "react";
import fs from 'fs'
import Head from "next/head";
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import matter from "gray-matter";
import yaml from "js-yaml";
import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";
import styles from "../../../public/styles/content.module.css";
import Author from "../../components/Author";
import Copyright from "../../components/Copyright";
import Date from "../../components/Date";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import JsonLdMeta from "../../components/meta/JsonLdMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import { SocialList } from "../../components/SocialList";
import TagButton from "../../components/TagButton";
import { AuthorContent } from "../../lib/authors";
import { TagContent } from "../../lib/tags";
import { GetStaticPaths, GetStaticProps } from "next";

const components = {
  InstagramEmbed,
  YouTube,
  TwitterTweetEmbed,
};

type Props = {
  title: string;
  date: Date;
  slug: string;
  description: string;
  tags: TagContent[];
  author: AuthorContent;
  source: any;
  pages: string[];
};

export default function Post({
  title,
  date,
  slug,
  author,
  tags,
  description,
  source,
  pages,
}: Props) {
  const keywords = tags.map((tag) => tag.slug);
  const authorName = author.name;
  date = new globalThis.Date(date)
  return (
    <Layout pages={pages}>
      <BasicMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        description={description}
      />
      <TwitterCardMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <OpenGraphMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={date}
        author={authorName}
        description={description}
      />
      <div className={"container"}>
        <article>
          <header>
            <h1>{title}</h1>
            <div className={"metadata"}>
              <div>
                <Date date={date} />
              </div>
              <div>
                <Author author={author} />
              </div>
            </div>
          </header>
          <div className={styles.content}>{hydrate(source, { components })}</div>
          <ul className={"tag-list"}>
            {tags.map((it, i) => (
              <li key={i}>
                <TagButton tag={it} />
              </li>
            ))}
          </ul>
        </article>
        <footer>
          <div className={"social-list"}>
            <SocialList />
          </div>
          <Copyright />
        </footer>
      </div>
      <style jsx>
        {`
            .container {
              display: block;
              max-width: 36rem;
              width: 100%;
              margin: 0 auto;
              padding: 0 1.5rem;
              box-sizing: border-box;
            }
            .metadata div {
              display: inline-block;
              margin-right: 0.5rem;
            }
            article {
              flex: 1 0 auto;
            }
            h1 {
              margin: 0 0 0.5rem;
              font-size: 2.25rem;
            }
            .tag-list {
              list-style: none;
              text-align: right;
              margin: 1.75rem 0 0 0;
              padding: 0;
            }
            .tag-list li {
              display: inline-block;
              margin-left: 0.5rem;
            }
            .social-list {
              margin-top: 3rem;
              text-align: center;
            }

            @media (min-width: 769px) {
              .container {
                display: flex;
                flex-direction: column;
              }
            }
          `}
      </style>
      <style global jsx>
        {`
            /* Syntax highlighting */
            .token.comment,
            .token.prolog,
            .token.doctype,
            .token.cdata,
            .token.plain-text {
              color: #6a737d;
            }

            .token.atrule,
            .token.attr-value,
            .token.keyword,
            .token.operator {
              color: #d73a49;
            }

            .token.property,
            .token.tag,
            .token.boolean,
            .token.number,
            .token.constant,
            .token.symbol,
            .token.deleted {
              color: #22863a;
            }

            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin,
            .token.inserted {
              color: #032f62;
            }

            .token.function,
            .token.class-name {
              color: #6f42c1;
            }

            /* language-specific */

            /* JSX */
            .language-jsx .token.punctuation,
            .language-jsx .token.tag .token.punctuation,
            .language-jsx .token.tag .token.script,
            .language-jsx .token.plain-text {
              color: #24292e;
            }

            .language-jsx .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-jsx .token.tag .token.class-name {
              color: #005cc5;
            }

            .language-jsx .token.tag .token.script-punctuation,
            .language-jsx .token.attr-value .token.punctuation:first-child {
              color: #d73a49;
            }

            .language-jsx .token.attr-value {
              color: #032f62;
            }

            .language-jsx span[class="comment"] {
              color: pink;
            }

            /* HTML */
            .language-html .token.tag .token.punctuation {
              color: #24292e;
            }

            .language-html .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-html .token.tag .token.attr-value,
            .language-html
              .token.tag
              .token.attr-value
              .token.punctuation:not(:first-child) {
              color: #032f62;
            }

            /* CSS */
            .language-css .token.selector {
              color: #6f42c1;
            }

            .language-css .token.property {
              color: #005cc5;
            }
          `}
      </style>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pages = fs.readdirSync(path.join(process.cwd(), 'src', 'markdown', 'pages')).map(page => page.slice(0, page.length - 4))
  const filePath = path.join(process.cwd(), 'src', 'markdown', 'posts', `${params.slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const matterResult = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  const mdxSource = await renderToString(matterResult.content, { components })
  const tagsFile = fs.readFileSync(
    path.join(process.cwd(), "meta", "tags.yml"),
    "utf-8"
  );
  const { tags } = yaml.safeLoad(tagsFile, { schema: yaml.JSON_SCHEMA }) as { tags: TagContent[] };
  const authorsFile = fs.readFileSync(
    path.join(process.cwd(), "meta", "authors.yml"),
    "utf-8"
  );
  const { authors } = yaml.safeLoad(authorsFile, { schema: yaml.JSON_SCHEMA }) as { authors: AuthorContent[] };
  return {
    props: {
      source: mdxSource,
      ...matterResult.data,
      tags: tags.filter(tag => matterResult.data.tags.includes(tag.slug) ),
      authors: authors.find(author => matterResult.data.author === author.slug),
      pages
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = fs.readdirSync(path.join(process.cwd(), 'src', 'markdown', 'posts')).map(page => page.slice(0, page.length - 4))
  const paths = pages.map(page => ({ params: { slug: page } }))
  return {
    paths: paths,
    fallback: false,
  };
};
