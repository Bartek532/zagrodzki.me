import { useForm } from "react-hook-form";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";

import { EMAIL_REGEX } from "utils/consts";
import { Input } from "components/common/input/Input";
import { LoaderRing } from "components/common/loader/LoaderRing";
import { fetcher } from "utils/fetcher";

import styles from "./newsletterTile.module.scss";

type PromiseStatus = "pending" | "loading" | "fullfilled" | "rejected";

export const NewsletterTile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [promiseStatus, setPromiseStatus] = useState<PromiseStatus>("pending");

  const handleFormSubmit = async ({ email }: { [key: string]: string }) => {
    setPromiseStatus("loading");
    try {
      await fetcher("/api/newsletter", { method: "POST", body: { email } });
      setPromiseStatus("fullfilled");
    } catch {
      setPromiseStatus("rejected");
    }
  };

  return (
    <div className={styles.tile}>
      <h3 className={styles.title}>Subscribe to get my notes, thoughts and many more via email 📬</h3>
      <div className={styles.avatar}>
        <Image src="/img/avatars/have-an-idea.png" alt="" width="421" height="421" />
      </div>
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Input
          type="email"
          placeholder="your@email.com"
          isError={!!errors.email}
          {...register("email", {
            required: true,
            pattern: EMAIL_REGEX,
          })}
        >
          <span className="sr-only">email</span>
        </Input>

        <button className={clsx(styles.btn, styles[promiseStatus])} disabled={promiseStatus === "fullfilled"}>
          {promiseStatus === "loading" ? (
            <div className={styles.loader}>
              <LoaderRing />
            </div>
          ) : promiseStatus === "fullfilled" ? (
            "Yeah, check your inbox!"
          ) : promiseStatus === "rejected" ? (
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
