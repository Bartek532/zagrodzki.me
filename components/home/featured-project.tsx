import { ThirdsSection } from "@/components/common/sections/thirds";

export const FeaturedProject = () => (
  <ThirdsSection
    caption="Now"
    description="I'm currently working on a new project called 'The Hub'. It's a platform that helps people find and connect with each other. I'm using it to learn more about Next.js, Tailwind CSS, and TypeScript."
    buttons={[
      {
        label: "Learn more",
        href: "https://thehub.com",
      },
    ]}
  >
    <div className="pt-4 pl-4 sm:pt-8 sm:pl-8">
      <div className="dashed-line-top" />
      <div className="dashed-line-left" />
      <div className="w-full rounded-tl-lg border-t border-l aspect-video bg-muted sm:rounded-tl-2xl" />
    </div>
  </ThirdsSection>
);
