import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Database, getDatabase, ref, onValue } from 'firebase/database';
import { PageHeader } from '../components/PageHeader';
import { serifSizes, sansSerif, sansSerifSizes } from '../lib/styles/tokens/fonts';
import { noVote, yesVote } from '../lib/styles/tokens/colors';

function format(n: number): string {
  return `${(n * 100).toFixed(2)}%`;
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
  const uncontested = total - contested;
  return (
    <>
      <Head>
        <title>Vote Count - The New York Times Guild</title>
        <meta name="og:title" content="Vote Count" />
        <meta name="og:type" content="website" />
      </Head>
      <PageHeader heading="Vote Count" />
      <main>
        <h1 id="heading">Results</h1>
        <div className="bar">
          <div className="bar-yes" style={{ width: `${(yes / total) * 100}%` }} />
          <div
            className="bar-half"
            style={{ left: `${((Math.floor(total / 2) + 1) / total) * 100}%` }}
          />
          <div className="bar-no" style={{ width: `${(no / total) * 100}%` }} />
        </div>
        <table>
          <thead>
            <tr>
              <th aria-label="Vote category" className="category-column" />
              <th className="number-column">Votes</th>
              <th className="number-column">Pct. of uncontested</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="category-column yes-cell">Yes votes</td>
              <td className="number-column">{yes}</td>
              <td className="number-column">{format(yes / uncontested)}</td>
            </tr>
            <tr>
              <td className="category-column no-cell">No votes</td>
              <td className="number-column">{no}</td>
              <td className="number-column">{format(no / uncontested)}</td>
            </tr>
          </tbody>
        </table>
        <h2>Ballot data</h2>
        <table>
          <tbody>
            <tr>
              <td>Ballots received</td>
              <td className="number-column">{total}</td>
            </tr>
            <tr>
              <td>Ballots contested</td>
              <td className="number-column">{contested}</td>
            </tr>
            <tr>
              <td>Uncontested ballots</td>
              <td className="number-column">{total - contested}</td>
            </tr>
          </tbody>
        </table>
      </main>
      <style jsx>{`
        main {
          padding-top: 2rem;
        }

        @media (min-width: 769px) {
          main {
            padding-top: 5rem;
          }
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          font-size: ${serifSizes.extraSmall};
          font-weight: 400;
        }
        tbody {
          font-family: ${sansSerif};
          font-size: ${sansSerifSizes.medium};
          font-weight: 700;
        }
        tbody td {
          border-top: solid thin black;
          border-bottom: solid thin black;
          padding: 0.5rem;
        }
        tbody td:first-of-type {
          border-left: solid thin black;
        }
        tbody td:last-of-type {
          border-right: solid thin black;
        }
        tbody td:first-of-type.yes-cell {
          color: ${yesVote};
          border-left: solid 0.25rem ${yesVote};
        }
        tbody td:first-of-type.no-cell {
          color: ${noVote};
          border-left: solid 0.25rem ${noVote};
        }
        .category-column {
          width: calc(100% - 20rem);
        }
        .number-column {
          text-align: right;
          width: 10rem;
        }
        .bar {
          background: lightgray;
          height: 6rem;
          position: relative;
          display: flex;
          justify-content: space-between;
        }
        .bar-yes {
          background: ${yesVote};
        }
        .bar-no {
          background: ${noVote};
        }
        .bar-half {
          width: 1px;
          background: purple;
          position: absolute;
          height: 100%;
          top: 0;
          border-right: 2px solid #000;
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
