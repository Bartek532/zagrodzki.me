import { cn } from "@/utils";

import type { ComponentProps } from "react";

type ProseProps = ComponentProps<"div">;

export const Prose = ({ className, ...props }: ProseProps) => (
  <div
    className={cn(
      "prose prose-neutral dark:prose-invert prose-img:my-0 prose-headings:tracking-tight prose-figure:my-8 prose-a:no-underline prose-video:my-0",
      className,
    )}
    {...props}
  />
);
