import 'normalize.css';
import { AppProps } from 'next/app';
import Navigation from '../components/Navigation';
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import '../../public/styles/global.css';

export default function AppWithContext({
  Component,
  pageProps: { pagesMetadata, ...pageProps },
  router,
}: AppProps) {
  const activeSlug = router.asPath.split('/')[1] || '';
  return (
    <>
      <Navigation activeSlug={activeSlug} pagesMetadata={pagesMetadata} />
      <Component {...pageProps} />
      <style jsx global>{`
        @font-face {
          font-family: 'Public Sans';
          src: url('/fonts/PublicSans/webfonts/PublicSans-Regular.woff2') format('woff2');
          font-style: normal;
        }

        @font-face {
          font-family: 'Public Sans';
          src: url('/fonts/PublicSans/webfonts/PublicSans-Bold.woff2') format('woff2');
          font-style: normal;
          font-weight: 600;
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
          padding: 0 2rem;
        }
      `}</style>
    </>
  );
}
