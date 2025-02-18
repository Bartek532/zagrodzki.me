import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets-zod";
import { z } from "zod";

export const env = createEnv({
  extends: [vercel()],
  server: {
    SPOTIFY_CLIENT_ID: z.string(),
    SPOTIFY_CLIENT_SECRET: z.string(),
    SPOTIFY_REFRESH_TOKEN: z.string(),

    SENDGRID_API_KEY: z.string(),
    EMAIL: z.string().email(),

    KV_REST_API_TOKEN: z.string(),
    KV_REST_API_URL: z.string().url(),

    ALGOLIA_UPDATE_API_KEY: z.string(),

    MAILER_LITE_API_KEY: z.string(),
    MAILER_LITE_GROUP_ID: z.string(),

    GITHUB_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_X_USERNAME: z.string(),
    NEXT_PUBLIC_LINKEDIN_USERNAME: z.string(),
    NEXT_PUBLIC_GITHUB_USERNAME: z.string(),
    NEXT_PUBLIC_FACEBOOK_USERNAME: z.string(),
    NEXT_PUBLIC_EMAIL: z.string().email(),

    NEXT_PUBLIC_ALGOLIA_APP_ID: z.string(),
    NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: z.string(),
    NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME: z.string(),
    NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME: z.string(),

    NEXT_PUBLIC_HOST: z.string().optional(),
    NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
    NEXT_PUBLIC_GA_TRACKING_ID: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_X_USERNAME: process.env.NEXT_PUBLIC_X_USERNAME,
    NEXT_PUBLIC_LINKEDIN_USERNAME: process.env.NEXT_PUBLIC_LINKEDIN_USERNAME,
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
    NEXT_PUBLIC_FACEBOOK_USERNAME: process.env.NEXT_PUBLIC_FACEBOOK_USERNAME,
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,

    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
    NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME: process.env.NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME,
    NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME: process.env.NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME,

    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  },
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
});
