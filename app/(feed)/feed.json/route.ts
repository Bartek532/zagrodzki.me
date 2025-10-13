import { getFeed } from "../utils";

export function GET() {
  const feed = getFeed();

  const json = feed.json1();

  return new Response(json, {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=300",
    },
  });
}
