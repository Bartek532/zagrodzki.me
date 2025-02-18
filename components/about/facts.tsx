import Image from "next/image";

import { StickyList } from "@/components/common/sections/sticky-list";
import { Prose } from "@/components/ui/prose";
import { allFacts } from "@/data/facts";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

export const Facts = () => (
  <StickyList title="Fun facts" description="Some unique things about me ✨ Did you know that I...">
    <div className="grid grid-cols-1 sm:grid-cols-3">
      {allFacts.map((fact, index, array) => (
        <ViewAnimation
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          delay={index * 0.2}
          className={cn(index < array.length - 1 ? "sm:border-r border-b sm:border-b-0" : "")}
          key={fact.icon}
        >
          <div
            className={cn(
              "flex flex-col items-start justify-between h-full gap-6 lg:gap-8 px-6 py-8 transition-colors hover:bg-card dark:hover:bg-accent sm:p-8",
            )}
          >
            <div className="flex size-8 shrink-0 items-center justify-center">
              <Image
                src={`/svg/${fact.icon}.svg`}
                alt={fact.title}
                width={64}
                height={64}
                className="block size-full object-contain dark:brightness-0 dark:invert"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-xl leading-loose tracking-tight">
                <span className="block leading-tight">{fact.title}</span>
              </h2>
              <Prose className="prose-sm">
                <p>{fact.description}</p>
              </Prose>
            </div>
          </div>
        </ViewAnimation>
      ))}
    </div>
  </StickyList>
);
