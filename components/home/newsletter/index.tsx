import { Section } from "@/components/common/sections/section";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import { NewsletterForm } from "./form";
import { Teaser } from "./teaser";

export const Newsletter = () => (
  <Section className={cn("grid gap-8 bg-dashed p-6", "sm:grid-cols-2 sm:p-8")}>
    <ViewAnimation
      initial={{ opacity: 0, translateY: -8 }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      <Teaser />
    </ViewAnimation>
    <ViewAnimation
      initial={{ opacity: 0, translateY: -8 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      delay={0.4}
    >
      <NewsletterForm />
    </ViewAnimation>
  </Section>
);
