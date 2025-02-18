"use client";
import { InstantSearch } from "react-instantsearch";

import { Section } from "@/components/common/sections/section";
import { Search } from "@/components/ui/search";
import { env } from "@/lib/env";
import { searchClient } from "@/lib/search";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import { Categories } from "./categories";
import { PostsListing } from "./listing/listing";

import type { Category } from "@/types";

interface BlogProps {
  readonly description: string;
  readonly categories: Category[];
}

export const Blog = ({ description, categories }: BlogProps) => (
  <InstantSearch
    indexName={env.NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME}
    searchClient={searchClient}
    insights
    future={{
      preserveSharedStateOnUnmount: true,
    }}
  >
    <Section className={cn("flex flex-col gap-8 py-8", "lg:py-16")}>
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        className="flex flex-col items-center gap-6 px-6"
      >
        <p className="text-center text-sm text-muted-foreground">{description}</p>
      </ViewAnimation>

      <div className="flex flex-col items-center justify-center gap-10">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.2}
          className="flex w-full items-center justify-center px-6 sm:px-8"
        >
          <Search placeholder="Search for a post..." />
        </ViewAnimation>
        <Categories categories={categories} />
      </div>
    </Section>

    <PostsListing />
  </InstantSearch>
);
