import styles from "./pdfembed.module.css";

interface Props {
  src?: string;
  title?: string;
}

export function PDFEmbed({ src, title }: Props) {
  return (
    <div className={styles["pdf-iframe-container"]}>
      <iframe className={styles.iframe} src={src} title={title} />
    </div>
  );
}
