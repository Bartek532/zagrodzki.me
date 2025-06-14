import { PlusIcon } from "lucide-react";

import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLDivElement>;

const Cross = () => (
  <div className="relative h-6 w-6">
    <div className="bg-background absolute left-3 h-6 w-px" />
    <div className="bg-background absolute top-3 h-px w-6" />

    <ViewAnimation
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <PlusIcon size={20} className="text-connection" />
    </ViewAnimation>
  </div>
);

export const Section = ({ children, className, ...props }: SectionProps) => (
  <section {...props}>
    <div className="relative container mx-auto">
      <div className={cn("sm:border-x", className)}>{children}</div>
      <div className="absolute -bottom-3 -left-3 z-10 hidden h-6 sm:block">
        <Cross />
      </div>
      <div className="absolute -right-3 -bottom-3 z-10 hidden h-6 -translate-x-px sm:block">
        <Cross />
      </div>
    </div>
  </section>
);
