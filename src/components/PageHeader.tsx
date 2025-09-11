import { crimsonPro } from "src/app/fonts";
import cx from "classnames";
import styles from "./pageheader.module.css";

interface Props {
  heading?: string;
  subheading?: string;
}

export function PageHeader({ heading, subheading }: Props) {
  return (
    <header className={cx(crimsonPro.className, styles.header)}>
      {heading && <h1 className={styles.h1}>{heading}</h1>}
      {subheading && <p className={styles.subheading}>{subheading}</p>}
    </header>
  );
}
