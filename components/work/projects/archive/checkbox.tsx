"use client";

import { Checkbox } from "@radix-ui/react-checkbox";
import { useToggleRefinement } from "react-instantsearch";

import { cn } from "@/utils";

import styles from "./checkbox.module.scss";

export const ArchiveCheckbox = () => {
  const { refine, value } = useToggleRefinement({
    attribute: "archived",
    on: false,
  });

  return (
    <Checkbox
      aria-label="show only active projects"
      checked={value.isRefined}
      onCheckedChange={(checked) => {
        refine({ isRefined: !checked });
      }}
      className={styles.checkbox}
    >
      <div className={styles.wrapper}>
        <div className={cn(styles.box, styles.active && { [styles.active]: !value.isRefined })}>
          <div className={cn(styles.side, styles.cover)}>
            <div className={cn(styles.coverSide, styles.left)}></div>
            <div className={cn(styles.coverSide, styles.right)}></div>
            <div className={cn(styles.coverSide, styles.front)}></div>
            <div className={cn(styles.coverSide, styles.back)}></div>
          </div>

          <div className={styles.tape}></div>
          <div className={styles.label}>Archive</div>
          <div className={cn(styles.side, styles.front)}></div>
          <div className={cn(styles.side, styles.back)}></div>
          <div className={cn(styles.side, styles.left)}></div>
          <div className={cn(styles.side, styles.right)}></div>
          <div className={cn(styles.side, styles.bottom)}></div>
        </div>
      </div>
    </Checkbox>
  );
};
