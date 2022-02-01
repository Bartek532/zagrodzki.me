import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./input.module.scss";

export const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements["input"] & { isError?: boolean }>(
  ({ isError, children, ...props }, ref) => {
    return (
      <label className={styles.wrapper}>
        {children}
        <input
          ref={ref}
          {...props}
          className={clsx(styles.input, { [styles.error]: isError })}
          type={props.type || "text"}
        />
      </label>
    );
  },
);

Input.displayName = "Input";
