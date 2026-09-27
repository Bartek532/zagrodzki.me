"use server";

import { z } from "zod";

import env from "@/env.config";
import { assertRateLimit } from "@/lib/kv/rate-limit";

export const subscribeToNewsletter = async (email: string) => {
  await assertRateLimit("newsletter");
  const parsedEmail = z.email().parse(email);

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    body: JSON.stringify({ email: parsedEmail, groups: [env.MAILER_LITE_GROUP_ID] }),
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
