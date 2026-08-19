"use client";

import { useTheme } from "next-themes";
import { memo } from "react";

interface SandboxProps {
  readonly id: string;
}

const SANDBOX_ID_PATTERN = /^[a-z0-9_-]+$/i;

export const Sandbox = memo<SandboxProps>(({ id }) => {
  const { resolvedTheme } = useTheme();

  if (!SANDBOX_ID_PATTERN.test(id)) {
    return null;
  }

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div className="-mx-1 my-8 flex aspect-5/4 sm:-mx-3">
      <iframe
        src={`https://codesandbox.io/embed/${encodeURIComponent(id)}?fontsize=14&codemirror=1&theme=${theme}`}
        title="CodeSandbox embed"
        allow="encrypted-media"
        sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"
        className="h-full w-full border-0 md:rounded-xl"
      />
    </div>
  );
});

Sandbox.displayName = "Sandbox";
