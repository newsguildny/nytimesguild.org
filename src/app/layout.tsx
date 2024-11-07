import "lite-youtube-embed/src/lite-yt-embed.css";
import "prismjs/themes/prism-okaidia.css";
import { crimsonPro } from "./fonts";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={crimsonPro.className}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.webp"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.webp"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.webp"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff4040" />
        <meta name="apple-mobile-web-app-title" content="NYT Guild" />
        <meta name="msapplication-TileColor" content="#ff4040" />
        <meta name="theme-color" content="#ff4040" />
        <meta
          name="og:image"
          content="https://nytimesguild.org/og-image.webp"
        />
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
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

            --nyt-sans-serif-font: 'Public Sans';
            --nyt-serif-font: 'Crimson Pro';

            --nyt-background-color: #fff;
            --nyt-header-text-color: #fff;
            --nyt-secondary-background-color: #f3f3f3;
            --nyt-rule-color: #dedede;
            --nyt-body-text-color: #666;
            --nyt-secondary-heading-text-color: #666;
            --nyt-primary-heading-text-color: #ff4040;
            --nyt-accent-color: #ff4040;
            --nyt-link-color: #ff4040;
            --nyt-header-background-color: #ff4040;
            --nyt-yes-vote-color: #ff4040;
            --nyt-no-vote-color: #B42F2F;
            --nyt-table-border-color: #C4C4C4;
            --nyt-breaking-background-color: #FFD3D3;
            --nyt-breaking-border-color: #FF4040;

            font-size: var(--nyt-serif-small);
            font-weight: 400;
            color: var(--nyt-body-text-color);
          }

          /* Code blocks default to Consolas/monospace, which looks
           much larger than our serif and sans serif fonts, so
           we pick a smaller font size. */
          pre[class*="language-"] {
            font-size: var(--nyt-sans-serif-small) !important;
          }

          main:not(.contract-campaign) > :not(.full-bleed) {
            margin-left: 2rem;
            margin-right: 2rem;
          }

          a {
            color: var(--nyt-link-color);
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
            font-size: var(--nyt-serif-medium);
            font-weight: 200;
            color: var(--nyt-secondary-heading-text-color);
          }

          h2 {
            margin: 3rem 0 1.5rem;
            font-size: var(--nyt-serif-large);
            font-weight: 200;
            color: var(--nyt-secondary-heading-text-color);
          }

          hr {
            border: 0.0625rem solid var(--nyt-rule-color);
            margin: 3rem 5rem;
          }

          ul {
            // middle dot followed by en space
            list-style-type: "${"\\00B7\\2002"}";
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
            main:not(.contract-campaign) > :not(.full-bleed) {
              max-width: 47rem;
              margin-left: 5rem;
              margin-right: 5rem;
            }
          }
          .contract-campaign > :not(.full-bleed) {
            max-width: 47rem;
            margin-left: 2rem;
            margin-right: 2rem;
          }
          @media (min-width: 769px) {
            .contract-campaign > :not(.full-bleed) {
              margin-left: auto;
              margin-right: auto;
            }
          }
        `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
