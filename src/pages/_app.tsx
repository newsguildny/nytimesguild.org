import 'normalize.css';
import { AppProps } from 'next/app';
import { PageTitlesContext } from '../lib/PageTitlesContext';
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import '../../public/styles/global.css';

export default function AppWithContext({
  Component,
  pageProps: { pageTitles, ...pageProps },
}: AppProps) {
  return (
    <PageTitlesContext.Provider value={pageTitles}>
      <Component {...pageProps} />
    </PageTitlesContext.Provider>
  );
}
