import { ReactNode, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { breakingBackground, breakingBorder } from '../lib/styles/tokens/colors';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export interface ConfettiCannonProps {
  children: ReactNode;
  startTime?: number;
  total: number;
}

export function ConfettiCannon({ children, total }: ConfettiCannonProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;
      const computedStyle = getComputedStyle(ref.current);
      setWidth(
        ref.current.offsetWidth -
          parseInt(computedStyle.borderLeftWidth, 10) -
          parseInt(computedStyle.borderRightWidth, 10)
      );
      const newHeight =
        document.body.offsetHeight -
        ref.current.offsetTop -
        parseInt(computedStyle.borderTopWidth, 10) -
        parseInt(computedStyle.borderBottomWidth, 10);
      setHeight(newHeight);
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
        <Confetti
          className="confetti-cannon"
          width={width}
          height={height}
          numberOfPieces={total}
          colors={['#FF4040', '#B42F2F', '#FF5555', '#FF7373', '#FF9C9E', '#FFD3D3', '#ECECEC']}
        />
        {children}
      </div>
      <style jsx>{`
        .confetti-container {
          position: relative;
          box-sizing: border-box;
          background: ${breakingBackground};
          border: 0.125rem solid ${breakingBorder};
          padding: 0 1rem;
        }

        .confetti-cannon {
          position: absolute;
          Top: 0;
          Bottom0;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
