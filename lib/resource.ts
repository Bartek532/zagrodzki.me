import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import type { Project, Post } from "@/types";

const MDX_REGEX = /\.mdx$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;

type Resource = Project | Post;

const resolveResourceFile = (slug: string, resourcePath: string) => {
  if (!SLUG_PATTERN.test(slug) || slug.length > 200) {
    throw new Error("Invalid resource slug");
  }

  const basePath = path.resolve(resourcePath);
  const filePath = path.resolve(basePath, `${slug}.mdx`);

  if (!filePath.startsWith(`${basePath}${path.sep}`)) {
    throw new Error("Invalid resource slug");
  }

  return filePath;
};

const getResourceFrontmatter = <T extends Resource>(filename: string, resourcePath: string) => {
  const fullPath = path.join(resourcePath, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const slug = filename.replace(MDX_REGEX, "");
  const { content, data } = matter(fileContents);
  const timeToRead = readingTime(content).minutes;

  return { ...data, slug, timeToRead } as T;
};

export const getAllResources = <T extends Resource>(resourcePath: string) => {
  const filenames = fs.readdirSync(resourcePath);
  const allResources = filenames.map((filename) =>
    getResourceFrontmatter<T>(filename, resourcePath),
  );

  return allResources;
};

export const getResourceParsedContent = async (slug: string, resourcePath: string) => {
  const filePath = resolveResourceFile(slug, resourcePath);
  const source = fs.readFileSync(filePath);
  const { content } = matter(source);

  const compiledContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  return { compiledContent };
};

export const getResourceBySlug = <T extends Resource>(slug: string, resourcePath: string) => {
  const filePath = resolveResourceFile(slug, resourcePath);
  const source = fs.readFileSync(filePath);
  const { content, data } = matter(source);
  const timeToRead = readingTime(content).minutes;
  const frontmatter = { ...data, slug, timeToRead } as T;

  return { content, frontmatter };
};

const getResourcesSlugs = (resourcePath: string) =>
  fs.readdirSync(resourcePath).filter((path) => path.endsWith(".mdx"));

export const getResourcesPaths = (resourcePath: string) => {
  const slugs = getResourcesSlugs(resourcePath);
  return slugs.map((slug) => slug.replace(MDX_REGEX, ""));
};
