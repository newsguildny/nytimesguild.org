import Link from 'next/link';
import { sansSerif, sansSerifSizes } from '../lib/styles/tokens/fonts';

interface Link {
  link: string;
  label: string;
}

interface Props {
  content: any;
  date: string;
  issue: string;
  navLink: Link;
}

const TheTableContent = ({ content, date, issue, navLink }: Props) => (
  <>
    <div className="link">
      <Link href={navLink.link}>
        <a>{navLink.label}</a>
      </Link>
    </div>
    <header>
      <div className="description center">
        A joint zine from the Times Guild, the Times Tech Guild and the Wirecutter Union
      </div>
      <h1 className="title center">The Table</h1>
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
      }

      .title {
        font-size: 3rem;
        font-weight: 900;
        margin: 0 1rem;
      }

      .description {
        font-weight: 700;
        font-size: 0.9rem;
        text-align: center;
        margin: 0.5rem;
      }

      .info {
        font-family: 'Public Sans';
        color: #490606;
        font-weight: 400;
        font-size: 0.9rem;
        display: flex;
        justify-content: space-between;
        margin: 1rem;
      }

      main {
        background-color: #ffebed;
        padding-bottom: 3rem;
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

      .link {
        font-family: 'Public Sans';
        font-size: 0.9rem;
        margin: 1.5rem;
      }

      a {
        text-decoration: none;
      }

      @media (min-width: 769px) {
        .title {
          font-size: 8rem;
        }

        .description {
          font-size: 1rem;
        }

        .info {
          font-size: 1rem;
        }

        .link {
          font-size: 1rem;
        }
      }

      @media (min-width: 1024px) {
        header {
          position: relative;
          top: 6rem;
          margin-top: -4rem;
        }

        .title {
          font-size: 9rem;
        }

        .description {
          font-size: 1.2rem;
        }

        .info {
          margin: 0 2rem 2rem 2rem;
        }

        main {
          margin-left: 2rem;
          margin-right: 2rem;
        }

        .link {
          margin: 2rem;
        }
      }
    `}</style>
  </>
);

export default TheTableContent;
