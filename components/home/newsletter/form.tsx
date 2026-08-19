"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { onPromise } from "@/utils/functions";

import { subscribeToNewsletter } from "./api/mailer";

type FormStatus = "pending" | "loading" | "fullfilled" | "rejected";

const newsletterSchema = z.object({
  email: z.email().max(254),
});

export const NewsletterForm = () => {
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("pending");

  const onSubmit = form.handleSubmit(async ({ email }) => {
    setFormStatus("loading");
    try {
      await subscribeToNewsletter(email);
      setFormStatus("fullfilled");
      toast.success("You're subscribed to my newsletter! Now check your inbox 📬");
    } catch {
      setFormStatus("rejected");
      toast.error("Oops, maybe try again later?");
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onPromise(onSubmit)} className="relative sm:mt-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="sr-only">Email</FormLabel>
              <div className="relative w-full">
                <FormControl>
                  <Input
                    placeholder="john@doe.com"
                    {...field}
                    className="bg-card shadow-tile h-auto rounded-full px-6 py-4 pr-16"
                  />
                </FormControl>

                <Button
                  type="submit"
                  className={cn(
                    "absolute inset-y-[5px] right-[5px] aspect-square h-auto rounded-full sm:inset-y-[3px] sm:right-[3px]",
                    formStatus === "fullfilled" &&
                      "bg-success text-success-foreground disabled:opacity-100",
                    formStatus === "rejected" &&
                      "bg-destructive text-destructive-foreground disabled:opacity-100",
                  )}
                  disabled={formStatus !== "pending" || !form.formState.isValid}
                >
                  <span className="sr-only">
                    {formStatus === "loading"
                      ? "Loading..."
                      : formStatus === "fullfilled"
                        ? "Subscribed"
                        : formStatus === "rejected"
                          ? "Error"
                          : "Subscribe"}
                  </span>
                  {formStatus === "loading" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : formStatus === "fullfilled" ? (
                    <Check className="size-4" />
                  ) : formStatus === "rejected" ? (
                    <X className="size-4" />
                  ) : (
                    <ArrowRight className="size-4" />
                  )}
                </Button>
              </div>
              <FormDescription className="py-2 pl-2">
                I promise not to spam you or sell your email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
