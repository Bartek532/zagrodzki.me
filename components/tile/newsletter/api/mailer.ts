"use server";

import { env } from "env/server";

export const subscribeToNewsletter = async (email: string) => {
  await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    body: JSON.stringify({ email, groups: [env.MAILER_LITE_GROUP_ID] }),
    headers: {
      Authorization: "Bearer " + env.MAILER_LITE_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
