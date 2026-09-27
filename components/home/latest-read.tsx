import { unstable_cache as cache } from "next/cache";
import Image from "next/image";

import { LATEST_READ } from "@/data/latest-read";
import { ViewAnimation } from "@/providers/view-animation";

const getLatestRead = cache(
  () => Promise.resolve(LATEST_READ),
  ["latest-read"],
  { revalidate: 60 * 60 * 24 },
);

export const LatestRead = async () => {
  const data = await getLatestRead();

  const { title, author, thumbnail, link } = data;

  return (
    <ViewAnimation initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="h-full">
      <a
        href={link}
        className="group bg-card shadow-tile hover:bg-accent relative block h-full w-full overflow-hidden rounded-lg border transition-colors"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="flex h-full items-center justify-between">
          <div className="relative flex h-full min-w-0 flex-col justify-between self-stretch p-6 sm:p-8">
            <small className="text-muted-foreground">Recently read 📚 </small>
            <div className="mt-16 flex flex-col gap-1">
              <h2 className="text-xl leading-tight font-bold tracking-tight sm:text-2xl">
                {title}
              </h2>

              <p className="text-muted-foreground truncate text-sm sm:text-base">by {author}</p>
            </div>
          </div>

          <div className="relative w-2/5 shrink-0 self-stretch">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </div>
      </a>
    </ViewAnimation>
  );
};
