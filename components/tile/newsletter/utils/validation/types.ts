import { z } from "zod";

import { subscriberSchema } from "./schema";

export type Subscriber = z.infer<typeof subscriberSchema>;
