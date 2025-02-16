"use client";

import { Section } from "@/components/common/sections/section";
import { ContactForm } from "./form/form";

import SurprisedAvatar from "public/img/avatars/surprised.png";
import InLoveAvatar from "public/img/avatars/in-love.png";
import Image from "next/image";
import { useState } from "react";

export const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <Section className="grid divide-y  sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      <div className="p-6 lg:p-8 min-w-0">
        <ContactForm onSent={() => setSent(true)} />
      </div>
      <div className="p-8 bg-dashed flex justify-center items-center">
        <Image src={sent ? InLoveAvatar : SurprisedAvatar} alt="" />
      </div>
    </Section>
  );
};
