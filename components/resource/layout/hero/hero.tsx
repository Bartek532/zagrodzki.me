import { GitPullRequestArrow } from "lucide-react";

import { Image } from "@/components/common/image";
import { HeroSection } from "@/components/common/sections/hero";
import { buttonVariants } from "@/components/ui/button";
import { Resource, RESOURCE_TYPE } from "@/types";
import { cn } from "@/utils";
import Fire from "public/svg/fire.svg";

import { Breadcrumbs } from "./breadcrumbs/breadcrumbs";
import { getBreadcrumbs } from "./breadcrumbs/get-breadcrumbs";

type HeroProps = {
  readonly resource: Resource;
};

export const Hero = ({ resource }: HeroProps) => (
  <HeroSection
    title={resource.title}
    caption={
      <Breadcrumbs
        routes={getBreadcrumbs(
          resource.type,
          resource.type === RESOURCE_TYPE.POST ? resource.category : undefined,
        )}
      />
    }
    className="pb-1 sm:pb-6"
  >
    <p className="mx-auto max-w-2xl sm:text-center text-pretty">{resource.excerpt}</p>
    {resource.type === RESOURCE_TYPE.POST ? (
      <div className="flex items-center gap-4 sm:justify-center text-muted-foreground text-sm sm:pb-8">
        <p>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
          }).format(new Date())}
        </p>
        <p>&bull;</p>
        <p>{Math.round(resource.timeToRead)} min read</p>
      </div>
    ) : (
      <div className="flex items-center gap-4 sm:justify-center sm:pb-8">
        <a href={resource.url} target="_blank" className={cn(buttonVariants())}>
          <Fire className="size-4" />
          See live
        </a>
        <a
          href={resource.repository}
          target="_blank"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <GitPullRequestArrow className="size-4" />
          Contribute
        </a>
      </div>
    )}

    <div className="w-full aspect-[120/88] sm:w-auto sm:absolute sm:-left-8 sm:-right-8 sm:bottom-0 overflow-hidden sm:translate-y-full sm:aspect-[2/1] md:aspect-[5/2] xl:aspect-[3/1] z-10">
      <div className="relative w-full h-full">
        <Image
          src={resource.image}
          alt={resource.title}
          fill
          className="object-cover rounded-lg sm:rounded-none"
        />
      </div>
    </div>
    <div className="w-full aspect-[2/1] md:aspect-[5/2] xl:aspect-[3/1] -mt-24 hidden sm:block"></div>
  </HeroSection>
);
