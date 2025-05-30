import dynamic from "next/dynamic";

import { StickyList } from "@/components/common/sections/sticky-list";
import { Prose } from "@/components/ui/prose";
import { allEducation } from "@/data/education";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

export const Education = () => (
  <StickyList
    title="Education"
    description="I love learning and I'm always looking for new opportunities to grow."
  >
    {allEducation.map((education, index, array) => {
      const Icon = dynamic(() => import(`../../public/svg/${education.id}.svg`));

      return (
        <ViewAnimation
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          delay={index * 0.2}
          className={cn(index < array.length - 1 ? "border-b" : "")}
          key={education.id}
        >
          <a
            href={education.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "hover:bg-card dark:hover:bg-accent flex flex-col items-start gap-6 p-6 transition-colors",
              "sm:flex-row sm:p-8",
            )}
          >
            <div className="flex w-16 shrink-0 items-center justify-center pt-2">
              <Icon />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl leading-loose font-semibold tracking-tight">
                <span className="block leading-tight">{education.title}</span>
                <span className="text-muted-foreground block font-sans text-lg">
                  {education.place}
                </span>
              </h2>
              <Prose className="prose-sm">
                <p>{education.description}</p>
              </Prose>
              <p className="text-muted-foreground text-sm">
                {education.start} &mdash;&nbsp;
                {"end" in education && typeof education.end === "string"
                  ? education.end
                  : "Present"}
              </p>
            </div>
          </a>
        </ViewAnimation>
      );
    })}
  </StickyList>
);
