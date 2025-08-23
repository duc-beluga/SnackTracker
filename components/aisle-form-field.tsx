import React from "react";
import { FormControl, FormField, FormItem, FormLabel, Input } from "./ui";
import { Control, Path } from "react-hook-form";

type AisleFormFieldProps<T extends { aisle?: string }> = {
  control: Control<T>;
};

export function AisleFormField<T extends { aisle?: string }>({
  control,
}: AisleFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={"aisle" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="text"
              {...field}
              placeholder="e.g. Aisle 5B or Top Shelf"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
