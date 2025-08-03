import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SnackLocationSchemaType } from "../schemas/SnackLocationSchema";
import { z } from "zod";

export const getSnackLocationFormWithDefaultId = (snackId: number) =>
  useForm<z.infer<typeof SnackLocationSchemaType>>({
    resolver: zodResolver(SnackLocationSchemaType),
    defaultValues: {
      snackId: snackId,
      location: { address: "", place_id: "0o0000000" },
      aisle: "",
    },
  });
