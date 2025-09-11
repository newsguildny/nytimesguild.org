import cx from "classnames";
import styles from "./burger.module.css";

interface Props {
  active: boolean;
  onClick: () => void;
  className?: string;
}

export function Burger({ active, onClick, className }: Props) {
  return (
    <button
      type="button"
      className={cx(className, "container", styles.button, {
        [styles.active]: active,
      })}
      onClick={onClick}
      aria-label="Open navigation"
    >
      <div className={cx(styles.bun, styles["bun-1"])} />
      <div className={cx(styles.bun, styles["bun-3"])} />
    </button>
  );
}
