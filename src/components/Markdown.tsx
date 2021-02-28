import { Children, ReactNode, ReactElement, cloneElement } from 'react';
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

function isImageChild(
  children: ReactNode
): children is ReactElement<{ className?: string; originalType: 'img' }> {
  if (typeof children !== 'object') {
    return false;
  }
  const child = Children.only(children);
  if (!child) {
    return false;
  }
  if (!('props' in child)) {
    return false;
  }
  if (!('originalType' in child.props)) {
    return false;
  }
  return child.props.originalType === 'img';
}

export const Paragraph = ({ children }: Props) => (
  <>
    <p className={isImageChild(children) ? 'image-wrapper' : ''}>
      {isImageChild(children) ? cloneElement(children, { className: 'full-bleed' }) : children}
    </p>
    <style jsx>
      {`
        p {
          font-family: ${serif};
          font-size: ${serifSizes.small};
          font-weight: 400;
          color: ${bodyText};
        }

        p.image-wrapper {
          padding: 0;
          width: 100%;
          max-width: 100%;
        }

        :global(img.full-bleed) {
          width: 100%;
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
