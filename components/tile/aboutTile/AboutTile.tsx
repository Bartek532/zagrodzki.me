import styles from "./aboutTile.module.scss";
import Link from "next/link";
import Arrow from "public/svg/right-top-arrow.svg";
import Image from "next/image";

export const AboutTile = () => {
  return (
    <div className={styles.tile}>
      <div className={styles.avatar}>
        <Image src="/img/avatar.png" alt="Bartosz Zagrodzki memoji" width={230} height={306} />
      </div>
      <p className={styles.description}>
        I&apos;m <strong className={styles.name}>Bartek</strong>, front-end developer, blogger, new technologies
        enthusiast. I&apos;m in love with React and TypeScript ❤️ Constantly learning and discovering new stuff 📖
      </p>
      <Link href="/about">
        <a className={styles.more}>
          Learn more
          <span className={styles.arrow}>
            <Arrow />
          </span>
        </a>
      </Link>
    </div>
  );
};
