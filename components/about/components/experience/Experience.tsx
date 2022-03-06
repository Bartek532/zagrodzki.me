import { memo } from "react";

import type { Position } from "../../types";

import styles from "./experience.module.scss";

type ExperienceProps = {
  readonly positions: readonly Position[];
};

export const Experience = memo<ExperienceProps>(({ positions }) => {
  return (
    <section className={styles.experience}>
      <h2 className={styles.title}>Experience</h2>
      <p className={styles.description}>All the places I've worked at so far 💼</p>

      <ol className={styles.list}>
        {positions.map((position) => (
          <li key={position.id} className={styles.position}>
            <h3 className={styles.name}>{position.position}</h3>
            <p className={styles.company}>{position.company}</p>
            <p className={styles.date}>{position.date}</p>
          </li>
        ))}
      </ol>
    </section>
  );
});

Experience.displayName = "Experience";
