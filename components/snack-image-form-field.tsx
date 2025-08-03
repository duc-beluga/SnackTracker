import React from "react";
import {
  Input,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui";
import { Control, Path } from "react-hook-form";
import { optimizeImage } from "@/lib/image-client";
import { catchError } from "@/utils/exceptionHandler";
import { toast } from "sonner";

type SnackImageFormFieldProps<T extends { image: File | Blob }> = {
  control: Control<T>;
};

export function SnackImageFormField<T extends { image: File | Blob }>({
  control,
}: SnackImageFormFieldProps<T>) {
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
      name={"image" as Path<T>}
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
