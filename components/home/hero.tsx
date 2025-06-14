"use client";

import Image from "next/image";

import { SuperLink } from "@/components/common/link/super-link";
import { HeroSection } from "@/components/common/sections/hero";
import { Button } from "@/components/ui/button";
import { useBreakpoint } from "@/hooks/use-media-query";

import WinkingAvatar from "../../public/img/avatars/winking.png";

export const Hero = () => {
  const withImage = useBreakpoint("sm");

  return (
    <HeroSection
      caption="Bart Zagrodzki"
      title="Software engineer building products to help people lead better lives 🎯"
      {...(withImage
        ? {
            image: (
              <div className="relative hidden sm:block">
                <Image src={WinkingAvatar} alt="winking memoji" className="w-12" />
                <div className="faded-line-bottom" />
                <div className="faded-line-top" />
                <div className="faded-line-left" />
                <div className="faded-line-right" />
              </div>
            ),
          }
        : {})}
    >
      <div className="flex items-center gap-4 sm:justify-center">
        <Button asChild variant="outline">
          <SuperLink href="/work">View my work</SuperLink>
        </Button>
        <Button asChild>
          <SuperLink href="/contact">Get in touch</SuperLink>
        </Button>
      </div>
    </HeroSection>
  );
};
