import { getFeed } from "../utils";

export function GET() {
  const feed = getFeed();

  const xml = feed.rss2();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=300",
    },
  });
}
