"use client";

import { Search as SearchIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback } from "react";
import { PoweredBy, useSearchBox } from "react-instantsearch";

import { cn } from "@/utils";

import { Input } from "./input";

import type { ChangeEventHandler } from "react";

export const Search = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    const { refine } = useSearchBox();
    const { resolvedTheme } = useTheme();

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (e) => {
        refine(e.currentTarget.value);
      },
      [refine],
    );

    return (
      <div className="relative w-full max-w-sm">
        <Input
          ref={ref}
          className={cn("pl-11", className)}
          aria-autocomplete="list"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={handleChange}
          type="search"
          {...props}
        />
        <SearchIcon className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <PoweredBy
          className="absolute -bottom-1.5 right-1 w-24 translate-y-full opacity-75"
          theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
      </div>
    );
  },
);

Search.displayName = "Search";
