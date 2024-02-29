import { memo } from "react";

import styles from "./toggle.module.scss";

type ToggleProps = {
  readonly value: boolean;
  readonly onChange: (value: boolean) => void;
  readonly children: React.ReactNode;
};

export const Toggle = memo<ToggleProps>(({ value, onChange, children }) => (
  <>
    <input
      type="checkbox"
      className={styles.checkbox}
      onChange={(e) => onChange(e.target.checked)}
      checked={value}
    />
    <div className={styles.toggle}>
      <div className={styles.icon}>{children}</div>
    </div>
  </>
));

Toggle.displayName = "Toggle";
