"use server";

import { env } from "env/server";

export const subscribeToNewsletter = (email: string) =>
  fetch(`https://api.mailerlite.com/api/v2/groups/${env.MAILER_LITE_GROUP_ID}/subscribers`, {
    method: "POST",
    headers: { "X-MailerLite-ApiKey": env.MAILER_LITE_API_KEY },
    body: JSON.stringify({ email }),
  });
