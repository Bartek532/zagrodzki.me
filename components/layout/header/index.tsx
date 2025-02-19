import { SuperLink } from "@/components/common/link/super-link";
import { MobileNav } from "@/components/layout/header/nav/mobile-nav";
import { MobileNavTrigger } from "@/components/layout/header/nav/mobile-nav-trigger";
import { ActiveLink } from "@/components/ui/active-link";
import { Button } from "@/components/ui/button";
import { routes } from "@/data/routes";
import { HeaderProvider } from "@/providers/header";
import { ViewAnimation } from "@/providers/view-animation";

import Logo from "../../../public/svg/logo.svg";
import PaperPlane from "../../../public/svg/paper-plane.svg";

export const Header = () => (
  <>
    <HeaderProvider className="bg-background/90 fixed top-0 right-0 left-0 z-50 container mx-auto flex items-center justify-between px-6 py-3 backdrop-blur-md transition-all sm:border-x sm:py-4">
      <SuperLink
        href="#main"
        className="bg-sky absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-[400%] rounded-lg px-6 py-2 text-white focus:-translate-y-1/2"
      >
        skip to content
      </SuperLink>

      <div className="w-32">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <SuperLink href="/" aria-label="Bart Zagrodzki">
            <Logo className="size-8" />
          </SuperLink>
        </ViewAnimation>
      </div>
      <nav className="hidden gap-6 md:flex">
        {routes.map((link, index) => (
          <ViewAnimation
            key={link.path}
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            delay={0.4 + index * 0.1}
          >
            <ActiveLink href={link.path}>{link.label}</ActiveLink>
          </ViewAnimation>
        ))}
      </nav>
      <div className="hidden w-32 justify-end md:flex">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.8}
        >
          <Button variant="outline" size="sm" asChild>
            <SuperLink href="/contact" className="group">
              Get in touch
              <PaperPlane className="text-foreground size-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-4 group-hover:translate-x-8 group-hover:rotate-[20deg]" />
            </SuperLink>
          </Button>
        </ViewAnimation>
      </div>
      <div className="flex w-32 justify-end md:hidden">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.8}
        >
          <MobileNavTrigger />
        </ViewAnimation>
      </div>
    </HeaderProvider>
    <MobileNav />
  </>
);
