import { HeroSection } from "@/components/common/sections/hero";
import { SocialButton } from "@/components/ui/social-button";
import { SOCIALS } from "@/utils/consts";

export const Hero = () => (
  <HeroSection caption="Work" title="I love shipping products and building great software.">
    <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center">
      <SocialButton data={SOCIALS.linkedin} />
      <SocialButton data={SOCIALS.github} />
    </div>
  </HeroSection>
);
