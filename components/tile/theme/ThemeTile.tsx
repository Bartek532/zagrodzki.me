"use client";

import { ThemeSwitcher } from "components/common/theme/ThemeSwitcher";

import styles from "./themeTile.module.scss";

export const ThemeTile = () => (
  <label className={styles.tile}>
    <ThemeSwitcher />
  </label>
);

ThemeTile.displayName = "ThemeTile";
