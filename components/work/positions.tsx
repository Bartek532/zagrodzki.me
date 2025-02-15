import dynamic from "next/dynamic";

import { Section } from "@/components/common/sections/section";
import { Prose } from "@/components/ui/prose";
import { allPositions } from "@/data/experience";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

export const Positions = () => (
  <Section className="grid sm:grid-cols-2">
    {allPositions.map((position, index, array) => {
      const Icon = dynamic(() => import(`public/svg/${position.id}.svg`));

      return (
        <ViewAnimation
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          delay={index % 2 ? 0.2 : 0}
          className={cn(
            index % 2 === 0 ? "sm:border-r" : "",
            index < array.length - 2 ? "border-b" : "",
          )}
          key={position.id}
        >
          <a
            href={position.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex flex-col items-start gap-6 p-6 h-full transition-colors hover:bg-card dark:hover:bg-accent",
              "sm:flex-row sm:p-8",
            )}
          >
            <div className="flex w-16 shrink-0 items-center justify-center">
              <Icon />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-xl leading-loose tracking-tight">
                <span className="block leading-tight">{position.position}</span>
                <span className="block font-sans text-muted-foreground text-lg">
                  {position.company}
                </span>
              </h2>
              <Prose className="prose-sm">
                <p>{position.description}</p>
              </Prose>
              <p className="text-muted-foreground text-sm">
                {position.type} &bull; {position.start} &mdash;&nbsp;
                {"end" in position && typeof position.end === "string" ? position.end : "Present"}
              </p>
            </div>
          </a>
        </ViewAnimation>
      );
    })}
  </Section>
);
