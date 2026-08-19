"use server";

import { z } from "zod";

import { RESOURCE_TYPE } from "@/types";

import { getSortedSetValue, incrementSortedSetValue } from "./utils";

const SORTED_SET_SUFFIX = "-likes";

const likeInputSchema = z.object({
  type: z.enum([RESOURCE_TYPE.POST, RESOURCE_TYPE.PROJECT]),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i),
});

export const like = async (type: RESOURCE_TYPE, slug: string) => {
  const parsed = likeInputSchema.parse({ type, slug });
  await incrementSortedSetValue(`${parsed.type}${SORTED_SET_SUFFIX}`, parsed.slug);
};

export const unlike = async (type: RESOURCE_TYPE, slug: string) => {
  const parsed = likeInputSchema.parse({ type, slug });
  await incrementSortedSetValue(`${parsed.type}${SORTED_SET_SUFFIX}`, parsed.slug, -1);
};

export const getResourceLikesBySlug = async (type: RESOURCE_TYPE, slug: string) =>
  getSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug);
