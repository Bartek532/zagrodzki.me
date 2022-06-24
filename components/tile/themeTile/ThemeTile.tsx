import { ThemeSwitcher } from "components/common/themeSwitcher/ThemeSwitcher";

import styles from "./themeTile.module.scss";

export const ThemeTile = () => {
  return (
    <label className={styles.tile}>
      <ThemeSwitcher />
    </label>
  );
};

ThemeTile.displayName = "ThemeTile";
