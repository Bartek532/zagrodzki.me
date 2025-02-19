"use server";

import {
  decrementSortedSetValue,
  getSortedSetValue,
  incrementSortedSetValue,
  setSortedSetValue,
} from "./utils";

import type { RESOURCE_TYPE } from "@/types";

const SORTED_SET_SUFFIX = "-likes";

export const like = async (type: RESOURCE_TYPE, slug: string) =>
  incrementSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug);

export const unlike = async (type: RESOURCE_TYPE, slug: string) =>
  decrementSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug);

export const getResourceLikesBySlug = async (type: RESOURCE_TYPE, slug: string) =>
  getSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug);

export const setLikesBySlug = async (type: RESOURCE_TYPE, slug: string, likes: number) =>
  setSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug, likes);
