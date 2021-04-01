import { AppProps } from 'next/app';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import StaticContext, { StaticContextValue } from '../staticContext/StaticContext';
import { bodyText, rule, secondaryHeadingText } from '../styles/tokens/colors';
import { sansSerif, sansSerifSizes, serif, serifSizes } from '../styles/tokens/fonts';

interface PagePropsWithContext extends Record<string, unknown> {
  staticContext: StaticContextValue;
}

interface AppPropsWithContext extends AppProps {
  pageProps: PagePropsWithContext;
}

export default function AppWithContext({
  Component,
  pageProps: { staticContext = {}, ...pageProps },
}: AppPropsWithContext) {
  return (
    <>
      <StaticContext.Provider value={staticContext}>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </StaticContext.Provider>
      <style jsx global>{`
        @font-face {
          font-family: 'Crimson Pro';
          src: url('/fonts/Crimson_Pro/webfonts/crimson-pro-v13-latin-regular.woff2')
            format('woff2');
          font-style: normal;
        }

        @supports (font-variation-settings: 'wdth' 115) {
          @font-face {
            font-family: 'Crimson Pro';
            src: url('/fonts/Crimson_Pro/variable/CrimsonPro-VariableFont_wght.ttf')
              format('truetype-variations');
            font-style: normal;
            font-weight: 100 900;
          }
        }

        @font-face {
          font-family: 'Public Sans';
          src: url('/fonts/PublicSans/webfonts/PublicSans-Regular.woff2') format('woff2');
          font-style: normal;
          font-weight: 400;
        }

        @font-face {
          font-family: 'Public Sans';
          src: url('/fonts/PublicSans/webfonts/PublicSans-SemiBold.woff2') format('woff2');
          font-style: normal;
          font-weight: 600;
        }

        @font-face {
          font-family: 'Public Sans';
          src: url('/fonts/PublicSans/webfonts/PublicSans-Bold.woff2') format('woff2');
          font-style: normal;
          font-weight: 700;
        }

        @supports (font-variation-settings: 'wdth' 115) {
          @font-face {
            font-family: 'Public Sans';
            src: url('/fonts/PublicSans/variable/Public-Sans-Roman-VF.ttf')
              format('truetype-variations');
            font-style: normal;
            font-weight: 100 900;
          }
        }

        body {
          margin: 0;
          --nyt-serif-large: 2.625rem;
          --nyt-serif-medium: 2rem;
          --nyt-serif-small: 1.25rem;

          --nyt-sans-serif-extra-large: 1.25rem;
          --nyt-sans-serif-large: 1.125rem;
          --nyt-sans-serif-medium: 1rem;
          --nyt-sans-serif-small: 0.875rem;
        }

        // next-mdx-remote initially renders MDX content into
        // a div on the server, then replaces that with a
        // React Fragment on the client. This leads to a flash
        // of incorrectly styled content unless we handle this
        // specific case here.
        main > .mdx-wrapper > *,
        main > :not(.mdx-wrapper) {
          padding: 0 2rem;
        }

        p {
          font-family: ${serif};
          font-size: ${serifSizes.small};
          line-height: 1.3em;
          font-weight: 400;
          color: ${bodyText};
        }

        h3 {
          margin: 2rem 0 1rem;
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.large};
          font-weight: 700;
          color: ${secondaryHeadingText};
        }

        h2 {
          margin: 3rem 0 1.5rem;
          font-family: ${serif};
          font-size: ${serifSizes.medium};
          font-weight: 200;
          color: ${secondaryHeadingText};
        }

        hr {
          border: 0.0625rem solid ${rule};
          margin: 3rem 0;
        }

        @media (min-width: 769px) {
          body {
            --nyt-serif-large: 4.25rem;
            --nyt-serif-medium: 2.75rem;
            --nyt-serif-small: 1.5rem;

            --nyt-sans-serif-extra-large: 1.5rem;
            --nyt-sans-serif-large: 1.375rem;
            --nyt-sans-serif-medium: 1.125rem;
            --nyt-sans-serif-small: 1rem;
          }
          main > .mdx-wrapper > *,
          main > :not(.mdx-wrapper) {
            max-width: 47rem;
            padding: 0 5rem;
          }
        }
      `}</style>
    </>
  );
}
