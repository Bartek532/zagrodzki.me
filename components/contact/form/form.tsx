"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { sendMail } from "@/components/contact/form/api/contact";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils";

import { messageSchema, messageTypes } from "./schema";

import type { z } from "zod";

type FormStatus = "pending" | "loading" | "fullfilled" | "rejected";

interface ContactFormProps {
  onSent: () => void;
}

export const ContactForm = memo<ContactFormProps>(({ onSent }) => {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      type: messageTypes[0].value,
    },
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("pending");

  const onSubmit = form.handleSubmit(async (message) => {
    setFormStatus("loading");
    try {
      await sendMail(message);
      setFormStatus("fullfilled");
    } catch {
      setFormStatus("rejected");
    }
  });

  useEffect(() => {
    if (formStatus === "fullfilled") {
      onSent();
    }
  }, [formStatus, onSent]);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="jane@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hi there! I wanted to reach out to you about..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => {
            const selectedType = messageTypes.find((option) => option.value === field.value);

            return (
              <FormItem className="min-w-0">
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue asChild>
                        {selectedType ? (
                          <div className="flex items-center gap-1 truncate">
                            <p>{selectedType.label}</p>
                            <p className="truncate text-xs text-muted-foreground">
                              {selectedType.subtitle}
                            </p>
                          </div>
                        ) : (
                          <p>What do you want to talk about?</p>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {messageTypes.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="text-left">
                          <div>{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.subtitle}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          type="submit"
          disabled={formStatus !== "pending"}
          className={cn("h-10 w-full py-2.5", {
            "bg-success text-success-foreground disabled:opacity-100": formStatus === "fullfilled",
            "bg-destructive text-destructive-foreground disabled:opacity-100":
              formStatus === "rejected",
          })}
        >
          {formStatus === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : formStatus === "fullfilled" ? (
            "Thanks for your message!"
          ) : formStatus === "rejected" ? (
            "Oops, maybe try again later?"
          ) : (
            "Send!"
          )}
        </Button>
      </form>
    </Form>
  );
});

ContactForm.displayName = "ContactForm";
