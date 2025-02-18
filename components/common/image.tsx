"use client";

import NextImage from "next/image";
import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils";

import type { ImageProps } from "next/image";

export const Image = (props: Omit<ImageProps, "onLoad">) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full overflow-hidden">
      <Skeleton className={cn("absolute inset-0", { hidden: isLoaded }, props.className)} />
      <div
        className={cn(
          "duration-250 transition-opacity ease-in-out",
          isLoaded ? "opacity-100" : "opacity-0",
          props.className,
        )}
        data-loaded={isLoaded}
      >
        <NextImage {...props} onLoad={() => setIsLoaded(true)} />
      </div>
    </div>
  );
};
