import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serifSizes, sansSerif, sansSerifSizes } from '../lib/styles/tokens/fonts';
import { bodyText, noVote, tableBorder, yesVote } from '../lib/styles/tokens/colors';
import { PageHeader } from '../components/PageHeader';
import { formatPercentage, VoteCountBar } from '../components/vote-count/VoteCountBar';
import { getNavPagesMetadata, PageData } from '../lib/collections/pages';
import { PageLayout } from '../components/PageLayout';

interface Props {
  pagesMetadata: PageData[];
}

const VoteCounts = ({ pagesMetadata }: Props) => {
  const eligible = 622;
  const voted = 554;
  const yes = 524;
  const no = 29;
  const blank = 1;
  const neededToWin = 278;

  return (
    <>
      <Head>
        <title>Strike Authorization Vote (SAV) - The New York Times Guild</title>
        <meta name="og:title" content="Strike Authorization Vote (SAV)" />
        <meta name="og:type" content="website" />
      </Head>
      <PageLayout slug="tech-sav" pagesMetadata={pagesMetadata}>
        <PageHeader heading="Strike Authorization Vote (SAV)" />
        <main>
          <h2>About</h2>
          <p>
            The Times Tech Guild (The NewsGuild of New York, Local 31003, TNG/CWA) held a Strike
            Authorization Vote (SAV) on September 9-10, 2024.
          </p>
          <p>
            This vote was decided by a simple majority (50% +1 vote) and conducted online via{' '}
            <a href="https://www.voteges.com" target="_blank" rel="noopener noreferrer nofollow">
              GES
            </a>
            .
          </p>
          <p>
            The vote passed, with an overwhelming 95% of voting members authorizing the strike.
            Please refer to{' '}
            <a
              href="https://www.nyguild.org/post/new-york-times-tech-guild-votes-yes-to-strike"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              this press release
            </a>{' '}
            from The NewsGuild of New York for more.
          </p>
          {/* The vote count bar */}
          <h3 id="heading">Results</h3>
          <VoteCountBar yes={yes} no={no} total={voted} neededToWin={neededToWin} />

          {/* Yes / No votes table */}
          <table>
            <thead>
              <tr>
                <th aria-label="Vote category" className="category-column" />
                <th className="number-column">Votes</th>
                <th className="number-column">% of voters</th>
                <th className="number-column">% of eligible unit members</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="category-column yes-cell">
                  Yes <span className="drop-on-mobile">votes</span>
                </td>
                <td className="number-column">{yes}</td>
                <td className="number-column">{formatPercentage(yes, voted)}</td>
                <td className="number-column">{formatPercentage(yes, eligible)}</td>
              </tr>
              <tr>
                <td className="category-column no-cell">
                  No <span className="drop-on-mobile">votes</span>
                </td>
                <td className="number-column">{no}</td>
                <td className="number-column">{formatPercentage(no, voted)}</td>
                <td className="number-column">{formatPercentage(no, eligible)}</td>
              </tr>
              <tr>
                <td className="category-column no-cell">
                  Blank <span className="drop-on-mobile">votes</span>
                </td>
                <td className="number-column">{blank}</td>
                <td className="number-column">{formatPercentage(blank, voted)}</td>
                <td className="number-column">{formatPercentage(blank, eligible)}</td>
              </tr>
            </tbody>
          </table>

          {/* Total / contested ballots table */}
          <h3>Vote information</h3>
          <table>
            <tbody>
              <tr>
                <td className="category-column">
                  Total <span className="drop-on-mobile">votes</span>
                </td>
                <td className="number-column">{voted}</td>
              </tr>
              <tr>
                <td className="category-column">Eligible unit members</td>
                <td className="number-column">{eligible}</td>
              </tr>
            </tbody>
          </table>
        </main>
      </PageLayout>
      <style jsx>{`
        h3 {
          display: flex;
          margin-top: 5rem;
          align-items: center;
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.large};
          font-weight: 700;
        }
        table {
          width: calc(100% - 4rem);
          border-collapse: collapse;
          font-family: ${sansSerif};
          font-weight: 600;
          font-size: ${sansSerifSizes.large};
          color: black;
        }
        th {
          padding: 0.5rem 1rem;
          font-size: ${serifSizes.extraSmall};
          color: ${bodyText};
        }
        td {
          padding: 1rem;
          border-top: solid thin ${tableBorder};
          border-bottom: solid thin ${tableBorder};
        }
        td:first-of-type {
          border-left: solid thin ${tableBorder};
        }
        td:last-of-type {
          border-right: solid thin ${tableBorder};
        }
        td.yes-cell {
          border-left: solid 0.25rem ${yesVote};
          color: ${yesVote};
        }
        td.no-cell {
          border-left: solid 0.25rem ${noVote};
          color: ${noVote};
        }
        .category-column {
          width: calc(100% - 20rem);
          font-weight: 700;
        }
        .number-column {
          width: 10rem;
          text-align: right;
        }
        .drop-on-mobile {
          display: none;
        }

        #updates {
          font-size: 1rem;
          line-height: 1.32em;
        }

        #updates p {
          margin-bottom: 0.5em;
        }

        #updates ul {
          margin-top: 0;
          padding-left: 1em;
        }

        @media (min-width: 769px) {
          table {
            width: calc(100% - 10rem);
          }
          .drop-on-mobile {
            display: inline;
          }
          #updates {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pagesMetadata = getNavPagesMetadata();
  return {
    props: {
      slug: 'tech-vote-count',
      pagesMetadata,
    },
  };
};

export default VoteCounts;
