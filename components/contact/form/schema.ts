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

export const messageSchema = z.object({
  name: z.string().nonempty("Please provide your name so I know who you are!"),
  email: z.string().email("I'll use your email only to contact you back."),
  message: z.string().nonempty("Message cannot be empty, even if it's just a smile!"),
  type: z.enum(messageTypes.map((type) => type.value) as [string, ...string[]]),
});

export type Message = z.infer<typeof messageSchema>;
