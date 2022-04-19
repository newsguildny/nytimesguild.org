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
        <h2>Previous Issues</h2>
        {teasers &&
          teasers.map(({ date, headline, issue, slug, thumbnail }) => (
            <Link key={date} href={`/the-table/${slug}/`}>
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
          margin-top: 1rem;
          padding: 0 2rem 2rem 2rem;
          font-family: 'Public Sans';
          background-color: #ffebed;
          color: #490606;
        }

        h2 {
          font-weight: 700;
          text-align: center;
          color: #490606;
        }

        .link {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          padding-left: 1rem;
          border-left: solid 1px red;
        }

        .issueInfo {
          padding-top: 1rem;
        }

        @media (min-width: 769px) {
          .link {
            flex-direction: row;
          }

          img {
            max-height: 150px;
          }
        }

        @media (min-width: 1024px) {
          footer {
            margin-left: 2rem;
            margin-right: 2rem;
          }

          .issueInfo {
            padding-top: 0;
            padding-left: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default TheTableFooter;
