"use client";

import { useAtom } from "jotai";

import { mobileMenuOpen } from "@/components/layout/header/mobile-menu";
import { Hamburger } from "@/components/layout/header/nav/hamburger";

export const MobileNavTrigger = () => {
  const [open, setOpen] = useAtom(mobileMenuOpen);

  return <Hamburger open={open} onToggle={() => setOpen((o) => !o)} />;
};
