import { env } from "@/lib/env";

export const ORIGIN =
  env.NEXT_PUBLIC_HOST ?? env.NEXT_PUBLIC_VERCEL_URL ?? ("www.zagrodzki.me" as const);
export const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";
export const HOST = `${PROTOCOL}://${ORIGIN}` as const;

export const SEPARATOR = " • ";

export const SITE_TITLE = "Bart Zagrodzki";
export const SITE_TITLE_TEMPLATE = `%s ${SEPARATOR} ${SITE_TITLE}`;
export const SHORT_DESCRIPTION = "My personal website";
export const DEFAULT_DESCRIPTION =
  "Software engineer building products to help people lead better lives. In love with creative solutions - constantly learning and discovering new stuff.";

export const DEFAULT_IMAGE_URL = `/img/banner.png`;

export const SOCIALS = {
  x: {
    id: "x",
    name: "X",
    link: `https://x.com/${env.NEXT_PUBLIC_X_USERNAME}`,
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    link: `https://www.linkedin.com/in/${env.NEXT_PUBLIC_LINKEDIN_USERNAME}`,
  },
  github: {
    id: "github",
    name: "GitHub",
    link: `https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`,
  },
  rss: {
    id: "rss",
    name: "RSS",
    link: "/feed",
  },
} as const;

export const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
export const CONTENT_ID = "content";

export const DEFAULT_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
