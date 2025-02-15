import { HeroSection } from "@/components/common/sections/hero";
import { SocialButton } from "@/components/ui/social-button";
import { SOCIALS } from "@/utils/consts";

export const Hero = () => (
  <HeroSection caption="Work" title="I love shipping products and build software.">
    <div className="flex items-center justify-center gap-4">
      <SocialButton data={SOCIALS.linkedin} />
      <SocialButton data={SOCIALS.github} />
    </div>
  </HeroSection>
);
