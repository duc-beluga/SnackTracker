import { z } from "zod";

export const SnackLocationSchemaType = z.object({
  snackId: z.number(),
  snackLocation: z.object({
    address: z.string(),
    place_id: z.string(),
  }),
  snackImage: z.instanceof(File),
});