import Image from "next/image";
import Link from "next/link";

import WinkingAvatar from "public/img/avatars/winking.png";
import Arrow from "public/svg/right-top-arrow.svg";

import styles from "./aboutTile.module.scss";

export const AboutTile = () => {
  return (
    <Link href="/about" className={styles.tile}>
      <div className={styles.avatar}>
        <Image src={WinkingAvatar} alt="winking memoji" />
      </div>
      <p className={styles.description}>
        I&#39;m <strong className={styles.name}>Bartek</strong>, full-stack
        developer, blogger, freelancer, technologies enthusiast. I&#39;m in love
        with React and TypeScript ❤️ Constantly learning and discovering new
        stuff 📖
      </p>
      <div className={styles.more}>
        Learn more
        <span className={styles.arrow}>
          <Arrow />
        </span>
      </div>
    </Link>
  );
};
