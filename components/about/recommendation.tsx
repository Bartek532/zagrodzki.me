import Image from "next/image";

import { StickyList } from "@/components/common/sections/sticky-list";
import { Prose } from "@/components/ui/prose";
import { allRecommendations } from "@/data/recommendations";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

export const Recommendations = () => (
  <StickyList
    title="What people say"
    description="I've been fortunate to work with some amazing people over the years. Here's what they have to say about me."
  >
    <div className="grid divide-y lg:grid-cols-2">
      {allRecommendations.map((recommendation, index, array) => (
        <div
          key={recommendation.author.name}
          className={cn(
            recommendation.size === "large" ? "sm:col-span-2" : "sm:col-span-1",
            recommendation.size === "small" &&
              array.at(index - 1)?.size === "small" &&
              "lg:border-l",
          )}
        >
          <ViewAnimation
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            delay={index % 2 ? 0.2 : 0}
            key={recommendation.author.name}
            className={cn(
              "flex w-full flex-col items-start gap-4 p-6 transition-colors hover:bg-card dark:hover:bg-accent lg:gap-6",
              "sm:flex-row sm:p-8",
            )}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full">
              <Image
                src={recommendation.author.image}
                width={64}
                height={64}
                alt={recommendation.author.name}
                className="block size-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <a href={recommendation.author.link} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-lg font-semibold leading-normal tracking-tight">
                    {recommendation.author.name}
                  </h3>
                </a>
                <p className="text-sm text-muted-foreground">{recommendation.author.position}</p>
              </div>
              <Prose className="prose-sm max-w-3xl">
                <p>{recommendation.content}</p>
              </Prose>
            </div>
          </ViewAnimation>
        </div>
      ))}
    </div>
  </StickyList>
);
