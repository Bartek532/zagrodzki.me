import * as React from "react";

import { cn } from "@/utils";

const Input = ({ className, type, ...props }: React.ComponentProps<"input">) => (
  <input
    type={type}
    className={cn(
      "border-input bg-card file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-lg border px-4 py-2.5 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className,
    )}
    {...props}
  />
);
Input.displayName = "Input";

export { Input };
