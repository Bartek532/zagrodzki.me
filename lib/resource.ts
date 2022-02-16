import path from "path";
import fs from "fs";

import matter from "gray-matter";
import readingTime from "reading-time";
import { serialize } from "next-mdx-remote/serialize";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import { commonRehypePlugins } from "utils/markdown";
import type { Project, Post } from "types";

const MDX_REGEX = /\.mdx$/;

type Resource = Project | Post;

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
  const allResources = filenames.map((filename) => {
    return getResourceFrontmatter<T>(filename, resourcePath);
  });

  return allResources;
};

export const getResourceParsedContent = async (slug: string, resourcePath: string) => {
  const filePath = path.join(resourcePath, `${slug}.mdx`);
  const source = fs.readFileSync(filePath);
  const { content } = matter(source);

  const compiledContent = await unified().use(rehypeStringify).use(remarkRehype).use(remarkParse).process(content);

  return { compiledContent };
};

export const getResourceBySlug = async (slug: string, resourcePath: string) => {
  const filePath = path.join(resourcePath, `${slug}.mdx`);
  const source = fs.readFileSync(filePath);
  const { content, data } = matter(source);
  const timeToRead = readingTime(content).minutes;
  const frontmatter = { ...data, timeToRead } as Omit<Resource, "slug">;
  const transformedMdx = await serialize(content, {
    scope: data,
    mdxOptions: { rehypePlugins: commonRehypePlugins },
  });

  return { transformedMdx, frontmatter };
};

const getResourcesSlugs = (resourcePath: string) => {
  return fs.readdirSync(resourcePath).filter((path) => MDX_REGEX.test(path));
};

export const getResourcesPaths = (resourcePath: string) => {
  const slugs = getResourcesSlugs(resourcePath);
  const paths = slugs.map((slug) => slug.replace(MDX_REGEX, "")).map((slug) => ({ params: { slug } }));

  return paths;
};
