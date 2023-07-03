import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";

import { Input } from "components/common/input/Input";
import { LoaderRing } from "components/common/loader/LoaderRing";
import { onPromise } from "utils/functions";

import { sendMail } from "../api/contact";
import { messageSchema } from "../utils/validation/schema";
import { Message } from "../utils/validation/types";

import styles from "./contactForm.module.scss";

type FormStatus = "pending" | "loading" | "fullfilled" | "rejected";

interface ContactFormProps {
  onSent: () => void;
}

export const ContactForm = memo<ContactFormProps>(({ onSent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Message>({
    resolver: zodResolver(messageSchema),
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("pending");

  const onSubmit = handleSubmit(async (message) => {
    setFormStatus("loading");
    try {
      await sendMail(message);
      setFormStatus("fullfilled");
    } catch {
      setFormStatus("rejected");
    }
  });

  useEffect(() => {
    formStatus === "fullfilled" && onSent();
  }, [formStatus, onSent]);

  return (
    <form className={styles.form} onSubmit={onPromise(onSubmit)} noValidate>
      <Input type="text" placeholder="name" isError={!!errors.name} {...register("name")}>
        <span className="sr-only">name</span>
      </Input>
      {errors.name?.message && <span className={styles.error}>{errors.name.message}</span>}

      <Input
        type="email"
        placeholder="your@email.com"
        isError={!!errors.email}
        {...register("email")}
      >
        <span className="sr-only">email</span>
      </Input>
      {errors.email?.message && <span className={styles.error}>{errors.email.message}</span>}

      <label htmlFor="message" className="sr-only">
        <span className="sr-only">message</span>
      </label>
      <textarea
        id="message"
        cols={30}
        rows={10}
        placeholder="message"
        className={clsx(styles.message, styles.error && { [styles.error]: !!errors.message })}
        {...register("message")}
      ></textarea>
      {errors.message?.message && <span className={styles.error}>{errors.message.message}</span>}

      <button className={clsx(styles.btn, styles[formStatus])} disabled={formStatus !== "pending"}>
        {formStatus === "loading" ? (
          <div className={styles.loader}>
            <LoaderRing />
          </div>
        ) : formStatus === "fullfilled" ? (
          "Thanks for your message!"
        ) : formStatus === "rejected" ? (
          "Oops, maybe try again later?"
        ) : (
          "Send!"
        )}
      </button>
    </form>
  );
});

ContactForm.displayName = "ContactForm";
