"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState, useEffect } from "react";

import { copyToClipboard } from "@/utils/clipboard";
import { onPromise } from "@/utils/functions";

interface PreProps {
  readonly children: React.ReactNode;
}

export const Pre = ({ children, ...props }: PreProps) => {
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
    <pre {...props} ref={preRef} className="group not-prose relative">
      <div
        className={`absolute top-3 right-3 z-10 transition-opacity duration-200 ${isCopied ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <button
          onClick={onPromise(handleCopy)}
          aria-label="copy code to clipboard"
          className={`flex size-9 cursor-pointer items-center justify-center rounded-md border bg-transparent p-2 opacity-[40%] transition-all duration-200 hover:opacity-100 ${isCopied ? "border-success opacity-100" : "border-foreground opacity-100"}`}
        >
          <div className="w-full">
            {isCopied ? (
              <Check className="text-success w-full" />
            ) : (
              <Copy className="text-foreground w-full" />
            )}
          </div>
        </button>
      </div>
      {children}
    </pre>
  );
};
