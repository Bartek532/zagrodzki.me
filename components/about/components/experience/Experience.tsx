import { memo } from "react";

import styles from "./experience.module.scss";

import type { Position } from "../../types";

interface ExperienceProps {
  readonly positions: readonly Position[];
}

export const Experience = memo<ExperienceProps>(({ positions }) => (
  <section className={styles.experience}>
    <h2 className={styles.title}>Experience</h2>
    <p className={styles.description}>All the places I&#39;ve worked at so far 💼</p>

    <ol className={styles.list}>
      {positions.map((position) => (
        <li key={position.id} className={styles.position}>
          <a rel="noreferrer noopener" target="_blank" href={position.link}>
            <h3 className={styles.name}>{position.position}</h3>
            <p className={styles.company}>{position.company}</p>
            <p className={styles.date}>{position.date}</p>
          </a>
        </li>
      ))}
    </ol>
  </section>
));

Experience.displayName = "Experience";
