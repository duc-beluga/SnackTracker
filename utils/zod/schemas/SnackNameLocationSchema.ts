import { z } from "zod";
import { snackImageSchema, locationSchema } from "./snack/sharedSchema";
import { ItemCategory } from "@/app/interfaces/SnackInterfaces";

export const SnackNameLocationSchemaType = z.object({
  name: z.string().min(1, "Snack name is required"),
  category: z.nativeEnum(ItemCategory, {
    errorMap: () => ({ message: "Category is required" }),
  }),
  brand: z.string().optional(), // Optional - will be validated in submission logic
  selectedSnackId: z.number().optional(), // Track if an existing snack is selected
  location: locationSchema,
  image: snackImageSchema,
  aisle: z.string().optional(),
});
