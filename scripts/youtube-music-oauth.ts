import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { OAuthCredentials } from "ytmusic-ts";

import type { YoutubeMusicOAuthToken } from "@/lib/youtube-music/types";

const normalizeToken = (raw: Record<string, unknown>): YoutubeMusicOAuthToken => {
  const expiresIn = Number(raw.expires_in);

  return {
    access_token: String(raw.access_token),
    refresh_token: String(raw.refresh_token),
    scope: String(raw.scope),
    token_type: String(raw.token_type),
    expires_in: expiresIn,
    expires_at: Math.floor(Date.now() / 1000) + expiresIn,
  };
};

const main = async () => {
  const clientId = process.env.YTMUSIC_OAUTH_CLIENT_ID;
  const clientSecret = process.env.YTMUSIC_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Set YTMUSIC_OAUTH_CLIENT_ID and YTMUSIC_OAUTH_CLIENT_SECRET in .env.local first.");
    process.exit(1);
  }

  const credentials = new OAuthCredentials(clientId, clientSecret);
  const code = await credentials.getCode();
  const url = `${code.verification_url}?user_code=${code.user_code}`;

  console.log("\nAuthorize YouTube Music access:\n");
  console.log(url);
  console.log(`\nOr enter code: ${code.user_code}\n`);

  const rl = readline.createInterface({ input, output });
  await rl.question("Complete sign-in in your browser, then press Enter… ");
  rl.close();

  const raw = (await credentials.tokenFromCode(code.device_code)) as unknown as Record<
    string,
    unknown
  >;
  const token = normalizeToken(raw);

  console.log("\nAdd this to your .env.local / Vercel (single line):\n");
  console.log(`YTMUSIC_OAUTH_TOKEN=${JSON.stringify(token)}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
