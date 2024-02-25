import { Link } from "components/common/link/Link";
import { allPositions } from "data/experience";
import { allFacts } from "data/facts";
import { allRecommendations } from "data/recommendations";
import { allSkills } from "data/skills";
import { env } from "env/client";
import { getAllResourcesTotalViews } from "lib/kv/views";

import styles from "./about.module.scss";
import { Experience } from "./components/experience/Experience";
import { Facts } from "./components/facts/Facts";
import { GithubGraph } from "./components/github/GithubGraph";
import { Hero } from "./components/hero/Hero";
import { Recommendations } from "./components/recommendations/Recommendations";
import { Skills } from "./components/skills/Skills";

export const About = async () => {
  const views = await getAllResourcesTotalViews();

  return (
    <div className={styles.about}>
      <Hero views={views} />
      <div className={styles.container}>
        <Skills skills={allSkills} />
        <Experience positions={allPositions} />
      </div>
      <Facts facts={allFacts} />
      <div className={styles.container}>
        <div className={styles.collaboration}>
          <h2 className={styles.title}>Collaboration</h2>
          <p className={styles.description}>
            I&#39;m always open to new suggestions. If you have an unconventional offer or want to
            see what else I have to offer, contact me at{" "}
            <Link href={`mailto:${env.NEXT_PUBLIC_EMAIL}`}>{env.NEXT_PUBLIC_EMAIL}</Link>
          </p>
        </div>
        <div className={styles.contact}>
          <h2 className={styles.title}>Contact</h2>
          <p className={styles.description}>
            You can contact me directly from my <Link href="/contact">website</Link>, via{" "}
            <Link href={`mailto:${env.NEXT_PUBLIC_EMAIL}`}>email</Link>,{" "}
            <Link href={`https://facebook.com/${env.NEXT_PUBLIC_LINKEDIN_USERNAME}`}>Linkedin</Link>
            , <Link href={`https://x.com/${env.NEXT_PUBLIC_X_USERNAME}`}>X (Twitter)</Link> or other
            social media. I reply to all messages! Ask me anything, I&#39;m not afraid of any
            topics.
          </p>
        </div>
      </div>
      <Recommendations recommendations={allRecommendations} />
      <GithubGraph />
    </div>
  );
};
