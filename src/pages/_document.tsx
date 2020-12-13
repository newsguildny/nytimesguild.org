import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/PublicSans/variations/Public-Sans-Roman-VF.ttf"
            as="font"
            crossOrigin=""
          />
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
