"use client";

import { atom, useAtom } from "jotai";

import { SuperLink } from "@/components/common/link/super-link";
import { ActiveLink } from "@/components/ui/active-link";
import { Button } from "@/components/ui/button";
import { routes } from "@/data/routes";
import { cn } from "@/utils";

export const mobileMenuOpen = atom(false);

export const MobileNav = () => {
  const [open, setOpen] = useAtom(mobileMenuOpen);

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-14 z-10 flex h-[calc(100vh-5rem)] w-full flex-col gap-7 overflow-auto lg:hidden">
        <div
          className={cn(
            "absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-500 ease-in-expo",
            {
              "pointer-events-auto opacity-100": open,
            },
          )}
          onClick={() => setOpen((o) => !o)}
        ></div>
        <div
          className={cn(
            "flex w-full -translate-y-full flex-col gap-2 rounded-b-md bg-background px-6 pb-6 transition-transform duration-500 ease-in-expo sm:px-8",
            {
              "pointer-events-auto translate-y-0": open,
            },
          )}
        >
          <nav className="flex flex-col items-start gap-2.5">
            <ul className="w-full">
              {routes.map((link) => (
                <li key={link.path} className="w-full py-1.5">
                  <ActiveLink key={link.path} href={link.path} onClick={() => setOpen(false)}>
                    {link.label}
                  </ActiveLink>
                </li>
              ))}
            </ul>

            <Button variant="outline" asChild onClick={() => setOpen(false)} className="w-full">
              <SuperLink href="/contact">Get in touch</SuperLink>
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
};
