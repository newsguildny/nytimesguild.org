import { ReactNode } from "react";
import { ArrowIcon } from "../svgs/ArrowIcon";
import styles from "./download.module.css";

interface Props {
  to: string;
  children: ReactNode;
}

export function Download({ to, children }: Props) {
  return (
    <div>
      {/* Download expects downloadable links. */}
      <a href={to} className={styles.link} type="text/calendar" download>
        {children}
        <ArrowIcon className={styles.arrow} />
      </a>
    </div>
  );
}
