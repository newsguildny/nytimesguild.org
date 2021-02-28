import { headerBackground, headerText } from '../styles/tokens/colors';
import { serif, serifSizes } from '../styles/tokens/fonts';

interface Props {
  heading: string;
  subheading: string;
}

const PageHeader = ({ heading, subheading }: Props) => (
  <>
    <header>
      <h1>{heading}</h1>
      <p className="subheading">{subheading}</p>
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
      }
      // @media (min-width: 769px) {

      // }
    `}</style>
  </>
);

export default PageHeader;
