import { unstable_cache as cache } from "next/cache";
import Image from "next/image";

import { ViewAnimation } from "@/providers/view-animation";

const getLatestRead = cache(
  () =>
    Promise.resolve({
      id: 1,
      title: "Deep Work",
      author: "Cal Newport",
      thumbnail:
        "https://oku.ams3.cdn.digitaloceanspaces.com/covers/2022/06/4b800be0b9b04775f4c3d85de4f67959.jpg",
    }),
  ["latest-read"],
  { revalidate: 60 * 60 * 24 },
);

export const LatestRead = async () => {
  const data = await getLatestRead();

  if (!data) return null;

  const { title, author, thumbnail } = data;

  return (
    <ViewAnimation initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="h-full">
      <a
        href="3"
        className="w-full bg-card border h-full group hover:bg-accent transition-colors group rounded-lg relative shadow-tile overflow-hidden block"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="flex items-center h-full justify-between">
          <div className="relative flex h-full  p-6 sm:p-8  flex-col justify-between self-stretch">
            <small className="text-muted-foreground">Recently read 📚 </small>
            <div className="flex flex-col gap-1 mt-16">
              <h2 className="font-bold text-xl truncate tracking-tight sm:text-2xl">{title}</h2>

              <p className="text-muted-foreground text-sm truncate sm:text-base">by {author}</p>
            </div>
          </div>

          <div className="w-2/5 self-stretch relative shrink-0">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </a>
    </ViewAnimation>
  );
};
