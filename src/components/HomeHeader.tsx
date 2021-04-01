import { headerBackground, headerText } from '../lib/styles/tokens/colors';

export function HomeHeader() {
  return (
    <>
      <header>
        <div className="mobile-header">
          <p>We&rsquo;re building</p>
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
          <div className="header-conclusion">
            <p>We have more power together than we do apart.</p>
            <p>
              <strong>We are the Times-Guild.</strong>
            </p>
          </div>
        </div>
        <div className="desktop-header">
          <p>
            We&rsquo;re building a <strong>diverse and equitable</strong> New York Times
          </p>
          <p className="justified-header-line">
            a <strong>transparent and inclusive</strong> media industry
          </p>
          <p className="justified-header-line">
            a <strong>stronger and united</strong> workplace
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
          background-color: ${headerBackground};
          color: ${headerText};
        }
        p,
        li {
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 300;
          color: ${headerText};
        }
        .desktop-header {
          display: none;
        }
        @media (min-width: 769px) {
          .mobile-header {
            display: none;
          }
          .desktop-header {
            display: block;
          }
          header {
            padding: 3rem 5rem 6rem;
          }
          p {
            font-size: 1.6rem;
            line-height: 2rem;
          }
          header p:first-child {
            margin: 0;
          }
          header .justified-header-line {
            margin: 0 0 0 9.8rem;
          }
          header strong {
            font-weight: 600;
          }
          .header-conclusion > p:first-child {
            margin: 1em 0 0;
          }
          .header-conclusion > p {
            margin: 0;
          }
        }
        @media (min-width: 1009px) {
          p {
            font-size: 2.25rem;
            line-height: 2.875rem;
          }
          header .justified-header-line {
            margin: 0 0 0 13.7rem;
          }
        }
      `}</style>
    </>
  );
}
