import { headers } from "next/headers";
import "server-only";

import env from "@/env.config";

import { getSortedSetValue, incrementSortedSetValue } from "./utils";

const WINDOW_SECONDS = 60 * 60;
const MAX_REQUESTS_PER_WINDOW = 10;

const getClientKey = async () => {
  const headerList = await headers();
  return headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
};

export const assertRateLimit = async (scope: string) => {
  const clientKey = await getClientKey();
  const bucket = `rate-limit:${scope}:${clientKey}`;

  await incrementSortedSetValue(bucket, "hits");
  const hits = await getSortedSetValue(bucket, "hits");

  if (hits === 1) {
    await fetch(`${env.KV_REST_API_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.KV_REST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([["EXPIRE", bucket, WINDOW_SECONDS]]),
    });
  }

  if (hits > MAX_REQUESTS_PER_WINDOW) {
    throw new Error("Too many requests. Please try again later.");
  }
};
