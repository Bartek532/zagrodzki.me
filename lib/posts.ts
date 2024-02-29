import path from "path";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import {
  getAllResources,
  getResourcesPaths,
  getResourceBySlug,
  getResourceParsedContent,
} from "lib/resource";

import type { Post } from "types";

dayjs.extend(customParseFormat);

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export const getAllPosts = () => getAllResources<Post>(POSTS_DIR);

export const getPostsPaths = () => getResourcesPaths(POSTS_DIR);

export const getPostBySlug = (slug: string) => getResourceBySlug<Post>(slug, POSTS_DIR);

export const getPostParsedContent = (slug: string) => getResourceParsedContent(slug, POSTS_DIR);

export const sortPostsByNewest = (posts: Post[]) =>
  posts.sort((a, b) => {
    const dateA = dayjs(a.modifiedAt, "DD-MM-YYYY");
    const dateB = dayjs(b.modifiedAt, "DD-MM-YYYY");

    if (dateA.isBefore(dateB)) return 1;
    if (dateA.isAfter(dateB)) return -1;

    return 0;
  });

export const getPublishedPosts = () => {
  const posts = getAllPosts();

  return posts.filter((post) => post.published);
};

export const getNewestPosts = () => {
  const publishedPosts = getPublishedPosts();

  return sortPostsByNewest(publishedPosts);
};

export const getPostsCategories = () => {
  const posts = getPublishedPosts();
  const allCategories = posts.map((post) => post.category);

  return [...new Set(allCategories)];
};

export const getPopularPosts = () => {
  const posts = getPublishedPosts();

  return posts.filter((post) => post.popular);
};
