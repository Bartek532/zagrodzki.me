"use client";
import { InstantSearch } from "react-instantsearch";

import { Section } from "@/components/common/sections/section";
import { Search } from "@/components/ui/search";
import { searchClient } from "@/lib/search";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import { ArchiveCheckbox } from "./archive/checkbox";
import { ProjectsList } from "./list/list";

export const Projects = () => (
  <InstantSearch indexName="projects" searchClient={searchClient} insights>
    <Section className={cn("flex flex-col gap-8 py-8 pb-12", "lg:py-16 lg:pb-18")}>
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        className="px-6 gap-6 flex flex-col items-center"
      >
        <p className="text-center text-muted-foreground text-sm">
          Explore my portfolio of projects, trusted by thousands of people worldwide
        </p>

        <div className="flex w-full justify-center gap-3 items-center">
          <Search placeholder="Search for a project..." />
          <ArchiveCheckbox />
        </div>
      </ViewAnimation>
    </Section>

    <ProjectsList />
  </InstantSearch>
);
