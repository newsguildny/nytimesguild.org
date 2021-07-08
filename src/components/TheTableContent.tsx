import { sansSerif, sansSerifSizes } from '../lib/styles/tokens/fonts';

interface Props {
  content: any;
  date: string;
  issue: string;
}

const TheTableContent = ({ content, date, issue }: Props) => (
  <>
    <header>
      <div className="description center">
        A joint zine from the Times Guild, the Times Tech Guild and the Wirecutter Union
      </div>
      <div className="title center">The Table</div>
    </header>
    <div className="info">
      <div className="issue">Issue {issue}</div>
      <div className="date">{date}</div>
    </div>
    <main className="center">
      <article>{content}</article>
    </main>
    <style jsx>{`
      header {
        display: block;
        font-family: 'Public Sans';
        color: #490606;
        position: relative;
        top: 130px;
        margin-top: -80px;
      }

      .title {
        font-size: 6em;
        font-weight: 900;
      }

      .description {
        font-weight: 700;
        font-size: 18px;
      }

      .info {
        font-family: 'Public Sans';
        color: #490606;
        margin: 0 48px 52px 48px;
        font-weight: 400;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
      }

      main {
        background-color: #ffebed;
        padding-bottom: 48px;
        margin: 0 48px;
      }

      article {
        font-family: ${sansSerif};
        font-size: ${sansSerifSizes.medium};
      }

      img {
        max-width: 740px;
      }

      .center {
        display: flex;
        justify-content: center;
      }
    `}</style>
  </>
);

export default TheTableContent;
