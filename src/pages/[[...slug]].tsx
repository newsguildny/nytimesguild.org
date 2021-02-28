import { GetStaticProps, GetStaticPaths } from 'next';
import { MdxSource } from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Head from 'next/head';
import YouTube from '../components/YouTube';
import { getPageData, getPagesMetadata } from '../lib/pages';
import { withNav } from '../lib/withNav';
import Navigation from '../components/Navigation';
import CallToAction from '../components/CallToAction';
import { Heading1, Heading2, Heading3, Paragraph, HorizontalRule } from '../components/Markdown';
import { headerBackground, headerText } from '../styles/tokens/colors';
import { serif } from '../styles/tokens/fonts';

interface Props {
  slug: string;
  source: MdxSource;
  title: string;
  seoHeadline: string;
}

const components = {
  Navigation,
  CallToAction,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  hr: HorizontalRule,
  YouTube,
};

const Page = ({ slug, source, title, seoHeadline }: Props) => {
  const isHome = slug === 'index';
  const content = hydrate(source, { components });
  return (
    <>
      <Head>
        <title>{title} - The New York Times Guild</title>
      </Head>
      {isHome && (
        <header>
          <div className="mobile-header">
            <p>
              We&apos;re building
              <ul>
                <li>
                  A <strong>diverse and equitable</strong> New York Times
                </li>
                <li className="justified-header-line">
                  A <strong>transparent and inclusive</strong> media industry
                </li>
                <li className="justified-header-line">
                  A <strong>stronger and united</strong> workplace
                </li>
              </ul>
            </p>
            <div className="header-conclusion">
              <p>We have more power together than we do apart.</p>
              <p>
                <strong>We are the Times-Guild.</strong>
              </p>
            </div>
          </div>
          <div className="desktop-header">
            <p>
              We&apos;re building a <strong>diverse and equitable</strong> New York Times
              <p className="justified-header-line">
                a <strong>transparent and inclusive</strong> media industry
              </p>
              <p className="justified-header-line">
                a <strong>stronger and united</strong> workplace
              </p>
            </p>
            <div className="header-conclusion">
              <p>We have more power together than we do apart.</p>
              <p>
                <strong>We are the Times-Guild.</strong>
              </p>
            </div>
          </div>
        </header>
      )}
      <main>
        {seoHeadline ? (
          <section>
            <h1>{seoHeadline}</h1>
            {content}
          </section>
        ) : (
          content
        )}
      </main>
      <style jsx>
        {`
          h1 {
            display: none;
          }
          header {
            padding: 1rem 1.125rem 2.75rem;
            font-family: ${serif};
            font-size: 1.5rem;
            line-height: 2rem;
            background-color: ${headerBackground};
            color: ${headerText};
          }
          .desktop-header {
            display: none;
          }
          @media (min-width: 1009px) {
            .mobile-header {
              display: none;
            }
            .desktop-header {
              display: block;
            }
            header {
              padding: 3rem 5rem 6rem;
              font-size: 2.25rem;
              line-height: 2.875rem;
            }
            header p:first-child {
              margin-top: 0;
            }
            header .justified-header-line {
              margin: 0 0 0 13.7rem;
            }
            header strong {
              font-weight: 600;
            }
            .header-conclusion > p {
              margin: 0;
            }
            @media (min-width: 769px) {
              main {
              max-width: 47rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<Props, { slug: [string] }> = async ({ params }) => {
  const slug = params?.slug?.[0] || 'index';
  const { source, title, seoHeadline } = await getPageData(slug);
  return withNav({
    props: {
      slug,
      source,
      title,
      seoHeadline: seoHeadline ?? null,
    },
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pagesMetadata = getPagesMetadata();
  const paths = pagesMetadata.map(({ slug }) => ({
    params: { slug: slug === 'index' ? [] : [slug] },
  }));
  return {
    paths,
    fallback: false,
  };
};
