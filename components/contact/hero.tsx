import { HeroSection } from "@/components/common/sections/hero";
import { Button } from "@/components/ui/button";
import { env } from "@/env/client";
import { Mail } from "lucide-react";
import X from "public/svg/socials/x.svg";

export const Hero = () => (
  <HeroSection caption="Contact" title="Something on your mind? Get in touch with me!">
    <div className="flex  gap-3 sm:gap-4 sm:flex-row sm:items-center">
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
