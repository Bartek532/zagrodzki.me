import type { localLikesSchema } from "./schema";
import type { z } from "zod";

export type LocalLikesData = z.infer<typeof localLikesSchema>;
