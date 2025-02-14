import { z } from "zod";

export const serverSchema = z.object({
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
});

export const clientSchema = z.object({
  NEXT_PUBLIC_X_USERNAME: z.string(),
  NEXT_PUBLIC_LINKEDIN_USERNAME: z.string(),
  NEXT_PUBLIC_GITHUB_USERNAME: z.string(),
  NEXT_PUBLIC_FACEBOOK_USERNAME: z.string(),
  NEXT_PUBLIC_GUMROAD_USERNAME: z.string(),
  NEXT_PUBLIC_EMAIL: z.string().email(),

  NEXT_PUBLIC_ALGOLIA_APP_ID: z.string(),
  NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: z.string(),
  NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME: z.string(),
  NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME: z.string(),

  NEXT_PUBLIC_HOST: z.string().optional(),
  NEXT_PUBLIC_VERCEL_URL: z.string().optional(),

  NEXT_PUBLIC_GA_TRACKING_ID: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_X_USERNAME: process.env.NEXT_PUBLIC_X_USERNAME,
  NEXT_PUBLIC_LINKEDIN_USERNAME: process.env.NEXT_PUBLIC_LINKEDIN_USERNAME,
  NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
  NEXT_PUBLIC_FACEBOOK_USERNAME: process.env.NEXT_PUBLIC_FACEBOOK_USERNAME,
  NEXT_PUBLIC_GUMROAD_USERNAME: process.env.NEXT_PUBLIC_GUMROAD_USERNAME,
  NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,

  NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
  NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME: process.env.NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME,
  NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME: process.env.NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME,

  NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,

  NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
};
