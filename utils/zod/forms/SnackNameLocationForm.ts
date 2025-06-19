import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SnackNameLocationSchemaType } from "../schemas/SnackNameLocationSchema";

export const getSnackNameLocationForm = () =>
  useForm<z.infer<typeof SnackNameLocationSchemaType>>({
    resolver: zodResolver(SnackNameLocationSchemaType),
    defaultValues: {
      snackName: "",
      snackLocation: { address: "", place_id: "0o0000000" },
      aisle: "",
    },
  });
