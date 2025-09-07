import { crimsonPro } from "src/app/fonts";
import cx from "classnames";
import styles from "./homeheader.module.css";

export function HomeHeader() {
  return (
    <header className={styles.header}>
      <div className={styles["mobile-header"]}>
        <p className={cx(crimsonPro.className, styles.p)}>
          We&rsquo;re building
        </p>
        <ul>
          <li className={cx(crimsonPro.className, styles.li)}>
            A <strong>diverse and equitable</strong> New York Times
          </li>
          <li className={cx(styles.li, styles["justified-header-line"])}>
            A <strong>transparent and inclusive</strong> media industry
          </li>
          <li className={cx(styles.li, styles["justified-header-line"])}>
            A <strong>stronger and united</strong> workplace
          </li>
        </ul>
        <div className={styles["header-conclusion"]}>
          <p className={cx(crimsonPro.className, styles.p)}>
            We have more power together than we do apart.
          </p>
          <p className={cx(crimsonPro.className, styles.p)}>
            <strong>We are the unions of The New York Times.</strong>
          </p>
        </div>
      </div>
      <div className={styles["desktop-header"]}>
        <p className={cx(crimsonPro.className, styles.p)}>
          We&rsquo;re building a <strong>diverse and equitable</strong> New York
          Times
        </p>
        <p
          className={cx(
            crimsonPro.className,
            styles.p,
            styles["justified-header-line"],
          )}
        >
          a <strong>transparent and inclusive</strong> media industry
        </p>
        <p
          className={cx(
            crimsonPro.className,
            styles.p,
            styles["justified-header-line"],
          )}
        >
          a <strong>stronger and united</strong> workplace
        </p>
        <div className={styles["header-conclusion"]}>
          <p className={cx(crimsonPro.className, styles.p)}>
            We have more power together than we do apart.
          </p>
          <p className={cx(crimsonPro.className, styles.p)}>
            <strong>We are the unions of The New York Times.</strong>
          </p>
        </div>
      </div>
    </header>
  );
}
