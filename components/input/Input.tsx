import styles from "./input.module.scss";
import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements["input"]>(({ children, ...props }, ref) => {
  return (
    <label className={styles.wrapper}>
      {children}
      <input ref={ref} {...props} className={styles.input} />
    </label>
  );
});

Input.displayName = "Input";
