import { sansSerif } from '../../lib/styles/tokens/fonts';
import { noVote, yesVote } from '../../lib/styles/tokens/colors';
import { VoteData } from './useVoteData';

function format(n: number): string {
  return n ? `${(n * 100).toFixed(2)}%` : '--%';
}

export interface VoteCountBarProps extends Pick<VoteData, 'yes' | 'no' | 'total' | 'neededToWin'> {
  winLabelWidth?: number;
}

export const VoteCountBar = ({
  yes,
  no,
  total,
  neededToWin,
  winLabelWidth = 80,
}: VoteCountBarProps) => (
  <>
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
    <style jsx>{`
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
    `}</style>
  </>
);
