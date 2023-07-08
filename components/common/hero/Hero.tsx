import clsx from "clsx";
import { memo } from "react";

import { Skeleton } from "../skeleton/Skeleton";

import styles from "./hero.module.scss";

interface HeroProps {
  readonly title: string;
  readonly description: string;
}

export const Hero = memo<HeroProps>(({ title, description }) => (
  <div className={styles.hero}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.description}>{description}</p>
  </div>
));

export const HeroSkeleton = () => (
  <div className={clsx(styles.hero, styles.skeleton)}>
    <Skeleton h={5} w={15} />
    <Skeleton h={6.5} w={35} />
  </div>
);

Hero.displayName = "Hero";
