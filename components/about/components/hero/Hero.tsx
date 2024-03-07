import { random } from "lodash";

import { Image } from "components/common/image/Image";
import { Link } from "components/common/link/Link";
import Me from "public/img/me.webp";
import { normalizeCount } from "utils/functions";

import styles from "./hero.module.scss";

export const Hero = ({ views }: { views: number }) => (
  <section className={styles.hero}>
    <div className={styles.text}>
      <h2 className={styles.title}>Hi, I&#39;m Bartosz Zagrodzki&nbsp;👋</h2>
      <p className={styles.description}>
        <span className={styles.paragraph}>
          I&#39;m a 21 years old software engineer based in Poland. I&#39;m passionate about
          constructing modern software that enhances the lives of others, as well as my own. My
          blogging journey began by publishing translations on{" "}
          <Link href="https://dev.to/bartek532">dev.to</Link> and now I&#39;m here with{" "}
          <strong>{normalizeCount(views || random(32000, 34000))}</strong> posts views.
        </span>
        <span className={styles.paragraph}>
          My main focus is the user and his experience. I believe that the best software is the one
          that keeps satisfaction and provide positive impact. I&#39;m always open to innovative
          ideas and solutions, so I think we&#39;re gonna get along. 😎
        </span>
        <span className={styles.paragraph}>
          I enjoy engaging in conversations with interesting people. In my free time, I like to read
          or play a game of chess. Additionally, I have a passion for swimming 💪
        </span>
        <span className={styles.paragraph}>
          Sounds interesting? Feel free to <Link href="/contact">contact me!</Link>
        </span>
      </p>
    </div>

    <div className={styles.image}>
      <Image src={Me} width="450" height="660" alt="" />
    </div>
  </section>
);
