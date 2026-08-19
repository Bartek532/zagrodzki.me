import { z } from "zod";

export const messageTypes = [
  {
    value: "general",
    label: "General inquiry",
    subtitle: "I have a question, feedback, or just want to say hi.",
  },
  {
    value: "work",
    label: "Work (contract or employment)",
    subtitle: "I want to hire you!",
  },
  {
    value: "advisory",
    label: "Advisory role",
    subtitle: "Would you be interested in joining my board or being an advisor?",
  },
  {
    value: "agency",
    label: "Agency introduction",
    subtitle: "I'm looking for a good design/dev agency.",
  },
  {
    value: "event",
    label: "Event",
    subtitle: "I want to invite you to speak at my event.",
  },
] as const;

const withoutLineBreaks = (value: string) =>
  value
    .replace(/[\r\n]/g, "")
    .replaceAll("\0", "")
    .trim();

export const messageSchema = z.object({
  name: z
    .string()
    .transform(withoutLineBreaks)
    .pipe(
      z
        .string()
        .min(1, "Please provide your name so I know who you are!")
        .max(100, "Name is too long."),
    ),
  email: z
    .string()
    .transform(withoutLineBreaks)
    .pipe(z.email("I'll use your email only to contact you back.").max(254)),
  message: z
    .string()
    .trim()
    .min(1, "Message cannot be empty, even if it's just a smile!")
    .max(5000, "Message is too long."),
  type: z.enum(messageTypes.map((type) => type.value) as [string, ...string[]]),
});

export type Message = z.infer<typeof messageSchema>;
