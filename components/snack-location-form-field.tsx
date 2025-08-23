import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui";
import { SnackLocationSearch } from "./snack-location-search";
import { Control } from "react-hook-form";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { z } from "zod";

interface SnackLocationFormFieldProps {
  control: Control<z.infer<typeof SnackNameLocationSchemaType>>;
}

export function SnackLocationFormField({
  control,
}: SnackLocationFormFieldProps) {
  return (
    <FormField
      control={control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <SnackLocationSearch field={field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
