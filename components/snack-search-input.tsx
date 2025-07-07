"use client";

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui";
import { encodeId } from "@/utils/hashids";
import { useSnackNames } from "@/app/hooks/useSnackNames";
import { SnackName } from "@/app/interfaces/SnackInterfaces";
import { useFilteredByName } from "@/app/hooks/useFilteredSnackNames";
import { useDebounce } from "@/app/hooks/useDebounce";

interface SnackSearchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  setIsNewSnack: Dispatch<SetStateAction<boolean>>;
  isNewSnack: boolean;
}

const ADD_NEW_SNACK_ITEM = { name: "Add new snack?", snack_id: 0 } as const;

export function SnackSearchInput<
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>,
>({
  field,
  isNewSnack,
  setIsNewSnack,
}: SnackSearchInputProps<TFieldValue, TName>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(true);

  const snacks = useSnackNames();
  const debouncedQuery = useDebounce(field.value, 300);

  const predictions = useFilteredByName<SnackName>(
    snacks,
    debouncedQuery ?? "",
    ADD_NEW_SNACK_ITEM
  );
  const router = useRouter();

  const handleSnackSelect = useCallback(
    (selectedSnack: SnackName) => {
      setIsSelected(true);

      if (selectedSnack.snack_id === 0) {
        setIsNewSnack(true);
        return;
      }

      router.push(`/snacks/${encodeId(selectedSnack.snack_id)}`);
    },
    [setIsNewSnack, router]
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
  const isAddNewSnackShown = predictions[0]?.snack_id === 0;
  const groupHeading =
    !hasResults || isNewSnack
      ? ""
      : isAddNewSnackShown
        ? "Snack Not Found"
        : "Existing snacks...";

  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Search existing snack..."
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
                key={prediction.snack_id}
                onSelect={() => handleSnackSelect(prediction)}
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
