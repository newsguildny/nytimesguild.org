import { getSolidarityStatementData } from "src/lib/collections/solidarityStatements";
import cx from "classnames";
import { publicSans } from "src/app/fonts";
import styles from "./solidaritystatement.module.css";
import { MDX } from "./MDX";

interface Props {
  solidarityStatement: ReturnType<typeof getSolidarityStatementData>;
}

export function SolidarityStatement({ solidarityStatement }: Props) {
  return (
    <div
      className={cx(styles.container, publicSans.className, {
        [styles["no-logo"]]: !solidarityStatement.logo,
      })}
    >
      {solidarityStatement.logo && (
        <img className={styles.img} src={solidarityStatement.logo} alt="" />
      )}
      <div className={styles["text-container"]}>
        <h4 className={styles.h4}>{solidarityStatement.name}</h4>
        <MDX source={solidarityStatement.content} />
      </div>
    </div>
  );
}
