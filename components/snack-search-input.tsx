"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { createClient } from "@/utils/supabase/client";
import { PackagePlus } from "lucide-react";

interface SnackType {
  name: string;
  snack_id: number;
}

const SnackSearchInput = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [snackSearchVal, setSnackSearchVal] = useState("");
  const [predictions, setPredictions] = useState<SnackType[]>([]);
  const [snackSelected, setSnackSelected] = useState("");
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
    if (snackSearchVal == "") {
      setIsTyping(false);
    }
    const snacksFound =
      snacks
        ?.filter((snack) =>
          snack.name
            .toLowerCase()
            .includes(snackSearchVal.toLocaleLowerCase().trim())
        )
        .slice(0, 5) || [];

    setPredictions(snacksFound);
  }, [snackSearchVal]);

  const handleInputChange = (value: string) => {
    setSnackSearchVal(value);
    setIsTyping(true);
  };

  const handleSnackSelect = (value: string) => {
    setSnackSearchVal(value);
    setSnackSelected(value);
    setIsTyping(false);
  };

  return (
    <Command className="border">
      <CommandInput
        placeholder="Type a snack..."
        value={snackSearchVal}
        onValueChange={handleInputChange}
      />
      <CommandList>
        <CommandGroup heading="Existing snacks...">
          {isTyping &&
            predictions.length > 0 &&
            predictions.map((prediction) => (
              <CommandItem
                key={prediction.snack_id}
                onSelect={() => handleSnackSelect(prediction.name)}
              >
                {prediction.name}
              </CommandItem>
            ))}
        </CommandGroup>

        <CommandSeparator />
        {/* Always show this option by setting value to snackSearchVal*/}
        {isTyping && (
          <CommandGroup heading="Not found?">
            {predictions.length == 0 && (
              <CommandItem
                value={snackSearchVal}
                onSelect={() => console.log("adding new snacks")}
              >
                <PackagePlus className="mr-2 h-4 w-4" />
                <span>Add New Snack</span>
              </CommandItem>
            )}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

export default SnackSearchInput;
