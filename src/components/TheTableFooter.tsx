import Link from "next/link";
import styles from "./thetablefooter.module.css";

export interface TeaserProps {
  date: string;
  headline: string;
  issue: string;
  slug: string;
  thumbnail?: string;
}

interface Props {
  teasers?: Array<TeaserProps>;
}

const TheTableFooter = ({ teasers }: Props) => {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.h2}>Previous Issues</h2>
      {teasers &&
        teasers.map(({ date, headline, issue, slug, thumbnail }) => (
          <Link key={date} href={`/the-table/${slug}/`}>
            <div className={styles.link}>
              <img
                className={styles.img}
                alt={`edition ${issue} thumbnail`}
                src={thumbnail}
              />
              <div className={styles["issue-info"]}>
                <span>{headline}</span>
                <div>{date}</div>
                <div>Issue {issue}</div>
              </div>
            </div>
          </Link>
        ))}
    </footer>
  );
};

export default TheTableFooter;
