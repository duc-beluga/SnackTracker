import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui";
import { PackagePlus } from "lucide-react";
import { SnackSearchInput } from "./snack-search-input";
import { z } from "zod";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { useNewSnackForm } from "@/app/hooks/useMultistepSnackForm";

interface SnackNameFormFieldProps {
  newSnackFormState: ReturnType<typeof useNewSnackForm>;
}

export function SnackNameFormField({
  newSnackFormState,
}: SnackNameFormFieldProps) {
  const {
    snack: { isNewSnack, setIsNewSnack },
    form: { control },
  } = newSnackFormState;

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="flex justify-between">
              <span>Name</span>
              {isNewSnack && (
                <PackagePlus
                  className="mr-2 h-4 w-4 shrink-0 opacity-50"
                  color="#28a745"
                />
              )}
            </div>
          </FormLabel>
          <FormControl>
            <SnackSearchInput<
              z.infer<typeof SnackNameLocationSchemaType>,
              "name"
            >
              field={field}
              isNewSnack={isNewSnack}
              setIsNewSnack={setIsNewSnack}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
