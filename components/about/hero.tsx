import { SuperLink } from "@/components/common/link/SuperLink";
import { HeroSection } from "@/components/common/sections/hero";
import { Button } from "@/components/ui/button";
import { SocialButton } from "@/components/ui/social-button";
import { SOCIALS } from "@/utils/consts";

export const Hero = () => (
  <HeroSection caption="About" title="I'm a Software Engineer not afraid of any technology.">
    <div className="flex items-center justify-center gap-4">
      <SocialButton data={SOCIALS.x} />
      <Button asChild>
        <SuperLink href="/contact">Let&apos;s hang out!</SuperLink>
      </Button>
    </div>
  </HeroSection>
);
