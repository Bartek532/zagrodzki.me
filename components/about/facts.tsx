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
          className={cn(index < array.length - 1 ? "border-b sm:border-r sm:border-b-0" : "")}
          key={fact.title}
        >
          <div
            className={cn(
              "hover:bg-card dark:hover:bg-accent flex h-full flex-col items-start justify-between gap-6 px-6 py-8 transition-colors sm:p-8 lg:gap-8",
            )}
          >
            <div className="flex size-9 shrink-0 items-center justify-center">
              <fact.icon className="size-full" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl leading-loose font-semibold tracking-tight">
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
