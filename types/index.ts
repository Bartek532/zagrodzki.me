import { allAuthors } from "data/authors";
import { allCategories } from "data/categories";

export interface Route {
  label: string;
  path: string;
}

export enum RESOURCE_TYPE {
  POST = "post",
  PROJECT = "project",
}

export interface Project {
  type: RESOURCE_TYPE.PROJECT;
  title: string;
  excerpt: string;
  slug: string;
  url: string;
  timeToRead: number;
  publishedAt: string;
  isPublished: boolean;
  repoUrl: string;
  stack: string[];
  image: string;
  author: Author;
  category: Category;
  priority: number;
}

export interface Post {
  type: RESOURCE_TYPE.POST;
  title: string;
  slug: string;
  excerpt: string;
  timeToRead: number;
  publishedAt: string;
  isPublished: boolean;
  isPopular: boolean;
  category: Category;
  image: string;
  author: Author;
}

export type Resource = Post | Project;

export type Category = typeof allCategories[number]["slug"];
export type Author = typeof allAuthors[number]["name"];

export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
