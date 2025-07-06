import { z } from "zod";
import { snackImageSchema, snackLocationSchema } from "./snack/sharedSchema";

export const SnackNameLocationSchemaType = z.object({
  snackName: z.string().min(1, "Snack name is required"),
  brand: z.string(),
  snackLocation: snackLocationSchema,
  snackImage: snackImageSchema,
  aisle: z.string().optional(),
});
