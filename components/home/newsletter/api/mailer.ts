"use server";

import env from "@/env.config";

export const subscribeToNewsletter = async (email: string) => {
  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    body: JSON.stringify({ email, groups: [env.MAILER_LITE_GROUP_ID] }),
    headers: {
      Authorization: "Bearer " + env.MAILER_LITE_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to subscribe to newsletter!");
  }
};
