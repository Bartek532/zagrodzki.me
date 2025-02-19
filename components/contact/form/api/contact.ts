"use server";

import sgMail from "@sendgrid/mail";

import { env } from "@/lib/env";

import type { Message } from "../schema";

sgMail.setApiKey(env.SENDGRID_API_KEY);

export const sendMail = async ({ name, email, message, type }: Message) => {
  const msg: sgMail.MailDataRequired = {
    to: env.EMAIL,
    from: env.EMAIL,
    subject: `${name} - ${email}`,
    text: `${type} - ${message}`,
  };

  await sgMail.send(msg);
};
