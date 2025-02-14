import Image from "next/image";
import Link from "next/link";

import { HeroSection } from "@/components/common/sections/hero";
import { Button } from "@/components/ui/button";
import WinkingAvatar from "public/img/avatars/winking.png";

export const Hero = () => (
  <HeroSection
    caption="Bart Zagrodzki"
    title="Software engineer building products to help people lead better lives 🎯"
    image={
      <div className="relative hidden sm:block">
        <Image src={WinkingAvatar} alt="winking memoji" className="w-12" />
        <div className="faded-line-bottom" />
        <div className="faded-line-top" />
        <div className="faded-line-left" />
        <div className="faded-line-right" />
      </div>
    }
  >
    <div className="flex items-center justify-center gap-4">
      <Button asChild variant="outline">
        <Link href="/work">View my work</Link>
      </Button>
      <Button asChild>
        <Link href="/contact">Get in touch</Link>
      </Button>
    </div>
  </HeroSection>
);
