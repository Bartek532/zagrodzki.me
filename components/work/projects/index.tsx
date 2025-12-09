"use client";
import { InstantSearch } from "react-instantsearch";

import { Section } from "@/components/common/sections/section";
import { Search } from "@/components/ui/search";
import env from "@/env.config";
import { searchClient } from "@/lib/search";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import { ArchiveCheckbox } from "./archive/checkbox";
import { ProjectsListing } from "./listing/listing";

export const Projects = () => (
  <InstantSearch
    indexName={env.NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME}
    searchClient={searchClient}
    insights
    future={{
      preserveSharedStateOnUnmount: true,
    }}
  >
    <Section className={cn("flex flex-col gap-8 py-8 pb-12", "lg:py-16 lg:pb-18")}>
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        className="flex flex-col items-center gap-6 px-6"
      >
        <p className="text-muted-foreground text-center text-sm">
          Explore my portfolio of projects, trusted by thousands of people worldwide
        </p>

        <div className="flex w-full items-center justify-center gap-3">
          <Search placeholder="Search for a project..." />
          <ArchiveCheckbox />
        </div>
      </ViewAnimation>
    </Section>

    <ProjectsListing />
  </InstantSearch>
);
