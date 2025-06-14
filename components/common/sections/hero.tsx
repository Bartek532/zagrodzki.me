import { Children } from "react";

import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import { Section } from "./section";

import type { ReactNode } from "react";

interface HeroProps {
  image?: ReactNode;
  caption?: ReactNode;
  title: string;
  children?: ReactNode;
  className?: string;
}

export const HeroSection = ({ image, caption, title, children, className }: HeroProps) => (
  <Section className={cn("p-6", className)}>
    <div
      className={cn(
        "relative flex flex-col items-start justify-center gap-5 overflow-hidden",
        "sm:bg-card sm:shadow-tile sm:items-center sm:gap-6 sm:rounded-lg sm:border sm:px-8 sm:py-20 lg:gap-8",
      )}
    >
      {image && (
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          {image}
        </ViewAnimation>
      )}
      <div className="flex flex-col gap-4 sm:items-center">
        {caption && (
          <ViewAnimation
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <small className="text-muted-foreground block text-sm sm:text-base">{caption}</small>
          </ViewAnimation>
        )}
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4}
        >
          <h1
            className={cn(
              "font-kenfolg leading-tighter max-w-4xl text-3xl font-bold tracking-tight text-balance",
              "sm:text-center sm:text-4xl sm:leading-tight",
              "lg:text-5xl lg:leading-tight",
            )}
          >
            {title}
          </h1>
        </ViewAnimation>
      </div>
      {Children.map(children, (child, index) => (
        <ViewAnimation
          className="w-full"
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.8 + index * 0.4}
        >
          {child}
        </ViewAnimation>
      ))}
    </div>
  </Section>
);
