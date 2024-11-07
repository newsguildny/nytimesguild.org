import cx from "classnames";
import styles from "./livepill.module.css";

export const LivePill = ({ outlined = false, small = false }) => (
  <span
    className={cx(styles["live-pill"], {
      [styles.filled]: !outlined,
      [styles.outlined]: outlined,
      [styles.small]: small,
    })}
  >
    live
  </span>
);
