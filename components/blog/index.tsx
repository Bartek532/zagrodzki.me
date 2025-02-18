"use client";
import { InstantSearch } from "react-instantsearch";

import { Section } from "@/components/common/sections/section";
import { Search } from "@/components/ui/search";
import { env } from "@/env/client";
import { searchClient } from "@/lib/search";
import { ViewAnimation } from "@/providers/view-animation";
import { Category } from "@/types";
import { cn } from "@/utils";

import { Categories } from "./categories";
import { PostsListing } from "./listing/listing";

type BlogProps = {
  readonly description: string;
  readonly categories: Category[];
  readonly activeCategory?: Category;
};

export const Blog = ({ description, categories, activeCategory }: BlogProps) => (
  <InstantSearch
    indexName={env.NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME}
    searchClient={searchClient}
    insights
  >
    <Section className={cn("flex flex-col gap-8 py-8", "lg:py-16")}>
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        className="px-6 gap-6 flex flex-col items-center"
      >
        <p className="text-center text-muted-foreground text-sm">{description}</p>

        <div className="flex flex-col gap-10 items-center justify-center">
          <Search placeholder="Search for a post..." />
          <Categories categories={categories} {...(activeCategory && { activeCategory })} />
        </div>
      </ViewAnimation>
    </Section>

    <PostsListing />
  </InstantSearch>
);
