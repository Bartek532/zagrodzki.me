import { z } from "zod";

export const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
});

export const clientSchema = z.object({
  NEXT_PUBLIC_TWITTER_USERNAME: z.string(),
  NEXT_PUBLIC_LINKEDIN_USERNAME: z.string(),
  NEXT_PUBLIC_GITHUB_USERNAME: z.string(),
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
};