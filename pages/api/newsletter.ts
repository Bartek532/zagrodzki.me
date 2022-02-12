import type { NextApiRequest, NextApiResponse } from "next";

import { fetcher } from "utils/fetcher";

export const subscribeToNewsletter = async (email: string) => {
  await fetcher(`https://api.mailerlite.com/api/v2/groups/${process.env.MAILER_LITE_GROUP_ID as string}/subscribers`, {
    method: "POST",
    headers: { "X-MailerLite-ApiKey": process.env.MAILER_LITE_API_KEY as string },
    body: { email },
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await subscribeToNewsletter(req.body.email);

    return res.status(200).json({ message: "Subscribed!" });
  } catch (e) {
    console.log(e);

    return res.status(400).json({ message: "Bad request!" });
  }
}
