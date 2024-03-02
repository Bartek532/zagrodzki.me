import clsx from "clsx";
import { connectToggleRefinement } from "react-instantsearch-core";

import { Checkbox } from "components/common/input/checkbox/Checkbox";
import { ToggleRefinementProps } from "types";

import styles from "./archiveCheckbox.module.scss";

export const ArchiveCheckbox = connectToggleRefinement(
  ({ currentRefinement, refine, label }: ToggleRefinementProps) => (
    <Checkbox
      label={label}
      checked={currentRefinement}
      onChange={(checked) => refine(checked)}
      className={styles.checkbox}
    >
      <div className={styles.wrapper}>
        <div className={clsx(styles.box, styles.active && { [styles.active]: !currentRefinement })}>
          <div className={clsx(styles.side, styles.cover)}>
            <div className={clsx(styles.coverSide, styles.left)}></div>
            <div className={clsx(styles.coverSide, styles.right)}></div>
            <div className={clsx(styles.coverSide, styles.front)}></div>
            <div className={clsx(styles.coverSide, styles.back)}></div>
          </div>

          <div className={styles.tape}></div>
          <div className={styles.label}>Archive</div>
          <div className={clsx(styles.side, styles.front)}></div>
          <div className={clsx(styles.side, styles.back)}></div>
          <div className={clsx(styles.side, styles.left)}></div>
          <div className={clsx(styles.side, styles.right)}></div>
          <div className={clsx(styles.side, styles.bottom)}></div>
        </div>
      </div>
    </Checkbox>
  ),
);
