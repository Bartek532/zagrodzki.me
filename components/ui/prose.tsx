import { cn } from "@/utils";

import type { ComponentProps } from "react";

type ProseProps = ComponentProps<"div">;

export const Prose = ({ className, ...props }: ProseProps) => (
  <div className={cn("prose prose-neutral dark:prose-invert", className)} {...props} />
);
