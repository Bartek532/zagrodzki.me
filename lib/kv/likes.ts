import "server-only";

import { getSortedSetValue, incrementSortedSetValue } from "./utils";

import type { RESOURCE_TYPE } from "@/types";

const SORTED_SET_SUFFIX = "-likes";

export const getResourceLikesBySlug = async (type: RESOURCE_TYPE, slug: string) =>
  getSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug);

export const adjustLikesBySlug = async (type: RESOURCE_TYPE, slug: string, delta: number) =>
  incrementSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug, delta);
