export const ORIGIN = process.env.NEXT_PUBLIC_HOST || process.env.NEXT_PUBLIC_VERCEL_URL || ("zagrodzki.me" as const);
export const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";
export const HOST = `${PROTOCOL}://${ORIGIN}` as const;

export const SEPARATOR = " • ";

export const SITE_TITLE = "Bartosz Zagrodzki";
export const SITE_TITLE_TEMPLATE = `%s ${SEPARATOR} ${SITE_TITLE}`;
export const SHORT_DESCRIPTION = "My personal website";
export const DEFAULT_DESCRIPTION =
  "Hi, I'm Bartek - front-end developer, blogger, new technologies enthusiast, enjoy my website!";

export const DEFAULT_IMAGE_URL = `/banner.png`;

export const SOCIALS = [
  {
    name: "twitter",
    color: "#94ccff",
    link: "https://twitter.com/",
  },
  {
    name: "linkedin",
    color: "#2867B2",
    link: "https://www.linkedin.com/in/",
  },
  {
    name: "github",
    color: "#333",
    link: "https://github.com/",
  },
] as const;

export const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;