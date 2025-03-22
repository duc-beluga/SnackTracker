import { z } from "zod";

export const SnackNameLocationSchemaType = z.object({
  snackName: z.string().min(1, "Snack name is required"),
  snackLocation: z.object({
    address: z.string().min(1, "Address is required"),
    place_id: z.string().min(1, "Place_id is required"),
  }),
  snackImage: z.instanceof(File, { message: "Image is required" }),
});