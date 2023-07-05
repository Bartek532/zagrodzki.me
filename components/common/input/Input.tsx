import clsx from "clsx";
import { forwardRef } from "react";

import SearchIcon from "public/svg/search.svg";

import styles from "./input.module.scss";

export const Input = forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"] & { isError?: boolean }
>(({ isError, children, ...props }, ref) => (
  <label className={styles.wrapper}>
    {children}
    {props.type === "search" && <SearchIcon className={styles.icon} />}
    <input
      ref={ref}
      {...props}
      className={clsx(styles.input, {
        ...(styles.error ? { [styles.error]: isError } : {}),
        ...(styles.search ? { [styles.search]: props.type === "search" } : {}),
      })}
      type={props.type ?? "text"}
    />
  </label>
));

Input.displayName = "Input";
