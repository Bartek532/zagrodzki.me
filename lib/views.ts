import "server-only";
import { z } from "zod";

import { env } from "env/server";
import { RESOURCE_TYPE } from "types";

const resultSchema = z
  .array(
    z.object({
      result: z.string().or(z.array(z.string())),
    }),
  )
  .nonempty();

const isValidKvResult = (data: unknown): data is z.infer<typeof resultSchema> =>
  resultSchema.safeParse(data).success;

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

export const getResourceViews = async (type: RESOURCE_TYPE) => {
  try {
    const response = await fetch(`${env.KV_REST_API_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.KV_REST_API_TOKEN}`,
      },
      body: `[["ZRANGE", "${type}", 0, -1, "WITHSCORES"]]`,
      next: {
        revalidate: 60,
      },
    });

    const data: unknown = await response.json();

    if (!isValidKvResult(data)) {
      return [];
    }

    return data[0].result;
  } catch {
    return [];
  }
};

export const getResourceViewsBySlug = async (type: RESOURCE_TYPE, slug: string) => {
  try {
    const response = await fetch(`${env.KV_REST_API_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.KV_REST_API_TOKEN}`,
      },
      body: `[["ZSCORE", "${type}", "${slug}"]]`,
      next: {
        revalidate: 60,
      },
    });

    const data: unknown = await response.json();

    if (!isValidKvResult(data)) {
      return 0;
    }

    return Number(data[0].result);
  } catch {
    return 0;
  }
};

export const view = (type: RESOURCE_TYPE, slug: string) =>
  fetch(`${env.KV_REST_API_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.KV_REST_API_TOKEN}`,
    },
    body: `[["ZINCRBY", "${type}", 1, "${slug}"]]`,
  });
