import Link from "next/link";
import { ReactNode } from "react";
import cx from "classnames";
import { publicSans } from "src/app/fonts";
import { ArrowIcon } from "../svgs/ArrowIcon";
import styles from "./calltoaction.module.css";

interface Props {
  to: string;
  children: ReactNode;
}

export function CallToAction({ to, children }: Props) {
  return (
    <div>
      {/* CallToActions can point to internal or external links.
        If links are external, then we can't use next/link. */}
      {to.includes("://") ? (
        <a className={cx(publicSans.className, styles.link)} href={to}>
          {children}
          <ArrowIcon className={styles.arrow} />
        </a>
      ) : (
        <Link href={to} className={cx(publicSans.className, styles.link)}>
          {children}
          <ArrowIcon className={styles.arrow} />
        </Link>
      )}
    </div>
  );
}
