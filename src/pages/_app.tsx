import { AppProps } from 'next/app';
import Head from 'next/head';
import { bodyText, link, rule, secondaryHeadingText } from '../lib/styles/tokens/colors';
import { serif, serifSizes } from '../lib/styles/tokens/fonts';
import 'lite-youtube-embed/src/lite-yt-embed.css';
import 'prismjs/themes/prism-okaidia.css';
import { StaticContext } from '../lib/staticContext/StaticContext';

export default function App({
  Component,
  pageProps,
}: AppProps<{
  context?: string;
  slug?: string;
  staticContext?: Record<string, unknown>;
}>) {
  return (
    <StaticContext.Provider value={pageProps.staticContext ?? {}}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.webp" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.webp" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.webp" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff4040" />
        <meta name="apple-mobile-web-app-title" content="NYT Guild" />
        <meta name="msapplication-TileColor" content="#ff4040" />
        <meta name="theme-color" content="#ff4040" />
        <meta name="og:image" content="https://nytimesguild.org/og-image.webp" />
      </Head>
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          margin: 0;
          --nyt-serif-extra-large: 2.625rem;
          --nyt-serif-large: 2rem;
          --nyt-serif-medium: 1.5rem;
          --nyt-serif-small: 1.25rem;
          --nyt-serif-extra-small: 0.875rem;

          --nyt-sans-serif-extra-large: 1.25rem;
          --nyt-sans-serif-large: 1.125rem;
          --nyt-sans-serif-medium: 1rem;
          --nyt-sans-serif-small: 0.875rem;
          --nyt-sans-serif-extra-small: 0.75rem;

          font-family: ${serif};
          font-size: ${serifSizes.small};
          font-weight: 400;
          color: ${bodyText};
        }

        // Code blocks default to Consolas/monospace, which looks
        // much larger than our serif and sans serif fonts, so
        // we pick a smaller font size.
        pre[class*='language-'] {
          font-size: var(--nyt-sans-serif-small);
        }

        // next-mdx-remote initially renders MDX content into
        // a div on the server, then replaces that with a
        // React Fragment on the client. This leads to a flash
        // of incorrectly styled content unless we handle this
        // specific case here.
        main:not(.contract-campaign) > .mdx-wrapper > *,
        main:not(.contract-campaign) > :not(.mdx-wrapper) {
          margin-left: 2rem;
          margin-right: 2rem;
        }

        a {
          color: ${link};
          word-wrap: break-word;
        }

        p,
        li {
          line-height: 1.3em;
        }

        h1 {
          line-height: 1em;
        }

        h3 {
          margin: 2rem 0 1rem;
          font-size: ${serifSizes.medium};
          font-weight: 200;
          color: ${secondaryHeadingText};
        }

        h2 {
          margin: 3rem 0 1.5rem;
          font-size: ${serifSizes.large};
          font-weight: 200;
          color: ${secondaryHeadingText};
        }

        hr {
          border: 0.0625rem solid ${rule};
          margin: 3rem 5rem;
        }

        ul {
          // middle dot followed by en space
          list-style-type: '${'\\00B7\\2002'}';
        }

        img.regular-width {
          width: 100%;
        }

        @media (min-width: 769px) {
          body {
            --nyt-serif-extra-large: 4.25rem;
            --nyt-serif-large: 2.75rem;
            --nyt-serif-medium: 2rem;
            --nyt-serif-small: 1.5rem;
            --nyt-serif-extra-small: 0.875rem;

            --nyt-sans-serif-extra-large: 1.5rem;
            --nyt-sans-serif-large: 1.375rem;
            --nyt-sans-serif-medium: 1.125rem;
            --nyt-sans-serif-small: 1rem;
            --nyt-sans-serif-extra-small: 0.75rem;
          }
          main:not(.contract-campaign) > .mdx-wrapper > *,
          main:not(.contract-campaign) > :not(.mdx-wrapper) {
            max-width: 47rem;
            margin-left: 5rem;
            margin-right: 5rem;
          }
        }
        .contract-campaign > .mdx-wrapper > *,
        .contract-campaign > :not(.mdx-wrapper) {
          max-width: 47rem;
          margin-left: 2rem;
          margin-right: 2rem;
        }
        @media (min-width: 769px) {
          .contract-campaign > .mdx-wrapper > *,
          .contract-campaign > :not(.mdx-wrapper) {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </StaticContext.Provider>
  );
}
