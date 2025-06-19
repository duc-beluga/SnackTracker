import { z } from "zod";
import { snackImageSchema, snackLocationSchema } from "./snack/sharedSchema";

export const SnackLocationSchemaType = z.object({
  snackId: z.number().min(1),
  snackLocation: snackLocationSchema,
  snackImage: snackImageSchema,
  aisle: z.string().optional(),
});
