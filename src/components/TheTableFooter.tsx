import Link from 'next/link';

export interface TeaserProps {
  date: string;
  headline: string;
  issue: string;
  slug: string;
}

interface Props {
  teasers?: Array<TeaserProps>;
}

const TheTableFooter = ({ teasers }: Props) => {
  return (
    <>
      <footer>
        {teasers &&
          teasers.map(({ date, headline, issue, slug }) => (
            <div className="link">
              <Link href={`/the-table/${slug}`}>
                <a>{headline}</a>
              </Link>
              <div>{date}</div>
              <div>{issue}</div>
            </div>
          ))}
      </footer>
      <style jsx>{`
        @media (min-width: 769px) {
        }

        @media (min-width: 1024px) {
        }
      `}</style>
    </>
  );
};

export default TheTableFooter;
