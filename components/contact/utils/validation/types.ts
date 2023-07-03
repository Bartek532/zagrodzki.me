import { z } from "zod";

import { messageSchema } from "./schema";

export type Message = z.infer<typeof messageSchema>;
