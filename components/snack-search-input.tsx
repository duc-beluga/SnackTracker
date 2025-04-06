"use client";

// React and external libraries
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";

// Type imports
// (None in this set)

// Utility functions
// (None in this set)

// UI Components - shadcn
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

// Custom components
// (None in this set)

interface SnackType {
  name: string;
  snack_id: number;
}

interface SnackSearchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  setIsNewSnack: Dispatch<SetStateAction<boolean>>;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
  setSnackSelected: Dispatch<SetStateAction<number>>;
  isTyping: boolean;
}

const SnackSearchInput = <
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>,
>({
  field,
  setIsNewSnack,
  setIsTyping,
  setSnackSelected,
  isTyping,
}: SnackSearchInputProps<TFieldValue, TName>) => {
  const [predictions, setPredictions] = useState<SnackType[]>([]);
  const [snacks, setSnacks] = useState<SnackType[] | null>([]);

  useEffect(() => {
    async function fetchSnacks() {
      const supabase = createClient();
      const { data } = await supabase.from("snacks").select("name, snack_id");

      if (data) {
        const snackNamesList = data.map((item) => ({
          name: item.name,
          snack_id: item.snack_id,
        }));
        setSnacks(snackNamesList);
      }
    }
    fetchSnacks();
  }, []);

  useEffect(() => {
    if (field.value == "") {
      setIsTyping(false);
    }
    const snacksFound =
      snacks
        ?.filter((snack) =>
          snack.name
            .toLowerCase()
            .includes(field.value.toLocaleLowerCase().trim())
        )
        .slice(0, 5) || [];

    setPredictions(snacksFound);
  }, [field.value]);

  useEffect(() => {
    if (predictions.length == 0 && isTyping) {
      setIsNewSnack(true);
    } else {
      setIsNewSnack(false);
    }
  }, [predictions]);

  const handleSnackSelect = (value: SnackType) => {
    field.onChange(value.name);
    setSnackSelected(value.snack_id);
    setIsNewSnack(false);
    setIsTyping(false);
  };

  return (
    <Command>
      <CommandInput
        placeholder="Type a snack..."
        value={field.value}
        onValueChange={(value) => {
          field.onChange(value);
          setIsTyping(true);
        }}
      />
      <CommandList>
        {isTyping && (
          <CommandGroup heading="Existing snacks...">
            {predictions.length > 0 &&
              predictions.map((prediction) => (
                <CommandItem
                  key={prediction.snack_id}
                  onSelect={() => handleSnackSelect(prediction)}
                >
                  {prediction.name}
                </CommandItem>
              ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

export default SnackSearchInput;
