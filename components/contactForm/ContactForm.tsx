import styles from "./contactForm.module.scss";
import { Input } from "components/input/Input";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoaderRing } from "components/loader/LoaderRing";
import { fetcher } from "utils/fetcher";
import { EMAIL_REGEX } from "utils/consts";
import Image from "next/image";

type PromiseStatus = "pending" | "loading" | "fullfilled" | "rejected";

export const ContactForm = ({ isFullPage = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [promiseStatus, setPromiseStatus] = useState<PromiseStatus>("pending");

  const handleFormSubmit = async ({ name, email, message }: { [key: string]: string }) => {
    setPromiseStatus("loading");
    try {
      await fetcher("/api/contact", { method: "POST", body: { name, email, message } });
      setPromiseStatus("fullfilled");
    } catch {
      setPromiseStatus("rejected");
    }
  };

  return (
    <section className={styles.wrapper}>
      <form
        className={clsx(styles.form, { [styles.box]: isFullPage })}
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <Input
          type="text"
          placeholder="name"
          isError={!!errors.name}
          {...register("name", {
            required: true,
          })}
        >
          <span className="sr-only">name</span>
        </Input>
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

        <label htmlFor="message" className="sr-only">
          <span className="sr-only">message</span>
        </label>
        <textarea
          id="message"
          cols={30}
          rows={10}
          placeholder="message"
          className={clsx(styles.message, { [styles.error]: !!errors.message })}
          {...register("message", {
            required: true,
          })}
        ></textarea>

        <button className={clsx(styles.btn, styles[promiseStatus])} disabled={promiseStatus === "fullfilled"}>
          {promiseStatus === "loading" ? (
            <div className={styles.loader}>
              <LoaderRing />
            </div>
          ) : promiseStatus === "fullfilled" ? (
            "Thanks for your message!"
          ) : promiseStatus === "rejected" ? (
            "Oops, maybe try again later?"
          ) : (
            "Send!"
          )}
        </button>
      </form>
      {isFullPage ? (
        <div className={styles.avatar}>
          {promiseStatus === "fullfilled" ? (
            <Image src="/img/avatars/in-love.png" alt="" width="421" height="421" />
          ) : (
            <Image src="/img/avatars/surprised.png" alt="" width="421" height="421" />
          )}
        </div>
      ) : null}
    </section>
  );
};
