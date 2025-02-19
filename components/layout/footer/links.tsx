import Image from "next/image";

import { SuperLink } from "@/components/common/link/super-link";
import { ActiveLink } from "@/components/ui/active-link";
import { allPositions } from "@/data/experience";
import { routes } from "@/data/routes";
import { getNewestPosts } from "@/lib/posts";
import { getBestProjects } from "@/lib/projects";
import { ViewAnimation } from "@/providers/view-animation";
import { SOCIALS } from "@/utils/consts";

const lists = [
  {
    title: "Pages",
    items: routes.map((item) => ({
      href: item.path,
      children: item.label,
    })),
  },
  {
    title: "Work",
    href: "/work",
    items: allPositions.map((position) => ({
      href: position.link,
      children: position.company,
      external: true,
    })),
  },
  {
    title: "Posts",
    href: "/blog",
    items: getNewestPosts()
      .slice(0, 5)
      .map((post) => ({
        href: `/blog/${post.slug}`,
        children: post.title,
      })),
  },
  {
    title: "Projects",
    href: "/work",
    items: getBestProjects()
      .slice(0, 5)
      .map((project) => ({
        href: `/work/${project.slug}`,
        children: project.title,
      })),
  },
  {
    title: "Social",
    items: Object.values(SOCIALS).map((social) => ({
      href: social.link,
      children: (
        <div className="flex items-center gap-2">
          <Image
            src={`/svg/socials/${social.id}.svg`}
            alt=""
            width={14}
            height={14}
            className="opacity-50 brightness-0 dark:invert"
          />
          {social.name}
        </div>
      ),
      external: true,
    })),
  },
];
export const Links = () => (
  <div className="text-muted-foreground grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-5">
    {lists.map((list, index) => (
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={index * 0.1}
        key={list.title}
        className="flex flex-col gap-6"
      >
        <div className="text-foreground font-medium">
          {list.href ? <SuperLink href={list.href}>{list.title}</SuperLink> : <p>{list.title}</p>}
        </div>
        <ul className="flex flex-col gap-3">
          {list.items.map((item) => (
            <li key={item.href}>
              <ActiveLink
                href={item.href}
                {...("external" in item && item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.children}
              </ActiveLink>
            </li>
          ))}
        </ul>
      </ViewAnimation>
    ))}
  </div>
);
