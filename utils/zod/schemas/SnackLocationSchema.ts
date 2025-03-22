import { z } from "zod";

export const SnackLocationSchemaType = z.object({
  snackId: z.number().min(1),
  snackLocation: z.object({
    address: z.string().min(1),
    place_id: z.string().min(1),
  }),
  snackImage: z.instanceof(File),
});