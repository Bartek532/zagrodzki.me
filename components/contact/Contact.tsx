"use client";

import Image from "next/image";
import { useState } from "react";

import { ContactForm } from "components/contact/contactForm/ContactForm";
import InLoveAvatar from "public/img/avatars/in-love.png";
import SurprisedAvatar from "public/img/avatars/surprised.png";

import styles from "./contact.module.scss";

export const Contact = () => {
  const [isSent, setIsSent] = useState(false);

  return (
    <section className={styles.wrapper}>
      <ContactForm onSent={() => setIsSent(true)} />
      <div className={styles.avatar}>
        <Image src={isSent ? InLoveAvatar : SurprisedAvatar} alt="" />
      </div>
    </section>
  );
};
