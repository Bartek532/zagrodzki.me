import styles from "./twitterTile.module.scss";
import { memo } from "react";
import TwitterIcon from "public/svg/twitter.svg";
import Arrow from "public/svg/right-top-arrow.svg";

type TwitterTileProps = {
  readonly username: string;
};

export const TwitterTile = memo<TwitterTileProps>(({ username }) => {
  return (
    <a href={`https://twitter.com/${username}`} className={styles.tile}>
      <span className="sr-only">visit my twitter account</span>
      <div className={styles.icon}>
        <TwitterIcon />
      </div>
      <div className={styles.arrow}>
        <Arrow />
      </div>
    </a>
  );
});

TwitterTile.displayName = "TwitterTile";
