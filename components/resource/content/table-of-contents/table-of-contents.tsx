"use client";

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { memo } from "react";

import { CONTENT_ID } from "utils/consts";

import { useRunningHeader } from "./hooks/use-running-header";
import { getHeadings } from "./utils/get-headings";

interface TableOfContentsProps {
  readonly content: MDXRemoteSerializeResult;
}

export const TableOfContents = memo<TableOfContentsProps>(({ content }) => {
  const headings = getHeadings(content.compiledSource);
  const { id } = useRunningHeader(CONTENT_ID);

  return (
    <div>
      <h2 className="uppercase font-sans font-semibold tracking-widest mb-5">table of contents</h2>
      <nav className="overflow-auto">
        <a
          href="#introduction"
          className={`block text-[0.9375rem] transition-opacity duration-200 ease-out opacity-60 hover:opacity-100 mt-0 ${
            id === "introduction" ? "text-link" : ""
          }`}
        >
          Introduction
        </a>
        {headings
          ? headings.map((heading) => (
              <a
                href={`#${heading.id}`}
                key={heading.content}
                className={`
                  block text-sm transition-opacity duration-200 ease-out opacity-60 hover:opacity-100
                  ${id === heading.id ? "text-link" : ""}
                  ${heading.level?.toString() === "2" ? "mt-[0.6875rem]" : "mt-[0.1875rem]"}
                  ${heading.level?.toString() === "3" ? "ml-[0.75rem] text-[0.875rem]" : ""}
                  ${heading.level?.toString() === "4" ? "ml-[1.5rem] text-[0.8125rem]" : ""}
                  ${heading.level?.toString() === "5" ? "ml-[2.25rem] text-[0.75rem]" : ""}
                  ${heading.level?.toString() === "6" ? "ml-[3rem] text-[0.6875rem]" : ""}
                `}
              >
                {heading.content}
              </a>
            ))
          : null}
      </nav>
    </div>
  );
});

TableOfContents.displayName = "TableOfContents";
