import { createContext, ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { breakingBackground, breakingBorder } from '../../lib/styles/tokens/colors';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export interface ConfettiCannonProps {
  children: ReactNode;
  startTime?: number;
  total: number;
}

export interface ConfettiCannonContextValue {
  confetti: boolean;
  onToggleConfetti: (e: SyntheticEvent<HTMLElement>) => void;
}

export const ConfettiCannonContext = createContext<ConfettiCannonContextValue>({
  confetti: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onToggleConfetti: () => {},
});

export function ConfettiCannon({ children, total }: ConfettiCannonProps) {
  const [confetti, setConfetti] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const onToggleConfetti = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    setConfetti(!confetti);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;
      const computedStyle = getComputedStyle(ref.current);
      setWidth(
        ref.current.offsetWidth -
          parseInt(computedStyle.borderLeftWidth, 10) -
          parseInt(computedStyle.borderRightWidth, 10)
      );
      setHeight(
        document.body.offsetHeight -
          ref.current.offsetTop -
          parseInt(computedStyle.borderTopWidth, 10) -
          parseInt(computedStyle.borderBottomWidth, 10)
      );
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <>
      <div className="confetti-container" ref={ref}>
        {confetti && (
          <Confetti
            className="confetti-cannon"
            width={width}
            height={height}
            numberOfPieces={total}
            recycle={confetti}
            colors={['#FF4040', '#B42F2F', '#FF5555', '#FF7373', '#FF9C9E', '#FFD3D3', '#ECECEC']}
          />
        )}
        <ConfettiCannonContext.Provider value={{ confetti, onToggleConfetti }}>
          {children}
        </ConfettiCannonContext.Provider>
      </div>
      <style jsx>{`
        .confetti-container {
          position: relative;
          box-sizing: border-box;
          background: ${breakingBackground};
          border: 0.125rem solid ${breakingBorder};
          padding: 0 1rem;
          color: #3e3e3e;
        }

        .confetti-cannon {
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
