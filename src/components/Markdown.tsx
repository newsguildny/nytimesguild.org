import { ReactNode } from 'react';
import { bodyText, secondaryHeadingText, rule } from '../styles/tokens/colors';
import { sansSerif, sansSerifSizes, serif, serifSizes } from '../styles/tokens/fonts';

interface Props {
  children?: ReactNode;
}

export const Heading2 = ({ children }: Props) => (
  <>
    <h2>{children}</h2>
    <style jsx>
      {`
        h2 {
          margin: 3rem 0;
          font-family: ${serif};
          font-size: ${serifSizes.medium};
          font-weight: 200;
          color: ${secondaryHeadingText};
        }
      `}
    </style>
  </>
);

export const Heading3 = ({ children }: Props) => (
  <>
    <h3>{children}</h3>
    <style jsx>
      {`
        h3 {
          margin: 2rem 0;
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.large};
          font-weight: 700;
          color: ${secondaryHeadingText};
        }
      `}
    </style>
  </>
);

export const Paragraph = ({ children }: Props) => (
  <>
    <p>{children}</p>
    <style jsx>
      {`
        p {
          font-family: ${serif};
          font-size: ${serifSizes.small};
          font-weight: 400;
          color: ${bodyText};
        }
      `}
    </style>
  </>
);

export const HorizontalRule = () => (
  <>
    <hr />
    <style jsx>
      {`
        hr {
          border: 0.0625rem solid ${rule};
          margin: 3rem 0;
        }
      `}
    </style>
  </>
);
