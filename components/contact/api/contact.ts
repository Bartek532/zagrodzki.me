"use server";

import sgMail from "@sendgrid/mail";

import { env } from "env/server";

import { Message } from "../utils/validation/types";

sgMail.setApiKey(env.SENDGRID_API_KEY);

export const sendMail = async ({ name, email, message }: Message) => {
  const msg: sgMail.MailDataRequired = {
    to: env.EMAIL,
    from: env.EMAIL,
    subject: `${name} - ${email}`,
    text: message,
  };

  await sgMail.send(msg);
};
