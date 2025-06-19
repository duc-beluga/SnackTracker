import React from "react";
import { FormControl, FormField, FormItem, FormLabel, Input } from "./ui";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { Control } from "react-hook-form";
import z from "zod";

type AisleFormFieldProps = {
  control: Control<z.infer<typeof SnackNameLocationSchemaType>>;
};

export function AisleFormField({ control }: AisleFormFieldProps) {
  return (
    <FormField
      control={control}
      name="aisle"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Aisle</FormLabel>
          <FormControl>
            <Input type="text" {...field} placeholder="Optional" />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
