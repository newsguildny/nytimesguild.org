import { ConfettiCannon, ConfettiCannonContext } from '../../components/ConfettiCannon';
import { VoteCountSection } from './VoteCountSection';

export type VoteCountSectionVisibility =
  | 'always'
  | 'hidden'
  | 'beforeLive'
  | 'beforeResult'
  | 'afterWin'
  | 'afterLoss';

export const Intro = () => (
  <VoteCountSection>
    <h3>About</h3>
    <p>
      The vote will be determined by a simple majority (50% +1 vote) of total ballots. The vertical
      line in the center of the bar graph indicates amount of votes needed for the result to be
      decided.
    </p>
  </VoteCountSection>
);

export const BeforeResult = () => (
  <VoteCountSection>
    <p>
      Any challenged votes will be put aside for the initial count. If a simple majority is not
      reached in the initial count, the NLRB will count the challenged votes until a decision is
      reached.
    </p>
  </VoteCountSection>
);

export const AfterWin = () => (
  <ConfettiCannon>
    <VoteCountSection breaking>
      <h3>BREAKING NEWS:</h3>
      <p>
        The NLRB has counted a majority of votes in the Times Tech Guild’s favor. Once recognized,
        we will be the largest tech union in the US.
      </p>
      <p>
        We did it y&rsquo;all 🥲✊
        <ConfettiCannonContext.Consumer>
          {({ celebrating, resetCelebrating }) => (
            <a
              className={celebrating ? 'celebrating' : undefined}
              href="#"
              title={!celebrating ? 'Click to celebrate!!!' : undefined}
              onClick={resetCelebrating}
            >
              🎉
            </a>
          )}
        </ConfettiCannonContext.Consumer>
      </p>
    </VoteCountSection>
    <style jsx>{`
      a {
        text-decoration: none;
      }

      .celebrating {
        cursor: not-allowed;
      }
    `}</style>
  </ConfettiCannon>
);
