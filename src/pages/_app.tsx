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
        }

        :global(main) {
          padding: 0 2rem;
        }

        @media (min-width: 769px) {
          :global(main) {
            padding: 0 5rem;
          }
        }
      `}</style>
    </>
  );
}
