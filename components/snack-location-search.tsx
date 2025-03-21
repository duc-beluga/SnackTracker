"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { autocomplete } from "@/lib/google";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form/dist/types/controller";
import { FieldValues, Path } from "react-hook-form";

interface SnackLocationSearchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
}

const SnackLocationSearch = <
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>,
>({
  field,
}: SnackLocationSearchProps<TFieldValue, TName>) => {
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchPredictions = async () => {
      const predictions = await autocomplete(field.value.address);
      setPredictions(predictions ?? []);
    };
    fetchPredictions();
    console.log(field.value.address);
  }, [field.value.address]);

  const handleLocationSelect = (prediction: PlaceAutocompleteResult) => {
    field.onChange({
      address: prediction.description,
      place_id: prediction.place_id,
    });
    console.log(prediction);
    setSelectedLocation(prediction.description);
  };

  return (
    <Command>
      <CommandInput
        placeholder="Type a location or search..."
        value={field.value.address}
        onValueChange={(value) => {
          field.onChange({
            address: value,
            place_id: "",
          });
        }}
      />
      <CommandList>
        <CommandGroup>
          {selectedLocation.length == 0 &&
            predictions.map((prediction) => (
              <CommandItem
                key={prediction.place_id}
                onSelect={() => handleLocationSelect(prediction)}
              >
                {prediction.description}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default SnackLocationSearch;
