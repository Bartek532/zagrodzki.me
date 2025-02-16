import { motion } from "motion/react";
import Image from "next/image";

import { SuperLink } from "@/components/common/link/SuperLink";
import { Badge } from "@/components/ui/badge";
import { Prose } from "@/components/ui/prose";
import { Project } from "@/types";
import { cn } from "@/utils";

type ProjectItemProps = {
  readonly project: Project;
  readonly className?: string;
};

export const ProjectItem = ({ project, className }: ProjectItemProps) => (
  <SuperLink href={`/work/${project.slug}`} key={project.slug}>
    <motion.article
      className={cn(
        "flex flex-col h-full justify-between gap-8 px-6 pt-6 transition-colors bg-background hover:bg-card dark:hover:bg-accent",
        "lg:px-8 lg:pt-8",
        className,
      )}
      layout
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold text-2xl">{project.title}</h2>
          <Badge
            variant="outline"
            className={cn(
              "rounded-full",
              !project.archived && "border-success text-success",
              project.archived && "text-warning border-warning",
            )}
          >
            {project.archived ? "Archived" : "Active"}
          </Badge>
        </div>
        <Prose>
          <p className="leading-normal text-pretty">{project.excerpt}</p>
        </Prose>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-full text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-t-lg border-x border-t">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={cn("object-cover object-top", {
            "grayscale-[70%]": project.archived,
          })}
        />

        {project.archived && (
          <>
            <div className="absolute w-full h-[6%] z-10 -top-[11%] -left-[30%] rotate-[-63deg] border-archive"></div>
            <div className="absolute w-full h-[6%] z-10 bottom-[15%] -left-[30%] rotate-[63deg] border-archive"></div>
          </>
        )}
      </div>
    </motion.article>
  </SuperLink>
);
