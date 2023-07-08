import { memo } from "react";

import styles from "./skeleton.module.scss";

interface SkeletonProps {
  readonly w?: number;
  readonly h?: number;
  readonly square?: boolean;
}

export const Skeleton = memo<SkeletonProps>(({ w, h, square }) => (
  <div
    className={styles.skeleton}
    style={{
      maxWidth: w ? `${w}rem` : "100%",
      height: h ? `${h}rem` : "100%",
      ...(square && { aspectRatio: "1/1" }),
    }}
  ></div>
));

Skeleton.displayName = "Skeleton";
