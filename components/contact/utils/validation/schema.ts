import { z } from "zod";

export const messageSchema = z.object({
  name: z.string().nonempty("Please provide name, that way I know who you are!"),
  email: z.string().email("I can use your email to contact you back!"),
  message: z.string().nonempty("Message cannot be empty, even if it's just a smile!"),
});
