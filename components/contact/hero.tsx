import { Mail } from "lucide-react";

import { HeroSection } from "@/components/common/sections/hero";
import { Button } from "@/components/ui/button";
import env from "@/env.config";

import X from "../../public/svg/socials/x.svg";

interface HeroProps {
  readonly description: string;
}

export const Hero = ({ description }: HeroProps) => (
  <HeroSection caption="Contact" title={description}>
    <div className="flex gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
      <Button asChild variant="outline">
        <a
          href={`https://x.com/${env.NEXT_PUBLIC_X_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <X className="size-3" />
          Ping me on X
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href={`mailto:${env.NEXT_PUBLIC_EMAIL}`}>
          <Mail className="size-4" />
          Send me an email
        </a>
      </Button>
    </div>
  </HeroSection>
);
