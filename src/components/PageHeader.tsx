import { headerBackground, headerText } from '../styles/tokens/colors';
import { serif, serifSizes } from '../styles/tokens/fonts';

interface Props {
  heading?: string;
  subheading?: string;
}

export function PageHeader({ heading, subheading }: Props) {
  return (
    <>
      <header>
        {heading && <h1>{heading}</h1>}
        {subheading && <p className="subheading">{subheading}</p>}
      </header>
      <style jsx>{`
        header {
          padding: 1rem 1.125rem 2.75rem;
          font-family: ${serif};
          background-color: ${headerBackground};
          color: ${headerText};
          text-align: center;
        }
        h1 {
          margin: 0;
          font-weight: 300;
          font-size: ${serifSizes.large};
        }
        .subheading {
          margin-top: 0.875rem;
          font-size: ${serifSizes.small};
          color: ${headerText};
        }
      `}</style>
    </>
  );
}
