import Image from "next/image";

import { Section } from "@/components/common/sections/section";
import { ViewAnimation } from "@/providers/view-animation";
import PissedOffAvatar from "public/img/avatars/pissed-off.png";

const NotFoundPage = () => (
  <Section className="flex flex-col items-center justify-center py-16 lg:py-24  px-8">
    <ViewAnimation
      initial={{ opacity: 0, translateY: -8 }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      <Image src={PissedOffAvatar} alt="pissed off memoji" />
    </ViewAnimation>

    <ViewAnimation
      initial={{ opacity: 0, translateY: -8 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      delay={0.2}
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-destructive">404!</h1>
    </ViewAnimation>
    <ViewAnimation
      initial={{ opacity: 0, translateY: -8 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      delay={0.4}
    >
      <p className="text-lg text-muted-foreground mt-4 lg:mt-6 leading-tight text-center">
        The page you are looking for does not exist.
      </p>
    </ViewAnimation>
  </Section>
);

export default NotFoundPage;
