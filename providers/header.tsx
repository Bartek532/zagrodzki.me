"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { mobileMenuOpen } from "@/components/layout/header/nav/mobile-nav";
import { cn } from "@/utils";

import type { HTMLAttributes } from "react";

type HeaderProviderProps = HTMLAttributes<HTMLDivElement>;

export const HeaderProvider = ({ children, className }: HeaderProviderProps) => {
  const [open] = useAtom(mobileMenuOpen);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 5);
    const throttledHandleScroll = () => requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  return <header className={cn(className, isScrolled && !open && "border-b")}>{children}</header>;
};
