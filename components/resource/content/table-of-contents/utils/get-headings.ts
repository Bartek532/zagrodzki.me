import slugify from "slugify";

const HEADING_REGEX = /^(#{1,6})\s*(.+)$/gm;
const CODE_BLOCK_REGEX = /```[\s\S]*?```/g;

export const getHeadings = (source: string) =>
  Array.from(source.replace(CODE_BLOCK_REGEX, "").matchAll(HEADING_REGEX)).map((heading) => ({
    level: heading[1]?.length ?? 0,
    content: heading[2] ?? null,
    id: slugify(heading[2] ?? "", { lower: true }),
  }));
