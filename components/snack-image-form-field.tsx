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
import { optimizeImage } from "@/lib/image-client";
import { catchError } from "@/utils/exceptionHandler";
import { toast } from "sonner";

interface SnackImageFormFieldProps {
  control: Control<z.infer<typeof SnackNameLocationSchemaType>>;
}

export function SnackImageFormField({ control }: SnackImageFormFieldProps) {
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | Blob) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const [error, optimizedImage] = await catchError(optimizeImage(file));

    if (error || !optimizedImage) {
      toast.error(error?.message || "Image optimization failed.");
      return;
    }

    onChange(optimizedImage);
  };

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
              onChange={(e) => handleImageChange(e, onChange)}
              {...fieldProps}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
