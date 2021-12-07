import styles from "./aboutTile.module.scss";
import Avatar from "public/svg/avatar.svg";
import Link from "next/link";
import Arrow from "public/svg/right-top-arrow.svg";

export const AboutTile = () => {
  return (
    <div className={styles.tile}>
      <div className={styles.avatar}>
        <Avatar />
      </div>
      <p className={styles.description}>
        Im <strong className={styles.name}>Bartek</strong>, ane engieer and
        product designer from Ireland. Im interested in REact, Node, Jamstack
        Startups, and mMuic Crytpo. Lorem ipsum dolor sit amet consectetur
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
