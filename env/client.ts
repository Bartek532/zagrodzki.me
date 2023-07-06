import { clientEnv, clientSchema } from "./schema";

import type { ZodFormattedError, z } from "zod";

export const formatErrors = <T>(errors: ZodFormattedError<T>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if ("_errors" in value && Array.isArray(value._errors)) {
        // eslint-disable-next-line
        return `${name}: ${value._errors.join(", ")}\n`;
      }

      return;
    })
    .filter(Boolean);

const validateClientEnvVariables = () => {
  if (process.env.SKIP_ENV_VALIDATION === "1") {
    return clientEnv as z.infer<typeof clientSchema>;
  }

  const _clientEnv = clientSchema.safeParse(clientEnv);

  if (!_clientEnv.success) {
    console.error(
      "❌ Invalid environment variables:\n",
      ...formatErrors(_clientEnv.error.format()),
    );
    throw new Error("Invalid environment variables");
  }

  for (const key of Object.keys(_clientEnv.data)) {
    if (!key.startsWith("NEXT_PUBLIC_")) {
      console.warn(
        `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`,
      );

      throw new Error("Invalid public environment variable name");
    }
  }

  return _clientEnv.data;
};

export const env = validateClientEnvVariables();
