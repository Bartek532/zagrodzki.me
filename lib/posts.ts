import path from "path";
import { getAllResources, getResourcesPaths, getResourceBySlug } from "lib/resource";
import dayjs from "dayjs";
import type { Post } from "types";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export const getAllPosts = () => {
  return getAllResources<Post>(POSTS_DIR);
};

export const getPostsPaths = () => {
  return getResourcesPaths(POSTS_DIR);
};

export const getPostBySlug = (slug: string) => {
  return getResourceBySlug(slug, POSTS_DIR);
};

export const sortPostsByNewest = (posts: Post[]) => {
  return posts.sort((a, b) => {
    const dateA = dayjs(a.publishedAt, "DD-MM-YYYY");
    const dateB = dayjs(b.publishedAt, "DD-MM-YYYY");

    if (dateA.isBefore(dateB)) return 1;
    if (dateA.isAfter(dateB)) return -1;
    return 0;
  });
};

const filterUnpublishedPosts = (posts: Post[]) => posts.filter((post) => post.isPublished);

export const getPublishedPosts = () => {
  const posts = getAllPosts();

  return filterUnpublishedPosts(posts);
};

export const getNewestPosts = () => {
  const publishedPosts = getPublishedPosts();
  const sortedPosts = sortPostsByNewest(publishedPosts);
  return sortedPosts;
};

export const getPostsCategories = () => {
  const posts = getAllPosts();
  const allCategories = posts.map((post) => post.category);
  const uniqueCategories = [...new Set(allCategories)];

  return uniqueCategories;
};

export const getPopularPosts = () => {
  const posts = getAllPosts();
  return posts.filter((post) => post.isPopular);
};
