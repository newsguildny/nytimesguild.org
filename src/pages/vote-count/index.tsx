import { GetStaticProps } from 'next';
import Head from 'next/head';
import { PageHeader } from '../../components/PageHeader';
import { LivePill } from '../../components/LivePill';
import { serifSizes, sansSerif, sansSerifSizes } from '../../lib/styles/tokens/fonts';
import { bodyText, noVote, tableBorder, yesVote } from '../../lib/styles/tokens/colors';
import { Intro, BeforeResult, AfterWin } from './sections';
import { useVoteData } from './useVoteData';
import { VoteCountBar } from './VoteCountBar';

function format(n: number): string {
  return n ? `${(n * 100).toFixed(2)}%` : '--%';
}

const VoteCounts = () => {
  const { yes, no, contested, total, neededToWin } = useVoteData();

  return (
    <>
      <Head>
        <title>Vote Count - The New York Times Guild</title>
        <meta name="og:title" content="Vote Count" />
        <meta name="og:type" content="website" />
      </Head>
      <PageHeader heading="Vote Count" />
      <main>
        {/* Text content above the vote count bar and tables */}
        <h2>About</h2>
        <Intro />
        {yes < neededToWin && no < neededToWin && <BeforeResult />}
        {yes >= neededToWin && <AfterWin />}

        {/* The vote count bar */}
        <h3 id="heading">Results {total ? <LivePill /> : 'coming soon!'}</h3>
        <VoteCountBar yes={yes} no={no} total={total} neededToWin={neededToWin} />

        {/* Yes / No votes table */}
        <table>
          <thead>
            <tr>
              <th aria-label="Vote category" className="category-column" />
              <th className="number-column">Votes</th>
              <th className="number-column">Pct. of total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="category-column yes-cell">
                Yes <span className="drop-on-mobile">votes</span>
              </td>
              <td className="number-column">{yes}</td>
              <td className="number-column">{format(yes / total)}</td>
            </tr>
            <tr>
              <td className="category-column no-cell">
                No <span className="drop-on-mobile">votes</span>
              </td>
              <td className="number-column">{no}</td>
              <td className="number-column">{format(no / total)}</td>
            </tr>
          </tbody>
        </table>

        {/* Total / contested ballots table */}
        <h3>Ballot data</h3>
        <table>
          <tbody>
            <tr>
              <td>
                Total <span className="drop-on-mobile">ballots</span>
              </td>
              <td className="number-column">{total}</td>
            </tr>
            <tr>
              <td>
                Contested <span className="drop-on-mobile">ballots</span>
              </td>
              <td className="number-column">{contested}</td>
            </tr>
          </tbody>
        </table>
      </main>
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
        }
        .number-column {
          width: 10rem;
          text-align: right;
        }
        .drop-on-mobile {
          display: none;
        }

        @media (min-width: 769px) {
          .drop-on-mobile {
            display: inline;
          }
        }
      `}</style>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default VoteCounts;
