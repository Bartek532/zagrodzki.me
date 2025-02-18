"use client";

import { usePathname } from "next/navigation";

import { SuperLink } from "@/components/common/link/super-link";
import { cn } from "@/utils";

import type { LinkProps } from "next/link";
import type { ReactNode } from "react";

type ActiveLinkProps = LinkProps & {
  children: ReactNode;
  href: string;
  target?: string;
  rel?: string;
};

export const ActiveLink = ({ href, children, ...props }: ActiveLinkProps) => {
  const pathname = usePathname();
  const active = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <SuperLink
      href={href}
      className={cn(
        "text-sm text-muted-foreground transition-colors",
        "hover:text-foreground",
        active && "font-medium text-foreground",
      )}
      {...props}
    >
      {children}
    </SuperLink>
  );
};
