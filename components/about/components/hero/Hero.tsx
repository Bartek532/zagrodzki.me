import Image from "next/image";

import { Link } from "components/mdx/link/Link";
import { normalizeViewsCount } from "utils/functions";

import styles from "./hero.module.scss";

export const Hero = ({ views }: { views: number }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h2 className={styles.title}>Hi, I&#39;m Bartosz Zagrodzki&nbsp;👋</h2>
        <p className={styles.description}>
          <span className={styles.paragraph}>
            I&#39;m a 20 year old software engineer based in Poland. I&#39;m
            passionate about building modern software that helps others
            (including me) to improve their lives. I started my blogging
            adventure by publishing translations on{" "}
            <Link href="https://dev.to/bartek532">dev.to</Link> and now I&#39;m
            here with <strong>{normalizeViewsCount(views)}</strong> posts views.
          </span>
          <span className={styles.paragraph}>
            I&#39;m working as a freelancer, so if you want to hire me, check
            the sections below. I&#39;m always open to innovative ideas and
            solutions, so I think we&#39;re gonna get along. 😎
          </span>
          <span className={styles.paragraph}>
            I love talking to interesting people, in my free time I also like to
            just read or play a game of chess. I love swimming too. 💪
          </span>
          <span className={styles.paragraph}>
            Sounds interesting? Feel free to{" "}
            <Link href="/contact">contact me!</Link>
          </span>
        </p>
      </div>

      <div className={styles.image}>
        <Image src="/img/me.png" width="400" height="586" alt="" />
      </div>
    </section>
  );
};
