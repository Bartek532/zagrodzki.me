import { motion } from "motion/react";

import { Image } from "@/components/common/image";
import { SuperLink } from "@/components/common/link/super-link";
import { Badge } from "@/components/ui/badge";
import { Prose } from "@/components/ui/prose";
import { cn } from "@/utils";

import type { Project } from "@/types";

interface ProjectThumbnailProps {
  readonly project: Project;
  readonly className?: string;
}

export const ProjectThumbnail = ({ project, className }: ProjectThumbnailProps) => (
  <SuperLink href={`/work/${project.slug}`} key={project.slug}>
    <motion.article
      className={cn(
        "flex h-full flex-col justify-between gap-8 bg-background px-6 pt-6 transition-colors hover:bg-card dark:hover:bg-accent",
        "lg:px-8 lg:pt-8",
        className,
      )}
      layout
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <Badge
            variant="outline"
            className={cn(
              "rounded-full",
              !project.archived && "border-success text-success",
              project.archived && "border-warning text-warning",
            )}
          >
            {project.archived ? "Archived" : "Active"}
          </Badge>
        </div>
        <Prose>
          <p className="text-pretty leading-normal">{project.excerpt}</p>
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
          className={cn("h-full object-cover object-top", {
            "grayscale-[70%]": project.archived,
          })}
        />

        {project.archived && (
          <>
            <div className="border-archive absolute -left-[30%] -top-[11%] z-10 h-[6%] w-full rotate-[-63deg]"></div>
            <div className="border-archive absolute -left-[30%] bottom-[15%] z-10 h-[6%] w-full rotate-[63deg]"></div>
          </>
        )}
      </div>
    </motion.article>
  </SuperLink>
);
