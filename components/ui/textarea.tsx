import * as React from "react";

import { cn } from "@/utils";

const Textarea = ({ className, ...props }: React.ComponentProps<"textarea">) => (
  <textarea
    className={cn(
      "bg-card border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border px-4 py-2.5 text-base focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className,
    )}
    {...props}
  />
);
Textarea.displayName = "Textarea";

export { Textarea };
