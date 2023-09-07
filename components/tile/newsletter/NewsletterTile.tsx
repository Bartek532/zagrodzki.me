"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "components/common/button/Button";
import { Input } from "components/common/input/Input";
import IngeniousAvatar from "public/img/avatars/have-an-idea.png";
import { FormStatus } from "types";
import { onPromise } from "utils/functions";

import { subscribeToNewsletter } from "./api/mailer";
import styles from "./newsletterTile.module.scss";
import { subscriberSchema } from "./utils/validation/schema";
import { Subscriber } from "./utils/validation/types";

export const NewsletterTile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Subscriber>({
    resolver: zodResolver(subscriberSchema),
  });
  const [status, setStatus] = useState<FormStatus>("pending");

  const onSubmit = handleSubmit(async ({ email }) => {
    setStatus("loading");
    try {
      await subscribeToNewsletter(email);
      setStatus("fullfilled");
    } catch {
      setStatus("rejected");
    }
  });

  return (
    <div className={styles.tile}>
      <h3 className={styles.title}>
        Subscribe to get my notes, thoughts and many more via email 📬
      </h3>
      <div className={styles.avatar}>
        <Image src={IngeniousAvatar} alt="" />
      </div>
      <form className={styles.form} onSubmit={onPromise(onSubmit)} noValidate>
        <Input
          type="email"
          placeholder="your@email.com"
          isError={!!errors.email}
          {...register("email")}
        >
          <span className="sr-only">email</span>
        </Input>

        <Button disabled={status !== "pending"} status={status}>
          {status === "fullfilled"
            ? "Yeah, check your inbox!"
            : status === "rejected"
            ? "Oops, maybe try again later?"
            : "Subscribe!"}
        </Button>
      </form>
    </div>
  );
};

NewsletterTile.displayName = "NewsletterTile";
