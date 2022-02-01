import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { Input } from "components/common/input/Input";
import { LoaderRing } from "components/common/loader/LoaderRing";
import { fetcher } from "utils/fetcher";
import { EMAIL_REGEX } from "utils/consts";

import styles from "./contactForm.module.scss";

type PromiseStatus = "pending" | "loading" | "fullfilled" | "rejected";

export const ContactForm = ({ handleIsSent }: { handleIsSent: (val: boolean) => void }) => {
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

  useEffect(() => {
    handleIsSent(promiseStatus === "fullfilled");
  }, [promiseStatus]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} noValidate>
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
  );
};
