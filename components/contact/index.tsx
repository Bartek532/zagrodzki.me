"use client";

import Image from "next/image";
import { useState } from "react";

import { Section } from "@/components/common/sections/section";
import { ViewAnimation } from "@/providers/view-animation";

import InLoveAvatar from "../../public/img/avatars/in-love.png";
import SurprisedAvatar from "../../public/img/avatars/surprised.png";

import { ContactForm } from "./form/form";

export const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <Section className="grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.4}
        className="min-w-0 p-6 sm:p-8"
      >
        <ContactForm onSent={() => setSent(true)} />
      </ViewAnimation>
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.4}
        className="bg-dashed flex items-center justify-center p-8"
      >
        <Image src={sent ? InLoveAvatar : SurprisedAvatar} alt="" />
      </ViewAnimation>
    </Section>
  );
};
