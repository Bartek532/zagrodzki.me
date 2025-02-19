import Image from "next/image";

import { SuperLink } from "@/components/common/link/super-link";
import { Section } from "@/components/common/sections/section";
import { buttonVariants } from "@/components/ui/button";
import { Prose } from "@/components/ui/prose";
import { allPositions } from "@/data/experience";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

export const Positions = () => (
  <Section className="grid lg:grid-cols-2">
    {allPositions.map((position, index, array) => (
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
            "flex h-full flex-col items-start gap-6 p-6 transition-colors hover:bg-card dark:hover:bg-accent",
            "sm:p-8 lg:flex-row",
          )}
        >
          <div className="flex w-16 shrink-0 items-center justify-center">
            <Image src={position.icon} alt={position.company} width={64} height={64} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold leading-loose tracking-tight">
              <span className="block leading-tight">{position.position}</span>
              <span className="block font-sans text-lg text-muted-foreground">
                {position.company}
              </span>
            </h2>
            <Prose className="prose-sm">
              <p>{position.description}</p>
            </Prose>
            <p className="text-sm text-muted-foreground">
              {position.type} &bull; {position.start} &mdash;&nbsp;
              {"end" in position && typeof position.end === "string" ? position.end : "Present"}
            </p>
          </div>
        </a>
      </ViewAnimation>
    ))}
    {allPositions.length % 2 && (
      <ViewAnimation
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        delay={0.2}
        className="bg-dashed hidden flex-col items-center justify-center gap-6 border-t p-8 lg:flex"
      >
        <h2 className="text-center text-3xl font-semibold">Want to build together?</h2>
        <SuperLink href="contact" className={buttonVariants()}>
          Let&apos;s talk about work
        </SuperLink>
      </ViewAnimation>
    )}
  </Section>
);
