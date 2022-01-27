import { headerText } from '../lib/styles/tokens/colors';

interface Props {
  active: boolean;
  onClick: () => void;
  className?: string;
}

export function Burger({ active, onClick, className }: Props) {
  return (
    <button
      type="button"
      className={`${className} container ${active ? 'active' : ''}`}
      onClick={onClick}
      aria-label="Open navigation"
    >
      <div className="bun bun-1" />
      <div className="bun bun-3" />
      <style jsx>
        {`
          button {
            width: 36px;
            height: 32px;
            border: none;
            background: none;
            cursor: pointer;
          }
          .bun {
            position: absolute;
            width: 18px;
            height: 2px;
            background: ${headerText};
            top: calc(50% - 2px / 2);
            left: calc(50% / 2);
            transition: all 150ms ease-in;
          }
          .bun-1 {
            transform: translateY(-5px);
          }
          .bun-3 {
            transform: translateY(5px);
          }
          .active .bun-1 {
            transform: rotate(45deg);
          }
          .active .bun-3 {
            transform: rotate(-45deg);
          }
        `}
      </style>
    </button>
  );
}
