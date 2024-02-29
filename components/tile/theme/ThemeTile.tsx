"use client";

import { ThemeSwitcher } from "components/common/theme/ThemeSwitcher";

import styles from "./themeTile.module.scss";

export const ThemeTile = () => <ThemeSwitcher className={styles.tile} />;

ThemeTile.displayName = "ThemeTile";
