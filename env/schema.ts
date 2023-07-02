import { z } from "zod";

export const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string(),
  SPOTIFY_REFRESH_TOKEN: z.string(),
});

export const clientSchema = z.object({
  NEXT_PUBLIC_TWITTER_USERNAME: z.string(),
  NEXT_PUBLIC_LINKEDIN_USERNAME: z.string(),
  NEXT_PUBLIC_GITHUB_USERNAME: z.string(),
  NEXT_PUBLIC_FACEBOOK_USERNAME: z.string(),
  NEXT_PUBLIC_EMAIL: z.string().email(),
  NEXT_PUBLIC_ALGOLIA_APP_ID: z.string(),
  NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_TWITTER_USERNAME: process.env.NEXT_PUBLIC_TWITTER_USERNAME,
  NEXT_PUBLIC_LINKEDIN_USERNAME: process.env.NEXT_PUBLIC_LINKEDIN_USERNAME,
  NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
  NEXT_PUBLIC_FACEBOOK_USERNAME: process.env.NEXT_PUBLIC_FACEBOOK_USERNAME,
  NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
  NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
};
