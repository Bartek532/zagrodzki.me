import { Section } from "@/components/common/sections/section";
import { buttonVariants } from "@/components/ui/button";
import { allSkills } from "@/data/skills";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

export const Skills = () => (
  <Section className={cn("flex flex-col gap-8 p-6", "sm:p-8")}>
    <ViewAnimation
      initial={{ opacity: 0, translateY: -8 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      className="px-4"
    >
      <p className="text-center text-muted-foreground text-sm">
        I'm proficient in the following technologies
      </p>
    </ViewAnimation>
    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2.5">
      {allSkills.map((skill, index) => (
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={index * 0.1}
          key={skill.name}
        >
          <a
            href={skill.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
          >
            <skill.icon className={cn("size-4", "className" in skill && skill.className)} />
            {skill.name}
          </a>
        </ViewAnimation>
      ))}
    </div>
  </Section>
);
