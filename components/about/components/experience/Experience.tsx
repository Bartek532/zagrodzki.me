import { memo } from "react";
import Link from "next/link";

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
            <Link href={position.link}>
              <a rel="noreferrer noopener" target="_blank">
                <h3 className={styles.name}>{position.position}</h3>
                <p className={styles.company}>{position.company}</p>
                <p className={styles.date}>{position.date}</p>
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
});

Experience.displayName = "Experience";
