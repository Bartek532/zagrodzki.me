import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import slugify from "slugify";

import { cn } from "@/utils";

import type { HeadingVariant } from "types";

interface HeadingProps {
  readonly children: string;
  readonly level: HeadingVariant;
}

const headingStyles = {
  h1: "text-[2rem] sm:text-[2rem] xl:text-[2.25rem]", // 32/36px
  h2: "text-[1.75rem] sm:text-[1.75rem] xl:text-[2rem]", // 28/32px
  h3: "text-[1.31rem] sm:text-[1.53rem] xl:text-[1.78rem]", // 21/24.5/28.5px
  h4: "text-[1.25rem] sm:text-[1.56rem] xl:text-[1.81rem]", // 20/25/29px
  h5: "text-[1.19rem] sm:text-[1.5rem] xl:text-[1.75rem]", // 19/24/28px
  h6: "text-[1.13rem] sm:text-[1.44rem] xl:text-[1.69rem]", // 18/23/27px
} as const;

export const Heading = memo<HeadingProps>(({ level: Tag, children }) => {
  const id = slugify(children, { lower: true });

  return (
    <Tag id={id} className={cn("relative scroll-m-28", headingStyles[Tag], "group")}>
      <Link
        href={`#${id}`}
        id={id}
        aria-hidden="true"
        tabIndex={-1}
        className="absolute hidden sm:block top-1/2 -translate-y-1/2 -left-8"
      >
        <LinkIcon className="size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-65 hover:opacity-100 focus:opacity-100" />
      </Link>
      {children}
    </Tag>
  );
});

Heading.displayName = "Heading";
