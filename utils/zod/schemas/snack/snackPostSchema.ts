import { z } from "zod";
import { snackImageSchema, snackLocationSchema } from "./sharedSchema";

export const snackPostSchema = z.object({
  snackLocation: snackLocationSchema,
  snackImage: snackImageSchema,
  aisle: z.string().optional(),
});
