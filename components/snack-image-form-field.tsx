import React from "react";
import {
  Input,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui";
import { Control } from "react-hook-form";
import { z } from "zod";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";

interface SnackImageFormFieldProps {
  control: Control<z.infer<typeof SnackNameLocationSchemaType>>;
}

const SnackImageFormField = ({ control }: SnackImageFormFieldProps) => {
  return (
    <FormField
      control={control}
      name="snackImage"
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>Upload image</FormLabel>
          <FormControl>
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file);
              }}
              {...fieldProps}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default SnackImageFormField;
