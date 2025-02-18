"use client";

import NextImage, { ImageProps } from "next/image";
import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils";

export const Image = (props: Omit<ImageProps, "onLoad">) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full overflow-hidden">
      <Skeleton className={cn("absolute inset-0", { hidden: isLoaded }, props.className)} />
      <div
        className={cn(
          "transition-opacity duration-250 ease-in-out",
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
