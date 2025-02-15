import { random } from "lodash";
import { unstable_cache as cache } from "next/cache";
import Image from "next/image";

import { Link } from "@/components/common/link/Link";
import { Section } from "@/components/common/sections/section";
import { Prose } from "@/components/ui/prose";
import { getAllResourcesTotalViews } from "@/lib/kv/views";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";
import { SITE_TITLE } from "@/utils/consts";
import { normalizeCount } from "@/utils/functions";
import Me from "public/img/me.webp";

const getViews = cache(getAllResourcesTotalViews, ["total-views"], {
  revalidate: 60 * 60 * 24,
});

export const Content = async () => {
  const views = await getViews();

  return (
    <Section className="grid items-start divide-y lg:grid-cols-2 lg:divide-x lg:divide-y-0">
      <div>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4}
          className={cn("flex h-full flex-col items-start justify-between gap-4 p-6", "sm:p-8")}
        >
          <div className="flex flex-col gap-2">
            <small className="text-muted-foreground">About me</small>
            <Prose className="[&_a]:no-underline">
              <p>
                I&#39;m a 22-year-old software engineer based in Poland. I&#39;m passionate about
                building modern software that enhances the lives of others, as well as my own. My
                blogging journey began by publishing translations on{" "}
                <Link href="https://dev.to/bartek532">dev.to</Link>, and now I&#39;m here with{" "}
                <span className="font-bold">{normalizeCount(views || random(82000, 84000))}</span>{" "}
                post views.
              </p>
              <p>
                My main focus is on the user and their experience. I believe that the best software
                is that which maintains satisfaction and provides a positive impact. I&#39;m always
                open to innovative ideas and solutions, so I think we&#39;ll get along well 😎
              </p>

              <p>
                I&apos;m also an{" "}
                <Link href="https://www.credly.com/badges/2a842ba7-704b-40b4-b08c-474b460e8f04">
                  AWS Certified Solutions Architect
                </Link>
                , with expertise in designing and implementing scalable, highly available, and
                fault-tolerant systems on{" "}
                <Link href="https://aws.amazon.com">Amazon Web Services</Link>. This certification
                has equipped me with deep knowledge of cloud architecture best practices and AWS
                services.
              </p>

              <p>
                After hours, I&apos;m working on{" "}
                <Link href="https://turbostarter.dev">TurboStarter</Link>, a set of starter kits for
                streamlining the development process of web apps, mobile apps, and browser
                extensions. My ambitious goal is to be able to start my next projects in minutes -
                from idea to deployment 🚀
              </p>

              <p>
                Currently, I&apos;m finalizing my Bachelor&apos;s degree in Computer Science at the
                Silesian University of Technology, which I began in 2022. It has given me strong
                foundational knowledge in software engineering, and I&apos;ve met many interesting
                people along the way.
              </p>

              <p>
                In my free time, I enjoy reading and playing chess. Additionally, I have a passion
                for swimming 🏊‍♂️ and love bears 🐻
              </p>
              <p>
                Sound interesting? Feel free to <Link href="/contact">chat with me!</Link>
              </p>
            </Prose>
          </div>
        </ViewAnimation>
      </div>
      <div className="size-full p-8 pb-0">
        <ViewAnimation initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="size-full">
          <div className="sticky top-24">
            <div className="relative">
              <div className="absolute w-[120%] h-1/5 -bottom-10 z-10 left-[-10%] bg-background filter blur-[16px]"></div>
              <Image
                src={Me}
                width="450"
                height="660"
                alt={SITE_TITLE}
                className="drop-shadow-[0_-5px_10px_hsl(var(--connection))] mx-auto rounded-2xl border-b border-background"
              />
            </div>
          </div>
        </ViewAnimation>
      </div>
    </Section>
  );
};
