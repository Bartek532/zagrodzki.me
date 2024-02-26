import "server-only";
import { z } from "zod";

import { env } from "env/server";

const resultSchema = z
  .array(
    z.object({
      result: z.string().or(z.array(z.string())),
    }),
  )
  .nonempty();

const isValidKvResult = (data: unknown): data is z.infer<typeof resultSchema> =>
  resultSchema.safeParse(data).success;

export const getSortedSetValues = async (name: string) => {
  try {
    const response = await fetch(`${env.KV_REST_API_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.KV_REST_API_TOKEN}`,
      },
      body: `[["ZRANGE", "${name}", 0, -1, "WITHSCORES"]]`,
      next: {
        revalidate: 60,
        tags: [name],
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

export const getSortedSetValue = async (name: string, key: string) => {
  try {
    const response = await fetch(`${env.KV_REST_API_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.KV_REST_API_TOKEN}`,
      },
      body: `[["ZSCORE", "${name}", "${key}"]]`,
      next: {
        revalidate: 60,
        tags: [`${name}-${key}`],
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

export const incrementSortedSetValue = async (name: string, key: string) => {
  await fetch(`${env.KV_REST_API_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.KV_REST_API_TOKEN}`,
    },
    body: `[["ZINCRBY", "${name}", 1, "${key}"]]`,
  });
};

export const decrementSortedSetValue = async (name: string, key: string) => {
  await fetch(`${env.KV_REST_API_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.KV_REST_API_TOKEN}`,
    },
    body: `[["ZINCRBY", "${name}", -1, "${key}"]]`,
  });
};
