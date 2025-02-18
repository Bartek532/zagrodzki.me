"use client";

import { memo, useRef, useState, useEffect } from "react";
import { copyToClipboard } from "utils/clipboard";
import { onPromise } from "utils/functions";
import { Check, Copy } from "lucide-react";

interface PreProps {
  readonly children: React.ReactNode;
}

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
    <pre {...props} ref={preRef} className="relative group">
      <div
        className={`absolute top-3 right-3 z-10 transition-opacity duration-200
          ${isCopied ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <button
          onClick={onPromise(handleCopy)}
          aria-label="copy code to clipboard"
          className={`flex items-center justify-center size-9 p-2 border rounded-md 
            transition-all duration-200 cursor-pointer bg-transparent opacity-40 hover:opacity-100
            ${isCopied ? "border-success opacity-100" : "border-foreground opacity-100"}`}
        >
          <div className="w-full">
            {isCopied ? (
              <Check className="w-full text-success" />
            ) : (
              <Copy className="w-full text-foreground" />
            )}
          </div>
        </button>
      </div>
      {children}
    </pre>
  );
});

Pre.displayName = "Pre";
