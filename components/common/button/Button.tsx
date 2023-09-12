import clsx from "clsx";
import { memo } from "react";

import { Spinner } from "components/common/spinner/Spinner";

import styles from "./button.module.scss";

interface ButtonProps {
  /**
   * JSX which will be rendered inside the button
   */
  children?: React.ReactNode;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Status of the button
   * @default pending
   */
  status?: "pending" | "loading" | "fullfilled" | "rejected";
  /**
   * Is the button disabled?
   * @default false
   * */
  disabled?: boolean;
}

export const Button = memo<ButtonProps>(
  ({ children, status = "pending", className, disabled = false }) => (
    <button className={clsx(styles.btn, styles[status], className)} disabled={disabled}>
      {status === "loading" ? (
        <div className={styles.loader}>
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  ),
);

Button.displayName = "Button";
