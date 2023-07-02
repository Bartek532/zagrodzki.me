import { env as clientEnv, formatErrors } from "./client";
import { serverSchema } from "./schema";

import type { clientSchema } from "./schema";
import type { z } from "zod";

const validateEnvVariables = () => {
  if (process.env.SKIP_ENV_VALIDATION === "1") {
    return { ...process.env, ...clientEnv } as z.infer<typeof serverSchema> &
      z.infer<typeof clientSchema>;
  }

  const _serverEnv = serverSchema.safeParse(process.env);

  if (!_serverEnv.success) {
    console.error(
      "❌ Invalid environment variables:\n",
      ...formatErrors(_serverEnv.error.format()),
    );
    throw new Error("Invalid environment variables");
  }

  for (const key of Object.keys(_serverEnv.data)) {
    if (key.startsWith("NEXT_PUBLIC_")) {
      console.warn("❌ You are exposing a server-side env-variable:", key);

      throw new Error("You are exposing a server-side env-variable");
    }
  }

  return { ..._serverEnv.data, ...clientEnv };
};

export const env = validateEnvVariables();
