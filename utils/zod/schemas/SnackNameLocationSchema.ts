import { z } from "zod";
import { snackImageSchema, locationSchema } from "./snack/sharedSchema";
import { ItemCategory } from "@/app/interfaces/SnackInterfaces";

export const SnackNameLocationSchemaType = z.object({
  name: z.string().min(1, "Snack name is required"),
  category: z.nativeEnum(ItemCategory, {
    errorMap: () => ({ message: "Category is required" }),
  }),
  brand: z.string().min(1, "Snack brand is required"),
  location: locationSchema,
  image: snackImageSchema,
  aisle: z.string().optional(),
});
