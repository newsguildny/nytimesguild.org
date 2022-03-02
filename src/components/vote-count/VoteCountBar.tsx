import { sansSerif, serif } from '../../lib/styles/tokens/fonts';
import { noVote, yesVote } from '../../lib/styles/tokens/colors';
import { VoteData, formatPercentage } from './useVoteData';

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
        Yes:{' '}
        <span className="yes-count">
          {yes} ({formatPercentage(yes, total)})
        </span>
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
        No:{' '}
        <span className="no-count">
          {no} ({formatPercentage(no, total)})
        </span>
      </div>
    </div>
    <div className="bar">
      <div
        className="bar-yes"
        style={{ width: `calc(max(${total ? (yes / total) * 100 : 0}%, 2px))` }}
      />
      <div
        className="bar-half"
        style={{ left: `calc(max(${total ? (neededToWin / total) * 100 : 0}%, 50%) - 1px)` }}
      />
      <div
        className="bar-no"
        style={{ width: `calc(max(${total ? (no / total) * 100 : 0}%, 2px))` }}
      />
    </div>
    <style jsx>{`
      .yes-label,
      .no-label {
        visibility: hidden;
      }
      .bar-labels {
        position: relative;
        display: flex;
        justify-content: space-between;
        font-family: ${sansSerif};
        font-size: 1.375rem;
        font-weight: 300;
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
      .yes-count,
      .no-count,
      .win-label {
        font-family: ${serif};
        font-size: 1.75rem;
        font-weight: 600;
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

      @media (min-width: 769px) {
        .yes-label,
        .no-label {
          visibility: visible;
        }
      }
    `}</style>
  </>
);
