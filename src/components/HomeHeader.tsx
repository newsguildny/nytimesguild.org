import { serif } from '../styles/tokens/fonts';
import { headerBackground, headerText } from '../styles/tokens/colors';

const HomeHeader = () => (
  <>
    <header>
      <div className="mobile-header">
        <p>
          We&apos;re building
          <ul>
            <li>
              A <strong>diverse and equitable</strong> New York Times
            </li>
            <li className="justified-header-line">
              A <strong>transparent and inclusive</strong> media industry
            </li>
            <li className="justified-header-line">
              A <strong>stronger and united</strong> workplace
            </li>
          </ul>
        </p>
        <div className="header-conclusion">
          <p>We have more power together than we do apart.</p>
          <p>
            <strong>We are the Times-Guild.</strong>
          </p>
        </div>
      </div>
      <div className="desktop-header">
        <p>
          We&apos;re building a <strong>diverse and equitable</strong> New York Times
          <p className="justified-header-line">
            a <strong>transparent and inclusive</strong> media industry
          </p>
          <p className="justified-header-line">
            a <strong>stronger and united</strong> workplace
          </p>
        </p>
        <div className="header-conclusion">
          <p>We have more power together than we do apart.</p>
          <p>
            <strong>We are the Times-Guild.</strong>
          </p>
        </div>
      </div>
    </header>
    <style jsx>{`
      header {
        padding: 1rem 1.125rem 2.75rem;
        font-size: 1.5rem;
        line-height: 2rem;
        font-family: ${serif};
        background-color: ${headerBackground};
        color: ${headerText};
      }
      .desktop-header {
        display: none;
      }
      @media (min-width: 1009px) {
        .mobile-header {
          display: none;
        }
        .desktop-header {
          display: block;
        }
        header {
          padding: 3rem 5rem 6rem;
          font-size: 2.25rem;
          line-height: 2.875rem;
        }
        header p:first-child {
          margin-top: 0;
        }
        header .justified-header-line {
          margin: 0 0 0 13.7rem;
        }
        header strong {
          font-weight: 600;
        }
        .header-conclusion > p {
          margin: 0;
        }
      }
    `}</style>
  </>
);

export default HomeHeader;
