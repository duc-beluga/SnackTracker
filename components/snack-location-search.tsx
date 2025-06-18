"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui";
import { autocomplete } from "@/lib/google";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form/dist/types/controller";
import { FieldValues, Path } from "react-hook-form";
import { useDebounce } from "@/app/hooks/useDebounce";

interface SnackLocationSearchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
}

export function SnackLocationSearch<
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>,
>({ field }: SnackLocationSearchProps<TFieldValue, TName>) {
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedAddress = useDebounce(field.value.address, 300);

  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      const googleMapspredictions = await autocomplete(debouncedAddress);
      setPredictions(googleMapspredictions ?? []);
      setIsLoading(false);
    };
    fetchPredictions();
  }, [debouncedAddress]);

  const handleLocationSelect = (prediction: PlaceAutocompleteResult) => {
    field.onChange({
      address: prediction.description,
      place_id: prediction.place_id,
    });
  };

  return (
    <Command shouldFilter={false}>
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
          {isLoading ? (
            <CommandItem>Loading...</CommandItem>
          ) : (
            predictions.map((prediction) => (
              <CommandItem
                key={prediction.place_id}
                onSelect={() => handleLocationSelect(prediction)}
              >
                {prediction.description}
              </CommandItem>
            ))
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
