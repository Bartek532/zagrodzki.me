import { memo } from "react";

import type { Fact as FactType } from "../../types";

import styles from "./facts.module.scss";
import { Fact } from "./fact/Fact";

type FactsProps = {
  readonly facts: readonly FactType[];
};

export const Facts = memo<FactsProps>(({ facts }) => {
  return (
    <section className={styles.facts}>
      <h2 className={styles.title}>Fun facts</h2>
      <p className={styles.description}>Some unique things about me ✨</p>

      <ul className={styles.list}>
        {facts.map((fact) => (
          <Fact key={fact.title} fact={fact} />
        ))}
      </ul>
    </section>
  );
});

Facts.displayName = "Facts";
