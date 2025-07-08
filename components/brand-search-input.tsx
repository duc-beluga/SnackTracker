"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui";
import { SnackBrand } from "@/app/interfaces/SnackInterfaces";
import { useFilteredByName } from "@/app/hooks/useFilteredSnackNames";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useSnackBrands } from "@/app/hooks/useSnackBrands";

interface BrandSearchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
}

export function BrandSearchInput<
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>,
>({ field }: BrandSearchInputProps<TFieldValue, TName>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(true);

  const brands = useSnackBrands();
  const debouncedQuery = useDebounce(field.value, 300);

  const predictions = useFilteredByName<SnackBrand>(
    brands,
    debouncedQuery ?? "",
    undefined
  );

  const handleInputChange = useCallback(
    (value: string) => {
      field.onChange(value);
      setIsSelected(false);
    },
    [field]
  );

  useEffect(() => {
    if (!isSelected) {
      setIsLoading(true);
    }
  }, [field.value]);

  useEffect(() => {
    setIsLoading(false);
  }, [debouncedQuery]);

  const hasResults = predictions.length > 0;
  const groupHeading = !hasResults || isSelected ? "" : "Existing brands...";

  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Search existing brands..."
        value={field.value || ""}
        onValueChange={handleInputChange}
      />

      <CommandList>
        <CommandGroup heading={groupHeading}>
          {isLoading ? (
            <CommandItem>Searching...</CommandItem>
          ) : !isSelected ? (
            predictions.map((prediction) => (
              <CommandItem
                key={prediction.brand_id}
                onSelect={(val: string) => {
                  field.onChange(val);
                  setIsSelected(true);
                }}
              >
                {prediction.name}
              </CommandItem>
            ))
          ) : (
            <></>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
