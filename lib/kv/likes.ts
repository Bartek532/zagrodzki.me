"use server";

import { RESOURCE_TYPE } from "types";

import {
  decrementSortedSetValue,
  getSortedSetValue,
  incrementSortedSetValue,
  setSortedSetValue,
} from "./utils";

const SORTED_SET_SUFFIX = "-likes";

export const like = (type: RESOURCE_TYPE, slug: string) =>
  incrementSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug);

export const unlike = (type: RESOURCE_TYPE, slug: string) =>
  decrementSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug);

export const getResourceLikesBySlug = async (type: RESOURCE_TYPE, slug: string) =>
  getSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug);

export const setLikesBySlug = async (type: RESOURCE_TYPE, slug: string, likes: number) =>
  setSortedSetValue(`${type}${SORTED_SET_SUFFIX}`, slug, likes);
