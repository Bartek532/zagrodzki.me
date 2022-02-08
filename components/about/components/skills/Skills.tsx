import { memo } from "react";
import Image from "next/image";

import type { Skill } from "../../types";

import styles from "./skills.module.scss";

type SkillsProps = {
  readonly skills: readonly Skill[];
};

export const Skills = memo<SkillsProps>(({ skills }) => {
  return (
    <section className={styles.skills}>
      <h2 className={styles.title}>Skills</h2>
      <p className={styles.description}>All the technologies I feel comfortable with ⚙️</p>

      <ul className={styles.list}>
        {skills.map((skill) => (
          <li className={styles.skill} key={skill.slug} style={{ color: skill.color }}>
            <Image src={`/svg/techs/${skill.slug}.svg`} alt={skill.name} width="32" height="32" />
          </li>
        ))}
      </ul>
    </section>
  );
});
