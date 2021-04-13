import { TwitterIcon } from './svgs/TwitterIcon';
import { MailIcon } from './svgs/MailIcon';
import { sansSerif, serifSizes, serif, sansSerifSizes } from '../lib/styles/tokens/fonts';
import { bodyText, secondaryHeadingText, secondaryBackground } from '../lib/styles/tokens/colors';

export function Footer() {
  return (
    <footer>
      <h3>Contact Us</h3>
      <p>
        <a href="mailto:nyttech@nyguild.org">
          <MailIcon /> nyttech@nyguild.org
        </a>
      </p>
      <p>
        <a href="https://twitter.com/NYTGuildTech">
          <TwitterIcon /> @NYTimesGuildTech
        </a>
      </p>
      <style jsx>
        {`
          footer {
            margin-top: 4rem;
            background-color: ${secondaryBackground};
            text-align: center;
            width: 100%;
            padding: 20vh 0;
            color: ${secondaryHeadingText};
          }

          footer h3 {
            font-family: ${serif};
            font-size: ${serifSizes.large};
            font-weight: 200;
          }

          a {
            text-decoration: none;
            color: ${bodyText};
            font-family: ${sansSerif};
            font-size: ${sansSerifSizes.large};
          }
          a:visited {
            color: ${bodyText};
          }
          a > :global(svg) {
            margin-right: 0.75rem;
          }

          @media (min-width: 769px) {
            footer {
              margin-top: 10rem;
            }
          }
        `}
      </style>
    </footer>
  );
}
