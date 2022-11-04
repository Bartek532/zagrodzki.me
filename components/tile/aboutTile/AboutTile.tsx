import Link from "next/link";
import Image from "next/image";

import Arrow from "public/svg/right-top-arrow.svg";

import styles from "./aboutTile.module.scss";

export const AboutTile = () => {
  return (
    <Link href="/about">
      <a className={styles.tile}>
        <div className={styles.avatar}>
          <Image src="/img/avatars/winking.png" alt="winking memoji" width={230} height={306} />
        </div>
        <p className={styles.description}>
          I&apos;m <strong className={styles.name}>Bartek</strong>, full-stack developer, blogger, freelancer,
          technologies enthusiast. I&apos;m in love with React and TypeScript ❤️ Constantly learning and discovering new
          stuff 📖
        </p>
        <div className={styles.more}>
          Learn more
          <span className={styles.arrow}>
            <Arrow />
          </span>
        </div>
      </a>
    </Link>
  );
};
