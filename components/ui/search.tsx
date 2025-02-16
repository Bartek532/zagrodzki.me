"use client";

import React, { ChangeEventHandler, useCallback } from "react";
import { PoweredBy, useSearchBox } from "react-instantsearch";

import { cn } from "@/utils";
import SearchIcon from "public/svg/search.svg";

import { Input } from "./input";

export const Search = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    const { refine } = useSearchBox();

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
          className={cn(" pl-12", className)}
          aria-autocomplete="list"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={handleChange}
          type="search"
          {...props}
        />
        <SearchIcon className="absolute left-4 top-1/2 text-muted-foreground -translate-y-1/2" />
        <PoweredBy className="w-24 absolute opacity-75 right-1 -bottom-1.5 translate-y-full" />
      </div>
    );
  },
);

Search.displayName = "Search";
