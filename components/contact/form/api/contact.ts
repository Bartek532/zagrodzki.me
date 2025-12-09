"use server";

import env from "@/env.config";

import type { Message } from "../schema";

export const sendMail = async ({ name, email, message, type }: Message) => {
  const response = await fetch("https://api.useplunk.com/v1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.PLUNK_API_KEY}`,
    },
    body: JSON.stringify({
      to: env.EMAIL,
      subject: `${name} - ${email}`,
      body: `${type} - ${message}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send email: ${response.status} ${response.statusText}`);
  }
};
