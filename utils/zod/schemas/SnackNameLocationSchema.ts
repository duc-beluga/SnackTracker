import { z } from "zod";
import { snackImageSchema, snackLocationSchema } from "./snack/shared";

export const SnackNameLocationSchemaType = z.object({
  snackName: z.string().min(1, "Snack name is required"),
  snackLocation: snackLocationSchema,
  snackImage: snackImageSchema,
});
