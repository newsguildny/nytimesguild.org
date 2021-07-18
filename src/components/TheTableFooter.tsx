import Link from 'next/link';

export interface TeaserProps {
  date: string;
  headline: string;
  issue: string;
  slug: string;
  thumbnail?: string;
}

interface Props {
  teasers?: Array<TeaserProps>;
}

const TheTableFooter = ({ teasers }: Props) => {
  return (
    <>
      <footer>
        <h2>Previous Editions of The Table</h2>
        {teasers &&
          teasers.map(({ date, headline, issue, slug, thumbnail }) => (
            <Link key={date} href={`/the-table/${slug}`}>
              <div className="link">
                <img alt={`edition ${issue} thumbnail`} src={thumbnail} />
                <div className="issueInfo">
                  <a>{headline}</a>
                  <div>{date}</div>
                  <div>Issue {issue}</div>
                </div>
              </div>
            </Link>
          ))}
      </footer>
      <style jsx>{`
        footer {
          display: flex;
          flex-direction: column;
          margin: 1rem 0 3rem 0;
          padding: 1rem 0 3rem 0;
          font-family: 'Public Sans';
          background-color: #ffebed;
          color: #490606;
        }

        .link,
        h2 {
          display: flex;
          align-self: center;
        }

        h2 {
          font-weight: 700;
          color: #490606;
        }

        .link {
          cursor: pointer;
          padding-left: 1rem;
          margin-top: 2rem;
          border-left: solid 1px red;
        }

        .issueInfo {
          padding-left: 1rem;
        }

        img {
          max-height: 150px;
        }

        @media (min-width: 769px) {
        }

        @media (min-width: 1024px) {
          footer {
            margin-left: 2rem;
            margin-right: 2rem;
          }

          .link,
          h2 {
            min-width: 47rem;
          }
        }
      `}</style>
    </>
  );
};

export default TheTableFooter;
