import clsx from "clsx";
import { forwardRef } from "react";

import { LoaderRing } from "components/common/loader/LoaderRing";
import { FormStatus } from "types";

import styles from "./button.module.scss";

export const Button = forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements["button"] & { status?: FormStatus }
>(({ children, className, status, ...props }, ref) => (
  <button ref={ref} {...props} className={clsx(styles.btn, status && styles[status], className)}>
    {status === "loading" ? (
      <div className={styles.loader}>
        <LoaderRing />
      </div>
    ) : (
      children
    )}
  </button>
));

Button.displayName = "Button";
