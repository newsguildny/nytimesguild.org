import { AppProps } from 'next/app';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function AppWithContext({
  Component,
  pageProps: { pagesMetadata, ...pageProps },
}: AppProps) {
  return (
    <>
      {pagesMetadata && <Navigation activeSlug={pageProps.slug} pagesMetadata={pagesMetadata} />}
      <Component {...pageProps} />
      <Footer />
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

          --nyt-sans-serif-large: 1.125rem;
          --nyt-sans-serif-medium: 1rem;
          --nyt-sans-serif-small: 0.875rem;
        }

        :global(main) > * {
          padding: 0 2rem;
        }

        @media (min-width: 769px) {
          body {
            --nyt-serif-large: 4.25rem;
            --nyt-serif-medium: 2.75rem;
            --nyt-serif-small: 1.5rem;

            --nyt-sans-serif-large: 1.375rem;
            --nyt-sans-serif-medium: 1.125rem;
            --nyt-sans-serif-small: 1rem;
          }
          :global(main) > * {
            max-width: 57rem;
            padding: 0 5rem;
          }
        }
      `}</style>
    </>
  );
}
