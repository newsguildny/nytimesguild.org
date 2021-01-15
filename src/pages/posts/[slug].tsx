import { MdxSource } from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import InstagramEmbed from 'react-instagram-embed';
import { YouTube } from 'mdx-embed';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Component } from 'react';
import Author from '../../components/Author';
import Copyright from '../../components/Copyright';
import Date from '../../components/Date';
import Layout from '../../components/Layout';
import BasicMeta from '../../components/meta/BasicMeta';
import JsonLdMeta from '../../components/meta/JsonLdMeta';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../components/meta/TwitterCardMeta';
import TagButton from '../../components/TagButton';
import { AuthorContent, getAuthors } from '../../lib/authors';
import { getTags, TagContent } from '../../lib/tags';
import { getPostData, getPostSlugs } from '../../lib/posts';
import { withNav } from '../../lib/withNav';

const components = {
  InstagramEmbed: (InstagramEmbed as unknown) as Component,
  YouTube: (YouTube as unknown) as Component,
  TwitterTweetEmbed,
};

interface Props {
  title: string;
  dateString: string;
  slug: string;
  tags: TagContent[];
  author: AuthorContent;
  source: MdxSource;
}

export default function Post({ title, dateString, slug, author, tags, source }: Props) {
  const keywords = tags.map((tag) => tag.slug);
  const authorName = author.name;
  const date = new globalThis.Date(dateString);
  return (
    <Layout>
      <BasicMeta url={`/posts/${slug}`} title={title} keywords={keywords} />
      <TwitterCardMeta url={`/posts/${slug}`} title={title} />
      <OpenGraphMeta url={`/posts/${slug}`} title={title} />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={date}
        author={authorName}
      />
      <div className="container">
        <article>
          <header>
            <h1>{title}</h1>
            <div className="metadata">
              <div>
                <Date date={date} />
              </div>
              <div>
                <Author author={author} />
              </div>
            </div>
          </header>
          <div>{hydrate(source, { components })}</div>
          <ul className="tag-list">
            {tags.map((it) => (
              <li key={it.slug}>
                <TagButton tag={it} />
              </li>
            ))}
          </ul>
        </article>
        <footer>
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

          .language-jsx span[class='comment'] {
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
          .language-html .token.tag .token.attr-value .token.punctuation:not(:first-child) {
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

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  const { date, title, slug, tags, author, source } = await getPostData(params!.slug);
  const allTags = getTags();
  const authors = getAuthors();
  return withNav({
    props: {
      dateString: date,
      title,
      slug,
      source,
      tags: tags ? allTags.filter(({ slug: tagSlug }) => tags.includes(tagSlug)) : [],
      author: authors.find(({ slug: authorSlug }) => author === authorSlug)! || {},
    },
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postTitles = getPostSlugs();
  const paths = postTitles.map((postTitle) => ({ params: { slug: postTitle } }));
  return {
    paths,
    fallback: false,
  };
};
