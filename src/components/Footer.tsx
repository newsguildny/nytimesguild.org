import cx from "classnames";
import { crimsonPro, publicSans } from "src/app/fonts";
import { MailIcon } from "./svgs/MailIcon";
import styles from "./footer.module.css";
import { BlueskyIcon } from "./svgs/BlueskyIcon";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <h3 className={cx(styles.h3, crimsonPro.className)}>Contact Us</h3>
      <p>
        <a
          className={cx(publicSans.className, styles.a)}
          href="mailto:nyttech@nyguild.org"
        >
          <MailIcon /> nyttech@nyguild.org
        </a>
      </p>
      <p>
        <a
          className={cx(publicSans.className, styles.a)}
          href="https://nytguildtech.bsky.social"
        >
          <BlueskyIcon /> @nytguildtech.bsky.social
        </a>
      </p>
    </footer>
  );
}
