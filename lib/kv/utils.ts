import "server-only";
import { z } from "zod";

import env from "@/env.config";

const resultSchema = z
  .array(
    z.object({
      result: z.string().or(z.array(z.string())),
    }),
  )
  .nonempty();

const isValidKvResult = (data: unknown): data is z.infer<typeof resultSchema> =>
  resultSchema.safeParse(data).success;

const KV_TOKEN_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;

const assertSafeKvToken = (value: string, label: string) => {
  if (!KV_TOKEN_PATTERN.test(value) || value.length > 200) {
    throw new Error(`Invalid KV ${label}`);
  }
};

const runPipeline = async (command: (string | number)[]) =>
  fetch(`${env.KV_REST_API_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.KV_REST_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command]),
  });

export const getSortedSetValues = async (name: string) => {
  assertSafeKvToken(name, "key");

  try {
    const response = await fetch(`${env.KV_REST_API_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.KV_REST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([["ZRANGE", name, 0, -1, "WITHSCORES"]]),
      next: {
        revalidate: 60,
        tags: [name],
      },
    });

    const data: unknown = await response.json();

    if (!isValidKvResult(data)) {
      return [];
    }

    return data[0]?.result;
  } catch {
    return [];
  }
};

export const getSortedSetValue = async (name: string, key: string) => {
  assertSafeKvToken(name, "key");
  assertSafeKvToken(key, "member");

  try {
    const response = await fetch(`${env.KV_REST_API_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.KV_REST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([["ZSCORE", name, key]]),
      next: {
        revalidate: 60,
        tags: [`${name}-${key}`],
      },
    });

    const data: unknown = await response.json();

    if (!isValidKvResult(data)) {
      return 0;
    }

    return Number(data[0]?.result);
  } catch {
    return 0;
  }
};

export const incrementSortedSetValue = async (name: string, key: string, amount = 1) => {
  assertSafeKvToken(name, "key");
  assertSafeKvToken(key, "member");

  if (!Number.isInteger(amount) || !Number.isSafeInteger(amount)) {
    throw new Error("Invalid KV increment");
  }

  await runPipeline(["ZINCRBY", name, amount, key]);
};
