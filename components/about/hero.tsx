import { SuperLink } from "@/components/common/link/super-link";
import { HeroSection } from "@/components/common/sections/hero";
import { Button } from "@/components/ui/button";
import { SocialButton } from "@/components/ui/social-button";
import { SOCIALS } from "@/utils/consts";

interface HeroProps {
  readonly description: string;
}

export const Hero = ({ description }: HeroProps) => (
  <HeroSection caption="About" title={description}>
    <div className="flex items-center gap-4 sm:justify-center">
      <SocialButton data={SOCIALS.x} />
      <Button asChild>
        <SuperLink href="/contact">Let&apos;s hang out!</SuperLink>
      </Button>
    </div>
  </HeroSection>
);
