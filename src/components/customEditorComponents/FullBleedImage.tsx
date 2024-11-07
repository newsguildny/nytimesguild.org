import cx from "classnames";
import styles from "./fullbleedimage.module.css";

interface FullBleedImageProps {
  src: string;
  alt: string;
}

export function FullBleedImage({ src, alt }: FullBleedImageProps) {
  return (
    <img
      className={cx(styles["full-bleed-image"], "full-bleed")}
      src={src}
      alt={alt}
    />
  );
}
