import 'normalize.css';
import { AppProps } from 'next/app';
import Navigation from '../components/Navigation';
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import '../../public/styles/global.css';

export default function AppWithContext({
  Component,
  pageProps: { pagesMetadata, ...pageProps },
}: AppProps) {
  return (
    <>
      <Navigation pagesMetadata={pagesMetadata} />
      <Component {...pageProps} />
      <style jsx global>{`
        @font-face {
          font-family: 'Public Sans';
          src: url('/fonts/PublicSans/webfonts/PublicSans-Regular.woff2') format('woff2');
          font-style: normal;
        }

        @supports (font-variation-settings: 'wdth' 115) {
          @font-face {
            font-family: 'Public Sans';
            src: url('/fonts/PublicSans/variable/Public-Sans-Roman-VF.ttf')
              format('truetype-variations');
            font-style: normal;
          }
        }

        body {
          padding: 0 2rem;
        }
      `}</style>
    </>
  );
}
