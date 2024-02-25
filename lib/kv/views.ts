import "server-only";

import { RESOURCE_TYPE } from "types";

import { getSortedSetValue, getSortedSetValues, incrementSortedSetValue } from "./utils";

export const getResourceTotalViews = async (type: RESOURCE_TYPE) => {
  const data = await getResourceViews(type);
  if (!Array.isArray(data)) return 0;

  const views = data.filter((_, index) => index % 2).map((view) => Number(view));

  const total = views.reduce((acc, curr) => acc + Number(curr), 0);

  return total;
};

export const getAllResourcesTotalViews = async () => {
  try {
    const postsViews = await getResourceTotalViews(RESOURCE_TYPE.POST);
    const projectsViews = await getResourceTotalViews(RESOURCE_TYPE.PROJECT);

    return postsViews + projectsViews;
  } catch {
    return 0;
  }
};

export const getResourceViews = async (type: RESOURCE_TYPE) => getSortedSetValues(type);

export const getResourceViewsBySlug = async (type: RESOURCE_TYPE, slug: string) =>
  getSortedSetValue(type, slug);

export const view = (type: RESOURCE_TYPE, slug: string) => incrementSortedSetValue(type, slug);
