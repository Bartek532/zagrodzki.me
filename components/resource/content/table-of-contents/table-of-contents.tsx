"use client";

import { memo } from "react";

import { CONTENT_ID } from "@/utils/consts";

import { useRunningHeader } from "./hooks/use-running-header";
import { getHeadings } from "./utils/get-headings";

interface TableOfContentsProps {
  readonly content: string;
}

export const TableOfContents = memo<TableOfContentsProps>(({ content }) => {
  const headings = getHeadings(content);
  const { id } = useRunningHeader(CONTENT_ID);

  return (
    <div>
      <h2 className="mb-5 font-sans font-semibold tracking-widest uppercase">table of contents</h2>
      <nav className="overflow-auto">
        <a
          href="#introduction"
          className={`mt-0 block text-[0.9375rem] opacity-60 transition-opacity duration-200 ease-out hover:opacity-100 ${
            id === "introduction" ? "text-link" : ""
          }`}
        >
          Introduction
        </a>
        {headings.map((heading) => (
          <a
            href={`#${heading.id}`}
            key={heading.content}
            className={`block text-sm opacity-60 transition-opacity duration-200 ease-out hover:opacity-100 ${id === heading.id ? "text-link" : ""} ${heading.level.toString() === "2" ? "mt-[0.6875rem]" : "mt-[0.1875rem]"} ${heading.level.toString() === "3" ? "ml-[0.75rem] text-[0.875rem]" : ""} ${heading.level.toString() === "4" ? "ml-[1.5rem] text-[0.8125rem]" : ""} ${heading.level.toString() === "5" ? "ml-[2.25rem] text-[0.75rem]" : ""} ${heading.level.toString() === "6" ? "ml-[3rem] text-[0.6875rem]" : ""} `}
          >
            {heading.content}
          </a>
        ))}
      </nav>
    </div>
  );
});

TableOfContents.displayName = "TableOfContents";
