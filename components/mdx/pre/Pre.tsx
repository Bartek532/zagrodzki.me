import { memo, useRef, useState, useEffect } from "react";
import clsx from "clsx";

import CheckIcon from "public/svg/check.svg";
import { copyToClipboard } from "utils/clipboard";
import CopyIcon from "public/svg/copy.svg";

import styles from "./pre.module.scss";

type PreProps = {
  readonly children: React.ReactNode;
};

export const Pre = memo<PreProps>(({ children, ...props }) => {
  const preRef = useRef<HTMLPreElement | null>(null);

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopy = async () => {
    if (preRef.current?.innerText) {
      await copyToClipboard(preRef.current.innerText);
      setIsCopied(true);
    }
  };

  return (
    <pre {...props} ref={preRef} className={styles.pre}>
      <div className={clsx(styles.copy, { [styles.copied]: isCopied })}>
        <button className={styles.btn} onClick={handleCopy} aria-label="copy code to clipboard">
          <div className={styles.icon}>{isCopied ? <CheckIcon /> : <CopyIcon />}</div>
        </button>
      </div>
      {children}
    </pre>
  );
});

Pre.displayName = "Pre";
