import { z } from "zod";

import { localLikesSchema } from "./schema";

export type LocalLikesData = z.infer<typeof localLikesSchema>;
