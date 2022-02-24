import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { GetStaticProps } from "next";
import Head from "next/head";
import { PageHeader } from "../components/PageHeader";
import { getDatabase, ref, onValue } from "firebase/database";

function format(n: number): string {
  return `${(n * 100).toFixed(2)}%`;
}

const VoteCounts = () => {
  const [yes, setYes] = useState<number>(0);
  const [no, setNo] = useState<number>(0);
  const [contested, setContested] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCURKa7asmTfECkxa0S83ew5gLirPBdiFc",
      authDomain: "nyttechvotecount.firebaseapp.com",
      databaseURL: "https://nyttechvotecount-default-rtdb.firebaseio.com",
      projectId: "nyttechvotecount",
      storageBucket: "nyttechvotecount.appspot.com",
      messagingSenderId: "45909778564",
      appId: "1:45909778564:web:02866d0927cfb9478f62d1",
    };

    const app = initializeApp(firebaseConfig);

    const db = getDatabase(app);
    const yesRef = ref(db, "yes");
    onValue(yesRef, (snapshot) => {
      const data = snapshot.val();
      if (typeof data === "number") {
        setYes(data);
      }
    });
    onValue(ref(db, "no"), (snapshot) => {
      const data = snapshot.val();
      if (typeof data === "number") {
        setNo(data);
      }
    });
    onValue(ref(db, "total"), (snapshot) => {
      const data = snapshot.val();
      if (typeof data === "number") {
        setTotal(data);
      }
    });
    onValue(ref(db, "contested"), (snapshot) => {
      const data = snapshot.val();
      if (typeof data === "number") {
        setContested(data);
      }
    });
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
          <div className="bar-yes" style={{ width: `${yes / total}%` }}></div>
          <div
            className="bar-half"
            style={{ left: `${Math.floor(50 + total / 100)}%` }}
          ></div>
          <div className="bar-no" style={{ width: `${no / total}%` }}></div>
        </div>
        <table aria-labelledby="heading">
          <thead>
            <tr>
              <th></th>
              <th>Votes</th>
              <th>Pct. of uncontested</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Yes votes</td>
              <td>{yes}</td>
              <td>{format(yes / uncontested)}</td>
            </tr>
            <tr>
              <td>No votes</td>
              <td>{no}</td>
              <td>{format(no / uncontested)}</td>
            </tr>
            <tr>
              <td>Contested</td>
              <td>{contested}</td>
              <td>{format(contested / uncontested)}</td>
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

        .bar {
          background: lightgray;
          height: 10rem;
          position: relative;
          display: flex;
          justify-content: space-between;
        }
        .bar-yes {
          background: red;
        }
        .bar-no {
          background: purple;
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
