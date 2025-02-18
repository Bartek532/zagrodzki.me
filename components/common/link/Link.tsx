import { ArrowUpRight } from "lucide-react";
import { memo } from "react";

import { SuperLink } from "./super-link";

interface LinkProps {
  readonly children: React.ReactNode;
  readonly href: string;
}

export const Link = memo<LinkProps>(({ children, href }) => {
  const isExternal = ["http://", "https://", "mailto:", "www."].some((start) =>
    href.startsWith(start),
  );

  const Component = isExternal ? "a" : SuperLink;

  return (
    <Component
      href={href}
      className="group"
      rel={isExternal ? "noreferrer noopener" : undefined}
      target="_blank"
    >
      <span className="text-link p-0 bg-gradient-to-r from-current to-current bg-no-repeat bg-[length:0%_1.7px] bg-[position:0%_100%] transition-[background-size] duration-250 ease-in-out hover:bg-[length:100%_1.7px] focus:bg-[length:100%_1.7px]">
        {children}
      </span>
      <span className="px-0.5 inline-flex items-center whitespace-nowrap">
        &#xfeff;
        <ArrowUpRight className="w-4 inline text-link" />
      </span>
    </Component>
  );
});

Link.displayName = "Link";
