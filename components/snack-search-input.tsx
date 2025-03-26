"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { createClient } from "@/utils/supabase/client";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

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

  isNewSnack: boolean;
  isTyping: boolean;
}

const SnackSearchInput = <
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>,
>({
  field,
  setIsNewSnack,
  setIsTyping,
  isNewSnack,
  isTyping,
}: SnackSearchInputProps<TFieldValue, TName>) => {
  const [predictions, setPredictions] = useState<SnackType[]>([]);
  const [snacks, setSnacks] = useState<SnackType[] | null>([]);

  useEffect(() => {
    async function fetchSnacks() {
      const supabase = createClient();
      const { data } = await supabase.from("snacks").select("name, snack_id");

      // Transform the data from [{name: "snack1"}, {name: "snack2"}] to ["snack1", "snack2"]
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

  const handleSnackSelect = (value: string) => {
    console.log("all values", field.value);
    field.onChange(value);
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
                  onSelect={() => handleSnackSelect(prediction.name)}
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
