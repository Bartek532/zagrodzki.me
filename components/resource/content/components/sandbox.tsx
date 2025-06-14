"use client";

import { useTheme } from "next-themes";
import { memo } from "react";

interface SandboxProps {
  readonly id: string;
}

export const Sandbox = memo<SandboxProps>(({ id }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="-mx-1 my-8 flex aspect-5/4 sm:-mx-3">
      <iframe
        src={`https://codesandbox.io/embed/${id}?fontsize=14&codemirror=1&theme=${resolvedTheme}`}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        className="h-full w-full border-0 md:rounded-xl"
      />
    </div>
  );
});

Sandbox.displayName = "Sandbox";
