import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui";
import { PackagePlus } from "lucide-react";
import { SnackSearchInput } from "./snack-search-input";
import { z } from "zod";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { useNewSnackForm } from "@/app/hooks/useMultistepSnackForm";
import { useFormContext, useWatch } from "react-hook-form";

interface SnackNameFormFieldProps {
  newSnackFormState: ReturnType<typeof useNewSnackForm>;
}

export function SnackNameFormField({
  newSnackFormState,
}: SnackNameFormFieldProps) {
  const {
    snack: { isNewSnack, setIsNewSnack },
    search: {
      searchQuery,
      setSearchQuery,
      suggestions,
      showSuggestions,
      handleSnackSelect,
      handleCreateNew,
    },
    form: { control },
  } = newSnackFormState;

  const { watch } = useFormContext();
  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="flex justify-between">
              <span>
                Search for {selectedCategory?.toLowerCase() || "item"} name
              </span>
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
              category={selectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              suggestions={suggestions}
              showSuggestions={showSuggestions}
              onSnackSelect={handleSnackSelect}
              onCreateNew={handleCreateNew}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
