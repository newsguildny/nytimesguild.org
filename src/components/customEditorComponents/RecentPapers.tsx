import { ShopPaperSnippet } from "../ShopPaperSnippet";
import {
  getPaperMetadata,
  getRecentPapersFilenames,
} from "../../lib/collections/papers";
import styles from "./recentpapers.module.css";

export function RecentPapers() {
  const recentPapers = getRecentPapersFilenames().map((filename) =>
    getPaperMetadata(filename),
  );
  return (
    <>
      <hr className={styles["recent-papers-rule"]} />
      <aside className={styles.aside}>
        <h2>Guild Updates</h2>
        {recentPapers?.map((paper) => (
          <ShopPaperSnippet key={paper.slug} paper={paper} />
        ))}
      </aside>
    </>
  );
}
