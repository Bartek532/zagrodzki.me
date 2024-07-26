import Image from "next/image";

import { SuperLink } from "components/common/link/SuperLink";
import WinkingAvatar from "public/img/avatars/winking.png";
import Arrow from "public/svg/right-top-arrow.svg";

import styles from "./aboutTile.module.scss";

export const AboutTile = () => (
  <SuperLink href="/about" className={styles.tile}>
    <div className={styles.avatar}>
      <Image src={WinkingAvatar} alt="winking memoji" />
    </div>
    <p className={styles.description}>
      I&#39;m <strong className={styles.name}>Bart</strong>, software engineer building products to
      help people lead better lives 🎯 In love with creative solutions - constantly learning and
      discovering new stuff 📖
    </p>
    <div className={styles.more}>
      Learn more
      <span className={styles.arrow}>
        <Arrow />
      </span>
    </div>
  </SuperLink>
);
