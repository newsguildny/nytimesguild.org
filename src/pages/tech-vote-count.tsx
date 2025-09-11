import { GetStaticProps } from "next";
import Head from "next/head";
import { serifSizes, sansSerif } from "../lib/styles/tokens/fonts";
import { noVote, tableBorder, yesVote } from "../lib/styles/tokens/colors";
import { PageHeader } from "../components/PageHeader";
import {
  formatPercentage,
  VoteCountBar,
} from "../components/vote-count/VoteCountBar";
import {
  ConfettiCannon,
  ConfettiCannonContext,
} from "../components/vote-count/ConfettiCannon";
import { getNavPagesMetadata, PageData } from "../lib/collections/pages";
import { PageLayout } from "../components/PageLayout";

interface Props {
  pagesMetadata: PageData[];
}

const VoteCounts = ({ pagesMetadata }: Props) => {
  const yes = 404;
  const no = 88;
  const contested = 16;
  const neededToWin = 255;
  const total = 508;
  const valid = total - contested;

  return (
    <>
      <Head>
        <title>Vote Count - The New York Times Guild</title>
        <meta name="og:title" content="Vote Count" />
        <meta name="og:type" content="website" />
      </Head>
      <PageLayout slug="tech-vote-count" pagesMetadata={pagesMetadata}>
        <PageHeader heading="Vote Count" />
        <main>
          <h2>About</h2>
          <p>
            Ballot counting for The Times Tech Guild (The NewsGuild of New York,
            Local 31003, TNG/CWA) took place on Thursday, March 3rd, 2022.
          </p>
          <p>
            This vote was decided by a simple majority (50% +1 vote) of total
            ballots and officially certified our union. The vertical line in the
            center of the bar graph indicates the number of votes needed to
            decide the outcome.
          </p>
          <ConfettiCannon total={total}>
            <p
              style={{
                fontFamily: sansSerif,
                lineHeight: "1em",
                marginTop: "1rem",
              }}
            >
              <strong>BREAKING NEWS:</strong>
            </p>
            <p>
              The NLRB has counted a majority of votes in the Times Tech
              Guild&rsquo;s favor! The recognition of our unit makes us the
              largest tech union with bargaining rights in the United States!
            </p>
            <p style={{ marginBottom: "1rem" }}>
              We did it y&rsquo;all 🥲✊
              <ConfettiCannonContext.Consumer>
                {({ confetti, onToggleConfetti }) => (
                  <a
                    href="#"
                    onClick={onToggleConfetti}
                    title={`${confetti ? "Less" : "More"} confetti, please!`}
                    style={{ textDecoration: "none" }}
                  >
                    🎉
                  </a>
                )}
              </ConfettiCannonContext.Consumer>
            </p>
          </ConfettiCannon>

          {/* The vote count bar */}
          <h3 id="heading">Results</h3>
          <VoteCountBar
            yes={yes}
            no={no}
            total={total}
            neededToWin={neededToWin}
          />

          {/* Yes / No votes table */}
          <table>
            <thead>
              <tr>
                <th aria-label="Vote category" className="category-column" />
                <th className="number-column">Votes</th>
                <th className="number-column">% of total</th>
                <th className="number-column">% of valid votes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="category-column yes-cell">
                  Yes <span className="drop-on-mobile">votes</span>
                </td>
                <td className="number-column">{yes}</td>
                <td className="number-column">
                  {formatPercentage(yes, total)}
                </td>
                <td className="number-column">
                  {formatPercentage(yes, valid)}
                </td>
              </tr>
              <tr>
                <td className="category-column no-cell">
                  No <span className="drop-on-mobile">votes</span>
                </td>
                <td className="number-column">{no}</td>
                <td className="number-column">{formatPercentage(no, total)}</td>
                <td className="number-column">{formatPercentage(no, valid)}</td>
              </tr>
            </tbody>
          </table>

          {/* Total / contested ballots table */}
          <h3>Ballot data</h3>
          <table>
            <tbody>
              <tr>
                <td className="category-column">
                  Total <span className="drop-on-mobile">ballots</span>
                </td>
                <td className="number-column">{total}</td>
              </tr>
              <tr>
                <td className="category-column">
                  Contested <span className="drop-on-mobile">ballots</span>
                </td>
                <td className="number-column">{contested}</td>
              </tr>
              <tr>
                <td className="category-column">Valid votes</td>
                <td className="number-column">{valid}</td>
              </tr>
            </tbody>
          </table>
          <section id="updates">
            <p>Since certification we have made the following changes:</p>
            <ul>
              <li>Updated the About section language.</li>
              <li>
                Added a field for votes counted, which is the number of Yes and
                No votes counted by the NLRB.
              </li>
              <li>
                Added percentages for Yes and No with valid votes counted as the
                denominator.
              </li>
            </ul>
          </section>
        </main>
      </PageLayout>
      <style jsx>{`
        h3 {
          display: flex;
          margin-top: 5rem;
          align-items: center;
          font-family: var(--nyt-sans-serif-font);
          font-size: var(--nyt-sans-serif-large);
          font-weight: 700;
        }
        table {
          width: calc(100% - 4rem);
          border-collapse: collapse;
          font-family: var(--nyt-sans-serif-font);
          font-weight: 600;
          font-size: var(--nyt-sans-serif-large);
          color: black;
        }
        th {
          padding: 0.5rem 1rem;
          font-size: ${serifSizes.extraSmall};
          color: var(--nyt-body-text-color);
        }
        td {
          padding: 1rem;
          border-top: solid thin ${tableBorder};
          border-bottom: solid thin ${tableBorder};
        }
        td:first-of-type {
          border-left: solid thin ${tableBorder};
        }
        td:last-of-type {
          border-right: solid thin ${tableBorder};
        }
        td.yes-cell {
          border-left: solid 0.25rem ${yesVote};
          color: ${yesVote};
        }
        td.no-cell {
          border-left: solid 0.25rem ${noVote};
          color: ${noVote};
        }
        .category-column {
          width: calc(100% - 20rem);
          font-weight: 700;
        }
        .number-column {
          width: 10rem;
          text-align: right;
        }
        .drop-on-mobile {
          display: none;
        }

        #updates {
          font-size: 1rem;
          line-height: 1.32em;
        }

        #updates p {
          margin-bottom: 0.5em;
        }

        #updates ul {
          margin-top: 0;
          padding-left: 1em;
        }

        @media (min-width: 769px) {
          table {
            width: calc(100% - 10rem);
          }
          .drop-on-mobile {
            display: inline;
          }
          #updates {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pagesMetadata = getNavPagesMetadata();
  return {
    props: {
      slug: "tech-vote-count",
      pagesMetadata,
    },
  };
};

export default VoteCounts;
