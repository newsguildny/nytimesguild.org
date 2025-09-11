import Link from "next/link";
import cx from "classnames";
import { publicSans } from "src/app/fonts";
import { MDX } from "./MDX";
import { components } from "./customEditorComponents";
import styles from "./thetablecontent.module.css";

interface Link {
  link: string;
  label: string;
}

interface Props {
  content: string;
  date: string;
  issue: string;
  navLink: Link;
}

const TheTableContent = ({ content, date, issue, navLink }: Props) => (
  <div className={publicSans.className}>
    <div className={styles.link}>
      <Link href={navLink.link}>{navLink.label}</Link>
    </div>
    <header className={styles.header}>
      <div className={cx(styles.description, styles.center)}>
        A joint zine from the Times Guild, the Times Tech Guild and the
        Wirecutter Union
      </div>
      <h1 className={cx(styles.title, styles.center)}>The Table</h1>
    </header>
    <div className={styles.info}>
      <div className={styles.issue}>Issue {issue}</div>
      <div className={styles.date}>{date}</div>
    </div>
    <main className={cx(styles.main, styles.center)}>
      <article className={styles.article}>
        <MDX source={content} components={components} />
      </article>
    </main>
  </div>
);

export default TheTableContent;
