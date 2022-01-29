import { memo } from "react";

import styles from "./hero.module.scss";

type HeroProps = {
  readonly title: string;
  readonly description: string;
};

export const Hero = memo<HeroProps>(({ title, description }) => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
});

Hero.displayName = "Hero";
