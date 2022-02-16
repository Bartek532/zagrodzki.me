import path from "path";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { getAllResources, getResourcesPaths, getResourceBySlug, getResourceParsedContent } from "lib/resource";
import type { Project } from "types";

dayjs.extend(customParseFormat);

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export const getAllProjects = () => {
  return getAllResources<Project>(PROJECTS_DIR);
};

export const getProjectsPaths = () => {
  return getResourcesPaths(PROJECTS_DIR);
};

export const getProjectBySlug = (slug: string) => {
  return getResourceBySlug(slug, PROJECTS_DIR);
};

export const getProjectParsedContent = (slug: string) => {
  return getResourceParsedContent(slug, PROJECTS_DIR);
};

export const sortProjectsByNewest = (projects: Project[]) => {
  return projects.sort((a, b) => {
    const dateA = dayjs(a.publishedAt, "DD-MM-YYYY");
    const dateB = dayjs(b.publishedAt, "DD-MM-YYYY");

    if (dateA.isBefore(dateB)) return 1;
    if (dateA.isAfter(dateB)) return -1;

    return 0;
  });
};

export const getNewestProjects = () => {
  const projects = getAllProjects();
  const sortedProjects = sortProjectsByNewest(projects);

  return sortedProjects;
};
