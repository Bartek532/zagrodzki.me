import { HeroSection } from "@/components/common/sections/hero";
import { SocialButton } from "@/components/ui/social-button";
import { SOCIALS } from "@/utils/consts";

type HeroProps = {
  readonly description: string;
};

export const Hero = ({ description }: HeroProps) => (
  <HeroSection caption="Work" title={description}>
    <div className="flex flex-col sm:justify-center gap-3 sm:gap-4 sm:flex-row sm:items-center">
      <SocialButton data={SOCIALS.linkedin} />
      <SocialButton data={SOCIALS.github} />
    </div>
  </HeroSection>
);
