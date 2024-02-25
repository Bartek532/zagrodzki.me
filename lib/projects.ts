import path from "path";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import {
  getAllResources,
  getResourcesPaths,
  getResourceBySlug,
  getResourceParsedContent,
} from "lib/resource";

import type { Project } from "types";

dayjs.extend(customParseFormat);

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export const getAllProjects = () => getAllResources<Project>(PROJECTS_DIR);

export const getProjectsPaths = () => getResourcesPaths(PROJECTS_DIR);

export const getProjectBySlug = (slug: string) => getResourceBySlug<Project>(slug, PROJECTS_DIR);

export const getProjectParsedContent = (slug: string) =>
  getResourceParsedContent(slug, PROJECTS_DIR);

export const sortProjectsByNewest = (projects: Project[]) =>
  projects.sort((a, b) => {
    const dateA = dayjs(a.modifiedAt, "DD-MM-YYYY");
    const dateB = dayjs(b.modifiedAt, "DD-MM-YYYY");

    if (dateA.isBefore(dateB)) return 1;
    if (dateA.isAfter(dateB)) return -1;

    return 0;
  });

export const sortProjectsByPriority = (projects: Project[]) =>
  projects.sort((a, b) => {
    if (a.priority > b.priority) return 1;
    if (a.priority < b.priority) return -1;

    return 0;
  });

export const getBestProjects = () => {
  const projects = getAllProjects();

  return sortProjectsByPriority(projects);
};
