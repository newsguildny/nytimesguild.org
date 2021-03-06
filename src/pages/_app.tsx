import { AppProps } from 'next/app';
import Head from 'next/head';
import { provideStaticContext } from 'next-static-context/app';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { bodyText, link, rule, secondaryHeadingText } from '../lib/styles/tokens/colors';
import { sansSerif, serif, serifSizes } from '../lib/styles/tokens/fonts';
import 'lite-youtube-embed/src/lite-yt-embed.css';
import 'prismjs/themes/prism-okaidia.css';

function App({ Component, pageProps }: AppProps) {
  // For now, we'd like to hide header/footer on The Table's landing page
  const pageContext = `${pageProps?.context}` || '';
  const showChrome = !pageContext.includes('the-table');

  return (
    <>
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
      {showChrome && <Navigation slug={pageProps.slug} />}
      <Component {...pageProps} />
      {showChrome && <Footer />}
      <style jsx global>{`
        @supports not (font-variation-settings: 'wdth' 115) {
          @font-face {
            font-family: ${serif};
            font-display: swap;
            src: url('/fonts/Crimson_Pro/webfonts/crimson-pro-v13-latin-regular.woff2')
              format('woff2');
            font-style: normal;
          }

          @supports (font-variation-settings: 'wdth' 115) {
            @font-face {
              font-family: ${serif};
              font-display: swap;
              src: url('/fonts/Crimson_Pro/variable/CrimsonPro-VariableFont_wght.ttf')
                format('truetype-variations');
              font-style: normal;
              font-weight: 100 900;
            }
          }
        }

        @supports not (font-variation-settings: 'wdth' 115) {
          @font-face {
            font-family: ${sansSerif};
            font-display: swap;
            src: url('/fonts/PublicSans/webfonts/PublicSans-Regular.woff2') format('woff2');
            font-style: normal;
            font-weight: 400;
          }

          @font-face {
            font-family: ${sansSerif};
            font-display: swap;
            src: url('/fonts/PublicSans/webfonts/PublicSans-SemiBold.woff2') format('woff2');
            font-style: normal;
            font-weight: 600;
          }

          @font-face {
            font-family: ${sansSerif};
            font-display: swap;
            src: url('/fonts/PublicSans/webfonts/PublicSans-Bold.woff2') format('woff2');
            font-style: normal;
            font-weight: 700;
          }
        }

        @supports (font-variation-settings: 'wdth' 115) {
          @font-face {
            font-family: ${sansSerif};
            font-display: swap;
            src: url('/fonts/PublicSans/variable/Public-Sans-Roman-VF.ttf')
              format('truetype-variations');
            font-style: normal;
            font-weight: 100 900;
          }
        }

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
        main > .mdx-wrapper > *,
        main > :not(.mdx-wrapper) {
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
          main > .mdx-wrapper > *,
          main > :not(.mdx-wrapper) {
            max-width: 47rem;
            margin-left: 5rem;
            margin-right: 5rem;
          }
        }
      `}</style>
    </>
  );
}

export default provideStaticContext(App);
