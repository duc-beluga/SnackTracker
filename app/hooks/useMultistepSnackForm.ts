import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { getSnackNameLocationForm } from "@/utils/zod/forms/SnackNameLocationForm";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import {
  createSnack,
  addSnackLocation,
} from "@/app/server-actions/snacks/actions";
import { catchError } from "@/utils/exceptionHandler";
import { SnackDisplay, ItemCategory } from "@/app/interfaces/SnackInterfaces";
import { useSnackNames } from "./useSnackNames";

export function useNewSnackForm() {
  //#region { State }

  const [isNewSnack, setIsNewSnack] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SnackDisplay[]>([]);
  const [selectedSnack, setSelectedSnack] = useState<SnackDisplay | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  //#endregion

  //#region { Dependencies }

  const nameLocationImageForm = getSnackNameLocationForm();
  const { handleSubmit, control, reset, setValue, watch } =
    nameLocationImageForm;
  const snacks = useSnackNames();

  //#endregion

  //#region { Search functionality }

  useEffect(() => {
    if (searchQuery.trim() && snacks) {
      const selectedCategory = watch("category");
      if (selectedCategory) {
        const filtered = snacks.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            item.category === selectedCategory
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, snacks, watch]);

  //#endregion

  //#region { Event handler }

  const onNameLocationImageSubmit = async (
    values: z.infer<typeof SnackNameLocationSchemaType>
  ) => {
    setIsLoading(true);

    try {
      if (selectedSnack) {
        // Adding location to existing snack
        const locationData: z.infer<typeof SnackLocationSchemaType> = {
          snackId: selectedSnack.snack_id,
          location: values.location,
          image: values.image,
          aisle: values.aisle,
        };

        const [error] = await catchError(addSnackLocation(locationData));
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Location added successfully!");
      } else {
        // Creating new snack - validate brand is provided
        if (!values.brand || values.brand.trim() === "") {
          toast.error("Brand is required for new snacks");
          return;
        }

        const [error] = await catchError(createSnack(values));
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Snack created successfully!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }

    reset();
  };

  const handleSnackSelect = (snack: SnackDisplay) => {
    setSelectedSnack(snack);
    setValue("name", snack.name);
    setValue("selectedSnackId", snack.snack_id);
    setValue("brand", ""); // Clear brand field for existing snacks
    setIsNewSnack(false);
    setShowSuggestions(false);
    setSearchQuery(snack.name);
    setStep(2); // Automatically advance to step 2
  };

  const handleCreateNew = () => {
    setSelectedSnack(null);
    setValue("selectedSnackId", undefined);
    setIsNewSnack(true);
    setShowSuggestions(false);
    setStep(2); // Automatically advance to step 2
  };

  const resetSearchState = () => {
    setSearchQuery("");
    setSuggestions([]);
    setSelectedSnack(null);
    setShowSuggestions(false);
    setIsNewSnack(false);
    setStep(1);
  };

  //#endregion

  return {
    snack: {
      isNewSnack,
      setIsNewSnack,
      selectedSnack,
      setSelectedSnack,
    },
    search: {
      searchQuery,
      setSearchQuery,
      suggestions,
      setSuggestions,
      showSuggestions,
      setShowSuggestions,
      handleSnackSelect,
      handleCreateNew,
      resetSearchState,
    },
    form: {
      control,
      nameLocationImageForm,
      onNameLocationImageSubmit,
      handleSubmit,
      isLoading,
      setValue,
      watch,
    },
    step: {
      step,
      setStep,
    },
  };
}

export type MultipleStepSnackFormState = ReturnType<typeof useNewSnackForm>;
