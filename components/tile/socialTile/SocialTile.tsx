import styles from "./socialTile.module.scss";
import { memo } from "react";
import TwitterIcon from "public/svg/twitter.svg";
import Arrow from "public/svg/right-top-arrow.svg";
import { SOCIALS } from "lib/consts";
import dynamic from "next/dynamic";

type SocialTileProps = {
  readonly social: typeof SOCIALS[number]["name"];
  readonly username: string;
};

export const SocialTile = memo<SocialTileProps>(({ username, social }) => {
  const selectedSocial = SOCIALS.find(({ name }) => name === social);
  const Icon = dynamic(() => import(`public/svg/${selectedSocial?.name}.svg`));
  return (
    <a
      href={`${selectedSocial?.link + username}`}
      className={styles.tile}
      style={{ backgroundColor: selectedSocial?.color }}
    >
      <span className="sr-only">visit my {social} account</span>
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.arrow}>
        <Arrow />
      </div>
    </a>
  );
});

SocialTile.displayName = "SocialTile";
