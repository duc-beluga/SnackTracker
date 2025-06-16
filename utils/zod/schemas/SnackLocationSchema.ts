import { z } from "zod";
import { snackImageSchema, snackLocationSchema } from "./snack/shared";

export const SnackLocationSchemaType = z.object({
  snackId: z.number().min(1),
  snackLocation: snackLocationSchema,
  snackImage: snackImageSchema,
});
