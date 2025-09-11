import Link from "next/link";
import cx from "classnames";
import { crimsonPro, publicSans } from "src/app/fonts";
import { ArrowIcon } from "./svgs/ArrowIcon";
import styles from "./shoppapersnippet.module.css";

export interface ShopPaperData {
  filename: string;
  slug: string;
  headline: string;
  snippet: string;
}

interface Props {
  paper: ShopPaperData;
}

export function ShopPaperSnippet({ paper }: Props) {
  return (
    <div className={styles.snippet}>
      <h3 className={cx(publicSans.className, styles.h3)}>{paper.headline}</h3>
      <p className={cx(styles.p, crimsonPro.className)}>{paper.snippet}</p>
      <Link
        href={`/papers/${paper.filename}/`}
        className={cx(publicSans.className, styles.link)}
      >
        Continue Reading <ArrowIcon className={styles.arrow} />
      </Link>
    </div>
  );
}
