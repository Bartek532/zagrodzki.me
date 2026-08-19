"use server";

import { z } from "zod";

import { MAX_CORNS_COUNT } from "@/components/common/popcorn/consts";
import { RESOURCE_TYPE } from "@/types";

import { adjustLikesBySlug } from "./likes";

const likesDeltaSchema = z.object({
  type: z.enum([RESOURCE_TYPE.POST, RESOURCE_TYPE.PROJECT]),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i),
  delta: z.number().int().min(-MAX_CORNS_COUNT).max(MAX_CORNS_COUNT),
});

export const adjustLikes = async (type: RESOURCE_TYPE, slug: string, delta: number) => {
  const parsed = likesDeltaSchema.parse({ type, slug, delta });

  if (parsed.delta === 0) {
    return;
  }

  await adjustLikesBySlug(parsed.type, parsed.slug, parsed.delta);
};
