"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";

import { env } from "@/env/client";

export const searchClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
);
