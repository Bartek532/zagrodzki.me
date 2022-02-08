import { memo } from "react";
import dynamic from "next/dynamic";

import type { Fact as FactType } from "../../../types";

import styles from "./fact.module.scss";

type FactProps = {
  readonly fact: FactType;
};

export const Fact = memo<FactProps>(({ fact }) => {
  const Icon = dynamic(() => import(`public/svg/${fact.icon}.svg`));

  return (
    <li className={styles.fact}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <h3 className={styles.title}>{fact.title}</h3>
      <p className={styles.description}>{fact.description}</p>
    </li>
  );
});

Fact.displayName = "Fact";
