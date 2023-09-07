import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";

import { Button } from "components/common/button/Button";
import { Input } from "components/common/input/Input";
import { FormStatus } from "types";
import { onPromise } from "utils/functions";

import { sendMail } from "../api/contact";
import { messageSchema } from "../utils/validation/schema";
import { Message } from "../utils/validation/types";

import styles from "./contactForm.module.scss";

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
  const [status, setStatus] = useState<FormStatus>("pending");

  const onSubmit = handleSubmit(async (message) => {
    setStatus("loading");
    try {
      await sendMail(message);
      setStatus("fullfilled");
    } catch {
      setStatus("rejected");
    }
  });

  useEffect(() => {
    status === "fullfilled" && onSent();
  }, [status, onSent]);

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

      <Button disabled={status !== "pending"} className={styles.submit} status={status}>
        {status === "fullfilled"
          ? "Thanks for your message!"
          : status === "rejected"
          ? "Oops, maybe try again later?"
          : "Send!"}
      </Button>
    </form>
  );
});

ContactForm.displayName = "ContactForm";
