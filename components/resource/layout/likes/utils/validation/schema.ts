import { z } from "zod";

export const localLikesSchema = z.record(z.string(), z.number());
