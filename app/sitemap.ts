import dayjs from "dayjs";

import { getPublishedPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { HOST } from "@/utils/consts";

import type { MetadataRoute } from "next";

const url = (path: string) => `${HOST}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: url("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getAllProjects().map((project) => ({
      url: url(`/work/${project.slug}`),
      lastModified: dayjs(project.modifiedAt, "DD-MM-YYYY").toDate(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getPublishedPosts().map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: dayjs(post.modifiedAt, "DD-MM-YYYY").toDate(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...["/about", "/blog", "/work", "/contact"].map((path) => ({
      url: url(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
