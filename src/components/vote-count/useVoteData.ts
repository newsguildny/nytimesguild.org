import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, onValue } from 'firebase/database';

export type VoteStatus = 'loading' | 'beforeResult' | 'win' | 'loss' | 'contested';

export interface VoteData {
  yes: number;
  no: number;
  contested: number;
  /** The total number of ballots received */
  total: number;
  neededToWin: number;
  status: VoteStatus;
}

export function formatPercentage(numerator: number, denominator: number): string {
  return denominator ? `${Math.round((numerator / denominator) * 100)}%` : '--%';
}

export const firebaseConfig = {
  apiKey: 'AIzaSyCURKa7asmTfECkxa0S83ew5gLirPBdiFc',
  authDomain: 'nyttechvotecount.firebaseapp.com',
  databaseURL: 'https://nyttechvotecount-default-rtdb.firebaseio.com',
  projectId: 'nyttechvotecount',
  storageBucket: 'nyttechvotecount.appspot.com',
  messagingSenderId: '45909778564',
  appId: '1:45909778564:web:02866d0927cfb9478f62d1',
};

function getVoteStatus({
  yes,
  no,
  total,
  contested,
  neededToWin,
}: Omit<VoteData, 'status'>): VoteStatus {
  if (total === 0) return 'loading';
  if (yes + no + contested === total && contested > 0) return 'contested';
  if (yes >= neededToWin) return 'win';
  if (no >= neededToWin) return 'loss';
  return 'beforeResult';
}

function updater(db: Database, path: string, onUpdate: (n: number) => void) {
  onValue(ref(db, path), (snapshot) => {
    const data = snapshot.val();
    if (typeof data === 'number') {
      onUpdate(data);
    }
  });
}

export const useVoteData = (): VoteData => {
  const [yes, setYes] = useState<number>(0);
  const [no, setNo] = useState<number>(0);
  const [contested, setContested] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const neededToWin = Math.floor(total / 2) + 1;

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    updater(db, 'yes', setYes);
    updater(db, 'no', setNo);
    updater(db, 'total', setTotal);
    updater(db, 'contested', setContested);
  }, []);

  return {
    yes,
    no,
    contested,
    total,
    neededToWin,
    status: getVoteStatus({ yes, no, total, contested, neededToWin }),
  };
};
