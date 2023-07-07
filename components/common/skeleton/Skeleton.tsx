import { memo } from "react";

import styles from "./skeleton.module.scss";

interface SkeletonProps {
  readonly w?: number;
  readonly h?: number;
}

export const Skeleton = memo<SkeletonProps>(({ w, h }) => (
  <div
    className={styles.skeleton}
    style={{
      maxWidth: w ? `${w}rem` : "100%",
      height: h ? `${h}rem` : "4.5rem",
    }}
  ></div>
));

Skeleton.displayName = "Skeleton";
