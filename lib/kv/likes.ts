"use server";

import { z } from "zod";

import { MAX_CORNS_COUNT } from "@/components/common/popcorn/consts";
import { RESOURCE_TYPE } from "@/types";

import { getSortedSetValue, incrementSortedSetValue } from "./utils";

const SORTED_SET_SUFFIX = "-likes";

const likeInputSchema = z.object({
  type: z.enum([RESOURCE_TYPE.POST, RESOURCE_TYPE.PROJECT]),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i),
  amount: z.number().int().min(-MAX_CORNS_COUNT).max(MAX_CORNS_COUNT),
});

export const like = async (type: RESOURCE_TYPE, slug: string, amount = 1) => {
  const parsed = likeInputSchema.parse({ type, slug, amount });

  if (parsed.amount === 0) {
    return;
  }

  await incrementSortedSetValue(`${parsed.type}${SORTED_SET_SUFFIX}`, parsed.slug, parsed.amount);
};

export const getResourceLikesBySlug = async (type: RESOURCE_TYPE, slug: string) =>
  getSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug);
