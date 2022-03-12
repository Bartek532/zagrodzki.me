import { memo, useState, useEffect } from "react";
import clsx from "clsx";
import Confetti from "react-dom-confetti";

import { copyToClipboard } from "utils/clipboard";

import styles from "./copyBtn.module.scss";

type CopyBtnProps = {
  readonly label: string;
  readonly textToCopy: string;
};

export const CopyBtn = memo<CopyBtnProps>(({ label, textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyBtnClick = async () => {
    try {
      await copyToClipboard(textToCopy);
      setIsCopied(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  const confettiConfig = {
    spread: 360,
    startVelocity: 20,
  };

  return (
    <div className={styles.wrapper}>
      <Confetti active={isCopied} config={confettiConfig} />
      <button onClick={handleCopyBtnClick} className={clsx(styles.btn, { [styles.copied]: isCopied })}>
        {isCopied ? "Copied! 🎉" : label}
      </button>
    </div>
  );
});

CopyBtn.displayName = "CopyBtn";
