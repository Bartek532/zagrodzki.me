"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
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
import { handleError } from "@/utils";

// import { subscribe } from "@/app/actions/subscribe";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export const NewsletterForm = () => {
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema as never),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newsletterSchema>) => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: "Email subscribed", error: null });
        }, 1000);
      });

      if ("error" in response) {
        throw new Error(response.error);
      }

      form.reset();
      toast.success(response.message);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative sm:mt-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john@doe.com"
                  {...field}
                  className="h-auto bg-card rounded-full shadow-tile px-6 py-4 pr-16"
                />
              </FormControl>
              <FormDescription className="py-2 pl-2">
                I promise not to spam you or sell your email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="absolute top-[5px] right-[5px] sm:top-[3px] sm:right-[3px] aspect-square h-auto rounded-full"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </form>
    </Form>
  );
};
