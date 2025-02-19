import { HeroSection } from "@/components/common/sections/hero";
import { SocialButton } from "@/components/ui/social-button";
import { SOCIALS } from "@/utils/consts";

interface HeroProps {
  readonly description: string;
}

export const Hero = ({ description }: HeroProps) => (
  <HeroSection caption="Work" title={description}>
    <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
      <SocialButton data={SOCIALS.linkedin} />
      <SocialButton data={SOCIALS.github} />
    </div>
  </HeroSection>
);
