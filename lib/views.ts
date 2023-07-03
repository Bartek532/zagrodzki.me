import { kv } from "@vercel/kv";
import "server-only";

import { RESOURCE_TYPE } from "types";

export const getResourceTotalViews = async (type: RESOURCE_TYPE) => {
  const data = await kv.zrange(type, 0, -1, { withScores: true });
  const views = data.filter((_, index) => index % 2) as number[];

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

export const getResourceViews = async (type: RESOURCE_TYPE) => {
  try {
    const data = await kv.zrange(type, 0, -1, { withScores: true });
    return data;
  } catch {
    return [];
  }
};

export const getResourceViewsBySlug = async (type: RESOURCE_TYPE, slug: string) => {
  try {
    const views = await kv.zscore(type, slug);

    if (views) {
      return views;
    }

    return 0;
  } catch {
    return 0;
  }
};

export const view = async (type: RESOURCE_TYPE, slug: string) => {
  try {
    await kv.zincrby(type, 1, slug);
  } catch (e) {
    console.log(e);
  }
};
