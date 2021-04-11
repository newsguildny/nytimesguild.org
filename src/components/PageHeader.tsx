import { headerBackground, headerText } from '../lib/styles/tokens/colors';
import { serif, serifSizes } from '../lib/styles/tokens/fonts';

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
        header > * {
          max-width: 47rem;
          margin-left: auto;
          margin-right: auto;
        }
        h1 {
          margin: 0;
          font-weight: 300;
          font-size: ${serifSizes.extraLarge};
        }
        .subheading {
          margin-top: 1.75rem;
          font-size: ${serifSizes.small};
          color: ${headerText};
        }
      `}</style>
    </>
  );
}
