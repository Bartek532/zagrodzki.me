import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

import { EMAIL_REGEX } from "utils/consts";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface Email {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  message: yup.string().required(),
  email: yup.string().required().matches(EMAIL_REGEX),
});

export const sendEmail = async ({ email, name, message }: Email) => {
  const msg = {
    to: process.env.EMAIL,
    from: process.env.EMAIL as string,
    name,
    subject: email,
    text: message,
  };

  await sgMail.send(msg);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, message, email } = req.body;

    await schema.validate({ name, message, email });

    await sendEmail({ name, message, email });

    return res.status(200).json({ message: "Email has been sent!" });
  } catch (e) {
    console.log(e);

    return res.status(400).json({ message: e ?? "Bad request!" });
  }
}
