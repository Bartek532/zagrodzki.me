import dynamic from "next/dynamic";
import { memo } from "react";

import styles from "./skills.module.scss";

import type { Skill } from "../../types";

interface SkillsProps {
  readonly skills: readonly Skill[];
}

export const Skills = memo<SkillsProps>(({ skills }) => (
  <section className={styles.skills}>
    <h2 className={styles.title}>Skills</h2>
    <p className={styles.description}>All the technologies I feel comfortable with ⚙️</p>

    <ul className={styles.list}>
      {skills.map((skill) => {
        const Icon = dynamic(() => import(`public/svg/techs/${skill.slug}.svg`));

        return (
          <li className={styles.skill} key={skill.slug} style={{ color: skill.color }}>
            <a href={skill.link} rel="noreferrer noopener" target="_blank" className={styles.link}>
              <span className={styles.label}>{skill.name}</span>
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  </section>
));

Skills.displayName = "Skills";
