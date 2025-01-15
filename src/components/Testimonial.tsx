import { getTestimonialData } from "src/lib/collections/testimonials";
import cx from "classnames";
import { publicSans } from "src/app/fonts";
import styles from "./testimonial.module.css";
import { TGuild } from "./svgs/TGuild";
import { MDX } from "./MDX";

interface Props {
  testimonial: ReturnType<typeof getTestimonialData>;
}

export function Testimonial({ testimonial }: Props) {
  return (
    <div className={cx(publicSans.className, styles.container)}>
      {testimonial.headshot ? (
        <img className={styles.img} src={testimonial.headshot} alt="" />
      ) : (
        <div className={styles["tguild-wrapper"]}>
          <TGuild className={styles.tguild} />
        </div>
      )}
      <div className={styles["text-container"]}>
        <h4 className={styles.h4}>
          {testimonial.name}
          {testimonial.role && `, ${testimonial.role}`}
        </h4>
        <MDX source={testimonial.content} />
      </div>
    </div>
  );
}
