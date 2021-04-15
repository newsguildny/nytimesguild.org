import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/PublicSans/variable/Public-Sans-Roman-VF.ttf"
            as="font"
            crossOrigin=""
          />
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `(function(f, a, t, h, o, m){
                a[h]=a[h]||function(){
                  (a[h].q=a[h].q||[]).push(arguments)
                };
                o=f.createElement('script'),
                m=f.getElementsByTagName('script')[0];
                o.async=1; o.src=t; o.id='fathom-script';
                m.parentNode.insertBefore(o,m)
              })(document, window, '//fathom.shanemoore.me/tracker.js', 'fathom');
              fathom('set', 'siteId', 'JJDAK');
              fathom('trackPageview');`,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
