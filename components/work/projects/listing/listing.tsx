"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useHits, useInstantSearch } from "react-instantsearch";

import { Section } from "@/components/common/sections/section";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import DisappointedAvatar from "../../../../public/img/avatars/disappointed.png";

import { ProjectThumbnail } from "./thumbnail";

import type { Project } from "@/types";

export const ProjectsListing = () => {
  const { status } = useInstantSearch();
  const { items } = useHits<Project>();

  return (
    <Section className="grid md:grid-cols-2">
      {items.map((project, index) => (
        <ViewAnimation
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          delay={index % 2 ? 0.2 : 0}
          key={project.slug}
        >
          <ProjectThumbnail
            project={project}
            className={cn(
              index && "border-t",
              index < 2 && "lg:border-t-0",
              index % 2 === 0 && "lg:border-r",
            )}
          />
        </ViewAnimation>
      ))}
      {items.length % 2 === 1 && <div className="bg-dashed size-full border-t" />}
      {!items.length ? (
        status === "loading" ? (
          <div className="bg-dashed col-span-2 flex items-center justify-center py-16 sm:py-24 lg:py-32">
            <Loader2 className="text-primary size-10 animate-spin" />
          </div>
        ) : (
          <div className="bg-dashed col-span-2 flex items-center justify-center">
            <Image src={DisappointedAvatar} alt="disappointed memoji" />
          </div>
        )
      ) : null}
    </Section>
  );
};
