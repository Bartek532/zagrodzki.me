import Image from "next/image";

import PissedOffAvatar from "public/img/avatars/pissed-off.png";

import styles from "./404.module.scss";

export const Custom404 = () => (
  <div className={styles.wrapper}>
    <div className={styles.image}>
      <Image src={PissedOffAvatar} alt="pissed off memoji" />
    </div>
    <h1 className={styles.title}>404!</h1>
    <p className={styles.description}>The page you are looking for does not exist.</p>
  </div>
);
