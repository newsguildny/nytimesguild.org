import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, onValue } from 'firebase/database';

export interface VoteData {
  yes: number;
  no: number;
  contested: number;
  /** The total number of ballots received */
  total: number;
  neededToWin: number;
}

export function formatPercentage(numerator: number, denominator: number): string {
  return denominator ? `${Math.round((numerator / denominator) * 100)}%` : '--%';
}

export const isVoteData = (data: unknown): data is VoteData =>
  typeof data === 'object' &&
  data !== null &&
  typeof (data as Record<string, unknown>).yes === 'number' &&
  typeof (data as Record<string, unknown>).no === 'number' &&
  typeof (data as Record<string, unknown>).total === 'number' &&
  typeof (data as Record<string, unknown>).contested === 'number';

export const firebaseConfig = {
  apiKey: 'AIzaSyCURKa7asmTfECkxa0S83ew5gLirPBdiFc',
  authDomain: 'nyttechvotecount.firebaseapp.com',
  databaseURL: 'https://nyttechvotecount-default-rtdb.firebaseio.com',
  projectId: 'nyttechvotecount',
  storageBucket: 'nyttechvotecount.appspot.com',
  messagingSenderId: '45909778564',
  appId: '1:45909778564:web:02866d0927cfb9478f62d1',
};

function updater(db: Database, path: string, onUpdate: (n: number) => void) {
  onValue(ref(db, path), (snapshot) => {
    const data = snapshot.val();
    if (typeof data === 'number') {
      onUpdate(data);
    }
  });
}

export const useVoteData = (
  initialValue: Omit<VoteData, 'neededToWin'> = { yes: 0, no: 0, total: 0, contested: 0 }
): VoteData => {
  const [yes, setYes] = useState<number>(initialValue.yes);
  const [no, setNo] = useState<number>(initialValue.no);
  const [contested, setContested] = useState<number>(initialValue.contested);
  const [total, setTotal] = useState<number>(initialValue.total);
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
  };
};
