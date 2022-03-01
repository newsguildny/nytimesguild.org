import { createContext, ReactNode, /* useEffect, */ useRef /* , useState */ } from 'react';
// import dynamic from 'next/dynamic';

// const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export interface ConfettiCannonProps {
  children: ReactNode;
  startTime?: number;
  endTime?: number;
}

interface ConfettiCannonContextValue {
  celebrating: boolean;
  resetCelebrating: () => void;
}

export const ConfettiCannonContext = createContext<ConfettiCannonContextValue>({
  celebrating: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetCelebrating: () => {},
});

export function ConfettiCannon({
  children /* startTime = 500, endTime = 5000 */,
}: ConfettiCannonProps) {
  // const [celebrating, setCelebrating] = useState(false);
  const celebrating = true;
  // const [readyToCelebrate, setReadyToCelebrate] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  // const resetCelebrating = () => {
  //   setReadyToCelebrate(true);
  // };

  // useEffect(() => {
  //   if (!readyToCelebrate) return undefined;

  //   let timer: number;

  //   timer = window.setTimeout(() => {
  //     setReadyToCelebrate(false);
  //     setCelebrating(true);
  //     window.clearTimeout(timer);
  //     timer = window.setTimeout(() => {
  //       setCelebrating(false);
  //     }, endTime * 1.125);
  //   }, startTime);

  //   return () => window.clearTimeout(timer);
  // }, [celebrating, readyToCelebrate, startTime, endTime]);

  return (
    <>
      <div className="confetti-container" ref={ref}>
        {celebrating && (
          <div className="confetti-cannon">
            {/* <Confetti
              width={window.innerWidth}
              height={document.documentElement.scrollHeight - (ref.current?.offsetTop ?? 0) - 16}
              numberOfPieces={600}
            /> */}
          </div>
        )}
        {/* <ConfettiCannonContext.Provider value={{ celebrating, resetCelebrating }}> */}
        {children}
        {/* </ConfettiCannonContext.Provider> */}
      </div>
      <style jsx>{`
        .confetti-container {
          position: relative;
        }

        .confetti-cannon {
          position: absolute;
          left: 0;
          top: 0;
          pointer-events: none;
        }

        button {
          appearance: none;
          position: absolute;
          right: 1em;
          bottom: 1em;
          border: 0;
          padding: 0;
          background: transparent;
        }
      `}</style>
    </>
  );
}
