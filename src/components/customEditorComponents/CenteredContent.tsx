import { ReactNode } from "react";
import styles from "./centeredcontent.module.css";

interface Props {
  children: ReactNode;
}

export function CenteredContent({ children }: Props) {
  return <div className={styles.center}>{children}</div>;
}
