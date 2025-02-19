import { GitPullRequestArrow } from "lucide-react";

import { Image } from "@/components/common/image";
import { HeroSection } from "@/components/common/sections/hero";
import { buttonVariants } from "@/components/ui/button";
import { RESOURCE_TYPE } from "@/types";
import { cn, formatDate } from "@/utils";

import Fire from "../../../../public/svg/fire.svg";

import { Breadcrumbs } from "./breadcrumbs/breadcrumbs";
import { getBreadcrumbs } from "./breadcrumbs/get-breadcrumbs";

import type { Resource } from "@/types";

interface HeroProps {
  readonly resource: Resource;
}

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
    <p className="mx-auto max-w-2xl text-pretty sm:text-center">{resource.excerpt}</p>
    {resource.type === RESOURCE_TYPE.POST ? (
      <div className="text-muted-foreground flex items-center gap-4 text-sm sm:justify-center sm:pb-8">
        <p>{formatDate(resource.modifiedAt)}</p>
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

    <div className="z-10 aspect-120/88 w-full overflow-hidden sm:absolute sm:-right-8 sm:bottom-0 sm:-left-8 sm:aspect-2/1 sm:w-auto sm:translate-y-full md:aspect-5/2 xl:aspect-3/1">
      <div className="relative h-full w-full">
        <Image
          src={resource.image}
          alt={resource.title}
          fill
          className="rounded-lg object-cover sm:rounded-none"
        />
      </div>
    </div>
    <div className="-mt-24 hidden aspect-2/1 w-full sm:block md:aspect-5/2 xl:aspect-3/1"></div>
  </HeroSection>
);
