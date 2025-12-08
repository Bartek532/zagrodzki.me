import { ThemedImage } from "@/components/common/image/themed-image";
import { ThirdsSection } from "@/components/common/sections/thirds";

import NewProjectDark from "../../public/img/projects/new-dark.webp";
import NewProjectLight from "../../public/img/projects/new-light.webp";

export const FeaturedProject = () => (
  <ThirdsSection
    caption="Now 🔥"
    description="Im currently working on a new project called 'TurboStarter'. It's a collection of starter kits to help you get started quickly with your next project. Having Next.js, Expo (React Native) and WXT (Vite) on its stack makes it a great choice for shipping web apps, mobile apps and browser extensions in minutes."
    buttons={[
      {
        label: "Check it out",
        href: "https://turbostarter.dev",
      },
    ]}
  >
    <div className="h-full pt-4 pl-4 sm:pt-8 sm:pl-8">
      <div className="dashed-line-top" />
      <div className="dashed-line-left" />
      <ThemedImage
        alt=""
        light={NewProjectLight}
        dark={NewProjectDark}
        className="bg-muted h-full w-full rounded-tl-lg sm:rounded-tl-2xl"
        preload
      />
    </div>
  </ThirdsSection>
);
