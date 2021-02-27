import { FC } from 'react';
import TwitterIcon from './icons/TwitterIcon';
import MailIcon from './icons/MailIcon';
import { sansSerif, serifSizes, serif, sansSerifSizes } from '../styles/tokens/fonts';
import { bodyText, secondaryHeadingText, secondaryBackground } from '../styles/tokens/colors';

const Footer: FC = () => (
  <footer>
    <h3>Contact Us</h3>
    <p>
      <a href="mailto:example@newsguild.com">
        <MailIcon /> example@newsguild.com
      </a>
    </p>
    <p>
      <a href="https://twitter.com/nyguild">
        <TwitterIcon /> @nytimesguild
      </a>
    </p>
    <style jsx>
      {`
        footer {
          background-color: ${secondaryBackground};
          text-align: center;
          width: 100%;
          padding: 5em 0 5em 0;
          color: ${secondaryHeadingText};
        }

        footer h3 {
          font-family: ${serif};
          font-size: ${serifSizes.medium};
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
      `}
    </style>
  </footer>
);

export default Footer;
