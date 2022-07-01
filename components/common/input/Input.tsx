import { forwardRef } from "react";
import clsx from "clsx";

import SearchIcon from "public/svg/search.svg";

import styles from "./input.module.scss";

export const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements["input"] & { isError?: boolean }>(
  ({ isError, children, ...props }, ref) => {
    return (
      <label className={styles.wrapper}>
        {children}
        {props.type === "search" && <SearchIcon className={styles.icon} />}
        <input
          ref={ref}
          {...props}
          className={clsx(styles.input, { [styles.error]: isError, [styles.search]: props.type === "search" })}
          type={props.type || "text"}
        />
      </label>
    );
  },
);

Input.displayName = "Input";
