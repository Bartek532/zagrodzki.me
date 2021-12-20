import styles from "./input.module.scss";
import { memo, forwardRef } from "react";

type InputProps = {
  readonly placeholder: string;
  readonly label: string;
  readonly name: string;
};

export const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements["input"]>(({ children, ...props }, ref) => {
  return (
    <label className={styles.wrapper}>
      {children}
      <input ref={ref} {...props} />
    </label>
  );
});

Input.displayName = "Input";
