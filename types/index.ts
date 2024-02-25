import { allAuthors } from "data/authors";
import { allCategories } from "data/categories";

export enum RESOURCE_TYPE {
  POST = "post",
  PROJECT = "project",
}

type Common = {
  title: string;
  excerpt: string;
  slug: string;
  timeToRead: number;
  publishedAt: string;
  modifiedAt: string;
  isPublished: boolean;
  category: Category;
  image: string;
  author: Author;
};

export type Project = Common & {
  type: RESOURCE_TYPE.PROJECT;
  url: string;
  repoUrl: string;
  stack: string[];
  priority: number;
};

export type Post = Common & {
  type: RESOURCE_TYPE.POST;
  isPopular: boolean;
};

export type Resource = Post | Project;

export type Category = typeof allCategories[number]["slug"];
export type Author = typeof allAuthors[number]["name"];

export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export interface MetadataParams {
  params: { slug: string };
}
