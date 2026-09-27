"use client";

import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils";

import type { VariantProps } from "class-variance-authority";

const labelVariants = cva(
  "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = ({
  className,
  ...props
}: React.ComponentProps<"label"> & VariantProps<typeof labelVariants>) => (
  <label className={cn(labelVariants(), className)} {...props} />
);
Label.displayName = "Label";

export { Label };
