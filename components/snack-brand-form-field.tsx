import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui";
import { PackagePlus } from "lucide-react";
import { SnackSearchInput } from "./snack-search-input";
import { z } from "zod";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { useNewSnackForm } from "@/app/hooks/useMultistepSnackForm";
import { BrandSearchInput } from "./brand-search-input";

interface SnackBrandFormFieldProps {
  newSnackFormState: ReturnType<typeof useNewSnackForm>;
}

export function SnackBrandFormField({
  newSnackFormState,
}: SnackBrandFormFieldProps) {
  const {
    form: { control },
  } = newSnackFormState;

  return (
    <FormField
      control={control}
      name="brand"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="flex justify-between">
              <span>Brand</span>
            </div>
          </FormLabel>
          <FormControl>
            <BrandSearchInput<
              z.infer<typeof SnackNameLocationSchemaType>,
              "brand"
            >
              field={field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
