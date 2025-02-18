"use client";

import Image from "next/image";
import { useHits } from "react-instantsearch";

import { Section } from "@/components/common/sections/section";
import { ProjectThumbnail } from "./thumbnail";
import { Project } from "@/types";
import { cn } from "@/utils";
import DisappointedAvatar from "public/img/avatars/disappointed.png";

export const ProjectsListing = () => {
  const { items } = useHits<Project>();

  return (
    <Section className="grid md:grid-cols-2">
      {items.map((project, index) => (
        <ProjectThumbnail
          key={project.slug}
          project={project}
          className={cn(
            index && "border-t",
            index < 2 && "lg:border-t-0",
            index % 2 === 0 && "lg:border-r",
          )}
        />
      ))}
      {items.length % 2 === 1 && <div className="size-full border-t bg-dashed" />}
      {!items.length && (
        <div className="bg-dashed flex items-center justify-center col-span-2">
          <Image src={DisappointedAvatar} alt="disappointed memoji" />
        </div>
      )}
    </Section>
  );
};
