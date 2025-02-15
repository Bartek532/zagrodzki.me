import Image from "next/image";
import Link from "next/link";

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
      href: `/work/${position.slug}`,
      children: position.company,
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
    href: "/projects",
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
            alt={social.name}
            width={14}
            height={14}
            className="opacity-50 brightness-0 dark:invert"
          />
          {social.name}
        </div>
      ),
    })),
  },
];
export const Links = () => (
  <div className="grid gap-8 text-muted-foreground text-sm sm:grid-cols-2 lg:grid-cols-5">
    {lists.map((list, index) => (
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={index * 0.1}
        key={list.title}
        className="flex flex-col gap-6"
      >
        <div className="font-medium text-foreground">
          {list.href ? <Link href={list.href}>{list.title}</Link> : <p>{list.title}</p>}
        </div>
        <ul className="flex flex-col gap-3">
          {list.items.map((item) => (
            <li key={item.href}>
              <ActiveLink
                href={item.href}
                target={list.external ? "_blank" : undefined}
                rel={list.external ? "noopener noreferrer" : undefined}
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
