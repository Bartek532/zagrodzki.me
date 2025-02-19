"use client";

import { useState, useEffect } from "react";
import Confetti from "react-dom-confetti";

import { cn } from "@/utils";
import { copyToClipboard } from "@/utils/clipboard";
import { onPromise } from "@/utils/functions";

interface CopyButtonProps {
  readonly label: string;
  readonly textToCopy: string;
}

export const CopyButton = ({ label, textToCopy }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyButtonClick = async () => {
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
    <div className="flex w-full flex-col items-center py-8">
      <div className="relative z-10">
        <Confetti active={isCopied} config={confettiConfig} />
      </div>
      <button
        onClick={onPromise(handleCopyButtonClick)}
        className={cn(
          "cursor-pointer rounded-xl border bg-border px-5 py-2 text-foreground transition-colors duration-200 hover:border-ring focus:border-ring",
          isCopied && "border-ring",
        )}
      >
        {isCopied ? "Copied! 🎉" : label}
      </button>
    </div>
  );
};
