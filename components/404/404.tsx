import Image from "next/image";

import styles from "./404.module.scss";

export const Custom404 = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image src="/img/avatars/pissed-off.png" alt="pissed off memoji" width="421" height="421" />
      </div>
      <h1 className={styles.title}>404!</h1>
      <p className={styles.description}>The page you are looking for does not exist.</p>
    </div>
  );
};
