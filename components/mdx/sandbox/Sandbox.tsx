import { memo } from "react";

import styles from "./sandbox.module.scss";

type SandboxProps = {
  readonly id: string;
  readonly theme: "dark" | "light";
};

export const Sandbox = memo<SandboxProps>(({ id, theme }) => {
  return (
    <div className={styles.wrapper}>
      <iframe
        src={`https://codesandbox.io/embed/${id}?fontsize=14&codemirror=1&theme=${theme}`}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        className={styles.sandbox}
      ></iframe>
    </div>
  );
});

Sandbox.displayName = "Sandbox";
