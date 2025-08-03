import { z } from "zod";
import { snackImageSchema, locationSchema } from "./snack/sharedSchema";

export const SnackNameLocationSchemaType = z.object({
  name: z.string().min(1, "Snack name is required"),
  brand: z.string().min(1, "Snack brand is required"),
  location: locationSchema,
  image: snackImageSchema,
  aisle: z.string().optional(),
});
