"use server";

import { z } from "zod";

import env from "@/env.config";

const newsletterEmailSchema = z.email().max(254);

export const subscribeToNewsletter = async (email: string) => {
  const parsedEmail = newsletterEmailSchema.parse(email.trim());

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
