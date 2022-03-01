import { ConfettiCannon, ConfettiCannonContext } from '../../components/ConfettiCannon';
import { VoteCountSection } from './VoteCountSection';

export const Intro = () => (
  <>
    <p>Ballot counting will take place on Thursday, March 3rd.</p>
    <p>
      This vote determines whether or not our union is certified, and is decided by a simple
      majority (50% +1 vote) of total ballots. The vertical line in the center of the bar graph
      indicates the number of votes needed to decide the outcome.
    </p>
  </>
);

export const BeforeResult = () => (
  <>
    <p>
      Before each ballot is counted, management can challenge. If they have reason to doubt a
      voter&rsquo;s current employment status or unit eligibility, for example, they can request
      that the voter&rsquo;s ballot be set aside.
    </p>
    <p>
      The NLRB will first count unchallenged ballots. If a simple majority is reached in the initial
      count or the number of challenged ballots cannot sway the outcome of the vote, our union will
      be officially certified. Otherwise, challenged ballots will be reviewed for eligibility and
      counted.
    </p>
  </>
);

export const AfterWin = () => (
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
