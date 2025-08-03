import { z } from "zod";

export const SnackNameSchemaType = z.object({
  name: z.string().min(1, "Snack name is required"),
});
