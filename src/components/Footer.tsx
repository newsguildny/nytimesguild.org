import { FC } from 'react';
import TwitterIcon from './icons/TwitterIcon';
import MailIcon from './icons/MailIcon';
import { Heading3, Paragraph } from './Markdown';

const Footer: FC = () => (
  <footer>
    <Heading3>Contact Us</Heading3>
    <Paragraph>
      <a href="mailto:example@newsguild.com">
        <MailIcon /> example@newsguild.com
      </a>
    </Paragraph>
    <Paragraph>
      <a href="https://twitter.com/nyguild">
        <TwitterIcon /> @nytimesguild
      </a>
    </Paragraph>
    <style jsx>
      {`
        footer {
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: #f3f3f3;
          text-align: center;
          width: 100%;
          padding: 5em 0 5em 0;
          color: #666;
        }

        a {
          text-decoration: none;
          color: #666;
          font-family: 'Public Sans';
        }
        a:visited {
          color: #666;
        }
      `}
    </style>
  </footer>
);

export default Footer;
