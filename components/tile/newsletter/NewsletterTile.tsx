"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "components/common/input/Input";
import { LoaderRing } from "components/common/loader/LoaderRing";
import IngeniousAvatar from "public/img/avatars/have-an-idea.png";
import { onPromise } from "utils/functions";

import { subscribeToNewsletter } from "./api/mailer";
import styles from "./newsletterTile.module.scss";
import { subscriberSchema } from "./utils/validation/schema";
import { Subscriber } from "./utils/validation/types";

type FormStatus = "pending" | "loading" | "fullfilled" | "rejected";

export const NewsletterTile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Subscriber>({
    resolver: zodResolver(subscriberSchema),
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("pending");

  const onSubmit = handleSubmit(async ({ email }) => {
    setFormStatus("loading");
    try {
      await subscribeToNewsletter(email);
      setFormStatus("fullfilled");
    } catch {
      setFormStatus("rejected");
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

        <button
          className={clsx(styles.btn, styles[formStatus])}
          disabled={formStatus !== "pending"}
        >
          {formStatus === "loading" ? (
            <div className={styles.loader}>
              <LoaderRing />
            </div>
          ) : formStatus === "fullfilled" ? (
            "Yeah, check your inbox!"
          ) : formStatus === "rejected" ? (
            "Oops, maybe try again later?"
          ) : (
            "Subscribe!"
          )}
        </button>
      </form>
    </div>
  );
};

NewsletterTile.displayName = "NewsletterTile";
