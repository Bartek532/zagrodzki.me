import slugify from "slugify";

const HEADING_REGEX = /mdx\("h([2-6])".*?"([^"]+)"\)/gi;

export const getHeadings = (source: string) =>
  Array.from(source.matchAll(HEADING_REGEX))?.map((heading) => ({
    level: heading?.[1] ?? null,
    content: heading?.[2] ?? null,
    id: slugify(heading?.[2] ?? "", { lower: true }),
  })) ?? [];
