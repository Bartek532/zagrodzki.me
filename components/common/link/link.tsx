import { ArrowUpRight } from "lucide-react";

import { SuperLink } from "./super-link";

interface LinkProps {
  readonly children: React.ReactNode;
  readonly href: string;
}

export const Link = ({ children, href }: LinkProps) => {
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
      <span className="text-link bg-linear-to-r from-current to-current bg-[length:0%_1.7px] bg-[position:0%_100%] bg-no-repeat p-0 transition-[background-size] duration-250 ease-in-out hover:bg-[length:100%_1.7px] focus:bg-[length:100%_1.7px]">
        {children}
      </span>
      <span className="inline-flex items-center px-0.5 whitespace-nowrap">
        &#xfeff;
        <ArrowUpRight className="text-link inline w-4" />
      </span>
    </Component>
  );
};
