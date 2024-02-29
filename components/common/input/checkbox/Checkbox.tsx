import clsx from "clsx";
import { memo } from "react";

import styles from "./checkbox.module.scss";

type CheckboxProps = {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
  readonly children?: React.ReactNode;
  readonly className?: string | undefined;
};

export const Checkbox = memo<CheckboxProps>(({ checked, onChange, label, children, className }) => (
  <label className={clsx(styles.label, className)}>
    <span className="sr-only">{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={styles.checkbox}
    />
    {children}
  </label>
));

Checkbox.displayName = "Checkbox";
