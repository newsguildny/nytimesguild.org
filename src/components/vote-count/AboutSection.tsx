import { ConfettiCannon, ConfettiCannonContext } from '../ConfettiCannon';
import { VoteData } from './useVoteData';
import { VoteCountSection } from './VoteCountSection';

/**
 * All text in this source file comes from this Google Sheet:
 * @see https://docs.google.com/spreadsheets/d/1icRCXDu6wGGJKYiigSM6ZgKBS1lukHPNkvxHLJ-bpYE/edit
 */

const Intro = () => (
  <>
    <p>Ballot counting will take place on Thursday, March 3rd.</p>
    <p>
      This vote determines whether or not our union is certified, and is decided by a simple
      majority (50% +1 vote) of total ballots. The vertical line in the center of the bar graph
      indicates the number of votes needed to decide the outcome.
    </p>
  </>
);

const BeforeResult = () => (
  <>
    <p>
      Before each ballot is counted, either party can challenge a ballot. If management has reason
      to doubt a voter&rsquo;s current employment status, signature, or eligibility, for example,
      they can challenge the ballot. The NLRB officer can accept or dismiss the challenge. If the
      challenge is accepted, the ballot is set aside and will only be counted if all challenged
      ballots are determinative for the outcome.
    </p>
    <p>
      The NLRB will first count unchallenged ballots. If a simple majority of total ballots is
      reached in the initial count, our union will be officially certified. Otherwise, challenged
      ballots will be reviewed for eligibility and counted.
    </p>
  </>
);

const AfterWin = () => (
  <ConfettiCannon>
    <VoteCountSection breaking>
      <p>
        <strong>BREAKING NEWS:</strong>
      </p>
      <p>
        The NLRB has counted a majority of votes in the Times Tech Guild&rsquo;s favor! The
        recognition of our unit makes us the largest tech union with bargaining rights in the United
        States!
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

const WhileContested = ({ contested = 0 }) => (
  <p>
    Times management has chosen to challenge {contested} ballot{contested !== 1 ? 's' : ''}. Because
    the initial count did not show a simple majority, the NLRB will resolve the eligibility disputes
    of challenged votes and count them.
  </p>
);

const AfterLoss = () => (
  <p>
    The NLRB ballot count has concluded, and unfortunately the Times Tech Guild did not gain a
    majority of votes. While this is a heartbreaking setback, it will not deter us. We will continue
    our work in solidarity, advocating for a fair and equitable workplace for all of our coworkers.
    ✊
  </p>
);

export const AboutSection = ({ yes, no, contested, total, neededToWin }: VoteData) => (
  <>
    <h2>About</h2>
    <Intro />
    {yes < neededToWin &&
      no < neededToWin &&
      (yes + no + contested === total && contested > 0 ? (
        <WhileContested contested={contested} />
      ) : (
        <BeforeResult />
      ))}
    {yes >= neededToWin && <AfterWin />}
    {no >= neededToWin && <AfterLoss />}
  </>
);
