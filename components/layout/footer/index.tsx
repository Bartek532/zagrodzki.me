import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { BuiltWith } from "@/components/layout/footer/built-with";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import { Links } from "./links";

export const Footer = () => (
  <footer className={cn("container mx-auto flex flex-col gap-4 p-6", "sm:gap-16 sm:px-8 sm:py-16")}>
    <Links />
    <div className="grid items-center gap-4 lg:grid-cols-3">
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.4}
      >
        <BuiltWith />
      </ViewAnimation>
      <div className="flex items-center lg:justify-center">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.8}
        >
          <p className="text-muted-foreground text-sm whitespace-nowrap">
            &copy; {new Date().getFullYear()} Bart Zagrodzki. All rights reserved.
          </p>
        </ViewAnimation>
      </div>
      <div className="flex items-center lg:justify-end">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={1.2}
        >
          <ThemeSwitcher />
        </ViewAnimation>
      </div>
    </div>
  </footer>
);
