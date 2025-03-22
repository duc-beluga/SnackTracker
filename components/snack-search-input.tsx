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

interface SnackSearchInputProps {
  snackNames: string[] | null;
}

const SnackSearchInput = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [snackSearchVal, setSnackSearchVal] = useState("");
  const [predictions, setPredictions] = useState<string[]>([]);
  const [snackSelected, setSnackSelected] = useState("");
  const [snackNames, setSnackNames] = useState<string[] | null>([]);

  useEffect(() => {
    async function fetchSnacks() {
      const supabase = createClient();
      const { data } = await supabase.from("snacks").select("name");

      // Transform the data from [{name: "snack1"}, {name: "snack2"}] to ["snack1", "snack2"]
      if (data) {
        const snackNamesList = data.map((item) => item.name);
        setSnackNames(snackNamesList);
      }
    }
    fetchSnacks();
  }, []);

  useEffect(() => {
    const snacksFound =
      snackNames
        ?.filter((snackName) =>
          snackName
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
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Existing snacks...">
          {isTyping &&
            predictions.length > 0 &&
            predictions.map((prediction) => (
              <CommandItem
                key={prediction}
                onSelect={() => handleSnackSelect(prediction)}
              >
                {prediction}
              </CommandItem>
            ))}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Not found?">
          {/* Always show this option by setting value to snackSearchVal*/}
          <CommandItem
            value={snackSearchVal}
            onSelect={() => console.log("adding new snacks")}
          >
            <PackagePlus className="mr-2 h-4 w-4" />
            <span>Add New Snack</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default SnackSearchInput;
