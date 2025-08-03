import { z } from "zod";
import { snackImageSchema, locationSchema } from "./snack/sharedSchema";

export const SnackLocationSchemaType = z.object({
  snackId: z.number().min(1),
  location: locationSchema,
  image: snackImageSchema,
  aisle: z.string().optional(),
});
