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
          margin: 3rem 0 1.5rem;
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
          margin: 2rem 0 1rem;
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
          line-height: 1.3em;
          font-weight: 400;
          color: ${bodyText};
        }
      `}
    </style>
  </>
);

interface FullBleedImageProps {
  src: string;
  alt: string;
  title: string;
}

export const FullBleedImage = ({ src, alt, title }: FullBleedImageProps) => (
  <>
    <img src={src} alt={alt} title={title} />
    <style jsx>{`
      img {
        margin-top: 3rem;
        padding: 0;
        width: 100%;
        max-width: 100%;
      }
    `}</style>
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
