import path from "path";
import {
  getAllResources,
  getResourcesPaths,
  getResourceBySlug,
} from "lib/resource";
import dayjs from "dayjs";
import type { Project } from "types";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export const getAllProjects = () => {
  return getAllResources(PROJECTS_DIR);
};

export const getProjectsPaths = () => {
  return getResourcesPaths(PROJECTS_DIR);
};

export const getProjectBySlug = (slug: string) => {
  return getResourceBySlug(PROJECTS_DIR, slug);
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
