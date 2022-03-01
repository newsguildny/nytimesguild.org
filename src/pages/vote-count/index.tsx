import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Database, getDatabase, ref, onValue } from 'firebase/database';
import { PageHeader } from '../../components/PageHeader';
import { serifSizes, sansSerif, sansSerifSizes } from '../../lib/styles/tokens/fonts';
import {
  bodyText,
  headerBackground,
  headerText,
  noVote,
  tableBorder,
  yesVote,
} from '../../lib/styles/tokens/colors';

function format(n: number): string {
  return n ? `${(n * 100).toFixed(2)}%` : '--%';
}

function updater(db: Database, path: string, onUpdate: (n: number) => void) {
  onValue(ref(db, path), (snapshot) => {
    const data = snapshot.val();
    if (typeof data === 'number') {
      onUpdate(data);
    }
  });
}

const VoteCounts = () => {
  const [yes, setYes] = useState<number>(0);
  const [no, setNo] = useState<number>(0);
  const [contested, setContested] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyCURKa7asmTfECkxa0S83ew5gLirPBdiFc',
      authDomain: 'nyttechvotecount.firebaseapp.com',
      databaseURL: 'https://nyttechvotecount-default-rtdb.firebaseio.com',
      projectId: 'nyttechvotecount',
      storageBucket: 'nyttechvotecount.appspot.com',
      messagingSenderId: '45909778564',
      appId: '1:45909778564:web:02866d0927cfb9478f62d1',
    };

    const app = initializeApp(firebaseConfig);

    const db = getDatabase(app);
    updater(db, 'yes', setYes);
    updater(db, 'no', setNo);
    updater(db, 'total', setTotal);
    updater(db, 'contested', setContested);
  }, []);
  const neededToWin = Math.floor(total / 2) + 1;
  const winLabelWidth = 80;
  return (
    <>
      <Head>
        <title>Vote Count - The New York Times Guild</title>
        <meta name="og:title" content="Vote Count" />
        <meta name="og:type" content="website" />
      </Head>
      <PageHeader heading="Vote Count" />
      <main>
        <h2>About</h2>
        <p>
          The vote will be determined by a simple majority (50% +1 vote). This number is represented
          by the vertical line at the center of the bar graph.
        </p>
        <p>
          If any ballots are challenged they will be put aside for the initial count. If the
          decision of the election could be changed by the number of contested ballots, the NLRB
          will beign counting those TK.
        </p>
        <h3 id="heading">
          Results {total ? <span className="live-pill">live</span> : 'coming soon!'}
        </h3>
        <div className="bar-labels">
          <div className="yes-label">
            Yes: {yes} ({format(yes / total)})
          </div>
          <div
            className="win-label"
            style={{
              left: `calc(max(${total ? (neededToWin / total) * 100 : 0}%, 50%) - ${
                winLabelWidth / 2
              }px)`,
            }}
          >
            {total ? neededToWin : '--'}
          </div>
          <div className="no-label">
            No: {no} ({format(no / total)})
          </div>
        </div>
        <div className="bar">
          <div
            className="bar-yes"
            style={{ width: `calc(max(${total ? (yes / total) * 100 : 0}%, 2px))` }}
          />
          <div
            className="bar-half"
            style={{ left: `calc(max(${total ? (neededToWin / total) * 100 : 0}%, 50%))` }}
          />
          <div
            className="bar-no"
            style={{ width: `calc(max(${total ? (no / total) * 100 : 0}%, 2px))` }}
          />
        </div>
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
        main {
          padding-top: 2rem;
        }

        h3 {
          display: flex;
          margin-top: 5rem;
          align-items: center;
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.large};
          font-weight: 700;
        }
        .live-pill {
          display: inline-block;
          margin-left: 0.5rem;
          padding: 0.25rem 0.5rem;
          border-radius: 1.5rem;
          font-size: ${sansSerifSizes.extraSmall};
          font-weight: 800;
          color: ${headerText};
          background: ${headerBackground};
          text-transform: uppercase;
        }
        .bar-labels {
          position: relative;
          display: flex;
          justify-content: space-between;
          font-family: ${sansSerif};
        }
        .yes-label {
          padding: 1rem 0;
          color: ${yesVote};
        }
        .win-label {
          position: absolute;
          top: 1rem;
          color: black;
          text-align: center;
          width: ${winLabelWidth}px;
        }
        .no-label {
          padding: 1rem 0;
          color: ${noVote};
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
        .bar {
          position: relative;
          display: flex;
          height: 6rem;
          margin-bottom: 2.5rem;
          justify-content: space-between;
          background: lightgray;
        }
        .bar-yes {
          background: ${yesVote};
        }
        .bar-no {
          background: ${noVote};
        }
        .bar-half {
          position: absolute;
          bottom: 0;
          width: 2px;
          height: 115%;
          background: black;
        }
        .drop-on-mobile {
          display: none;
        }

        @media (min-width: 769px) {
          main {
            padding-top: 5rem;
          }
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
