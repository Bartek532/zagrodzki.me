"use client";

import Image from "next/image";
import { useState } from "react";

import { Section } from "@/components/common/sections/section";
import InLoveAvatar from "public/img/avatars/in-love.png";
import SurprisedAvatar from "public/img/avatars/surprised.png";

import { ContactForm } from "./form/form";

export const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <Section className="grid divide-y  sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      <div className="p-6 sm:p-8 min-w-0">
        <ContactForm onSent={() => setSent(true)} />
      </div>
      <div className="p-8 bg-dashed flex justify-center items-center">
        <Image src={sent ? InLoveAvatar : SurprisedAvatar} alt="" />
      </div>
    </Section>
  );
};
