import { z } from "zod";

export const SnackNameLocationSchemaType = z.object({
  snackId: z.number(),
  snackName: z.string(),
  snackLocation: z.object({
    address: z.string(),
    place_id: z.string(),
  }),
  snackImage: z.instanceof(File),
});