import { localLikesSchema } from "./schema";

import type { LocalLikesData } from "./types";

export const isLocalLikesData = (data: unknown): data is LocalLikesData =>
  localLikesSchema.safeParse(data).success;
