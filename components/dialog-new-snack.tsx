"use client";

// Custom components
import { SnackNameFormField } from "./snack-name-form-field";

//Custom hooks
import { useNewSnackForm } from "@/app/hooks/useMultistepSnackForm";
import { SnackLocationFormField } from "./snack-location-form-field";
import { SnackImageFormField } from "./snack-image-form-field";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormLabel,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { z } from "zod";
import { handleValidationError } from "@/utils/exceptionHandler";
import { AisleFormField } from "./aisle-form-field";
import { SnackBrandFormField } from "./snack-brand-form-field";
import { FormProvider } from "react-hook-form";
import { CategorySelect } from "./select-category";
import { Check, Package, MapPin, Upload, ArrowLeft } from "lucide-react";

export function DialogNewSnack() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  function onDialogOpenChange(isOpen: boolean) {
    if (!isOpen) {
      handleModalClose();
    } else {
      setOpen(true);
    }
  }

  function handleModalClose() {
    router.back();
    setOpen(false);
  }

  const createSnackFormState = useNewSnackForm();
  const {
    snack: { isNewSnack, selectedSnack },
    search: { resetSearchState },
    step: { step, setStep },
    form: {
      control,
      nameLocationImageForm,
      handleSubmit,
      isLoading,
      onNameLocationImageSubmit,
      watch,
    },
  } = createSnackFormState;

  const selectedCategory = watch("category");

  const handleValidSubmit = async (
    values: z.infer<typeof SnackNameLocationSchemaType>
  ) => {
    await onNameLocationImageSubmit(values);
    resetSearchState();
    handleModalClose();
  };

  const handleBack = () => {
    setStep(1);
    resetSearchState();
  };

  const getStepTitle = () => {
    if (step === 1) return "What are you looking for?";
    return selectedSnack
      ? "Add location"
      : `Add new ${selectedCategory?.toLowerCase() || "item"}`;
  };

  const getStepDescription = () => {
    if (step === 1)
      return "Select a category and search for existing items or create new ones";
    return selectedSnack
      ? "Add a new location for this existing item"
      : "Fill in the details for your new item";
  };

  return (
    <FormProvider {...nameLocationImageForm}>
      <Dialog open={open} onOpenChange={onDialogOpenChange}>
        <DialogContent className="w-11/12 md:w-1/2">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="w-full flex items-center justify-center">
                {getStepTitle()}
              </div>
            </DialogTitle>
            <DialogDescription className="text-center">
              {getStepDescription()}
            </DialogDescription>
          </DialogHeader>

          <Form {...nameLocationImageForm}>
            <form
              onSubmit={handleSubmit(handleValidSubmit, handleValidationError)}
              className="grid gap-y-4"
              id="new-snack-form"
            >
              {step === 1 && (
                <div className="space-y-4">
                  <CategorySelect setStep={setStep} />
                  {selectedCategory && (
                    <SnackNameFormField
                      newSnackFormState={createSnackFormState}
                    />
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {selectedSnack && (
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="font-medium">
                          Selected {selectedCategory?.toLowerCase()}
                        </span>
                      </div>
                      <div className="text-lg font-semibold">
                        {selectedSnack.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedSnack.brand}
                      </div>
                    </div>
                  )}

                  {isNewSnack && (
                    <div className="space-y-3">
                      <div className="p-4 bg-muted/50 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-4 h-4 text-primary" />
                          <span className="font-medium">
                            Creating new {selectedCategory?.toLowerCase()}
                          </span>
                        </div>
                        <div className="text-lg font-semibold">
                          {watch("name")}
                        </div>
                      </div>

                      <SnackBrandFormField
                        newSnackFormState={createSnackFormState}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <FormLabel className="font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Store address *
                    </FormLabel>
                    <SnackLocationFormField control={control} />
                  </div>

                  <div className="space-y-2">
                    <FormLabel className="font-medium">
                      Aisle/Section (optional)
                    </FormLabel>
                    <AisleFormField control={control} />
                  </div>

                  <div className="space-y-2">
                    <FormLabel className="font-medium flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Photo (optional)
                    </FormLabel>
                    <SnackImageFormField control={control} />
                  </div>
                </div>
              )}
            </form>
          </Form>

          <DialogFooter>
            <div className="flex gap-3 w-full">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}

              {step === 2 && (
                <Button
                  type="submit"
                  form="new-snack-form"
                  disabled={
                    isLoading ||
                    !watch("name") ||
                    (isNewSnack && !watch("brand"))
                  }
                  className="flex-1"
                >
                  {isLoading
                    ? "Submitting…"
                    : selectedSnack
                      ? "Add Location"
                      : `Create ${selectedCategory?.toLowerCase() || "Item"}`}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
