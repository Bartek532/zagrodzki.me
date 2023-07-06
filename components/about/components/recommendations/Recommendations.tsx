import Image from "next/image";
import { memo } from "react";

import QuoteIcon from "public/svg/quote.svg";

import styles from "./recommendations.module.scss";

import type { Recommendation } from "../../types";

interface RecommendationsProps {
  readonly recommendations: readonly Recommendation[];
}

export const Recommendations = memo<RecommendationsProps>(({ recommendations }) => (
  <section className={styles.recommendations}>
    <h2 className={styles.title}>Recommendations</h2>
    <p className={styles.description}>What do others say about me? 👀</p>

    <ul className={styles.list}>
      {recommendations.map(({ content, author }) => (
        <li key={author.name} className={styles.item}>
          <blockquote className={styles.recommendation}>
            <div className={styles.icon}>
              <QuoteIcon />
            </div>
            <p className={styles.content}>{content}</p>
            <div className={styles.author}>
              <div className={styles.avatar}>
                <Image src={author.image} alt={author.name} fill />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{author.name}</span>
                <span className={styles.positions}>{author.position}</span>
              </div>
            </div>
          </blockquote>
        </li>
      ))}
    </ul>
  </section>
));

Recommendations.displayName = "Recommendations";
