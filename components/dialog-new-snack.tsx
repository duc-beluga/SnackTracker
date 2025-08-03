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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { z } from "zod";
import { handleValidationError } from "@/utils/exceptionHandler";
import { AisleFormField } from "./aisle-form-field";
import { SnackBrandFormField } from "./snack-brand-form-field";
import { ItemCategory } from "@/app/interfaces/SnackInterfaces";

export function DialogNewSnack() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>(
    ItemCategory.Snack
  );

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
    snack: { isNewSnack },
    form: {
      control,
      nameLocationImageForm,
      handleSubmit,
      isLoading,
      onNameLocationImageSubmit,
    },
  } = createSnackFormState;

  const handleValidSubmit = async (
    values: z.infer<typeof SnackNameLocationSchemaType>
  ) => {
    // Include the selected category in the submission
    const submitValues = { ...values, category: selectedCategory };
    await onNameLocationImageSubmit(submitValues);
    handleModalClose();
  };

  return (
    <Dialog open={open} onOpenChange={onDialogOpenChange}>
      <DialogContent className="w-11/12 md:w-1/2">
        <DialogHeader>
          <DialogTitle>
            Add new{" "}
            <Select
              value={selectedCategory}
              onValueChange={(value) =>
                setSelectedCategory(value as ItemCategory)
              }
            >
              <SelectTrigger className="inline-flex w-auto h-auto p-0 border-0 bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 font-bold text-blue-400 hover:text-blue-600 text-base px-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start" sideOffset={4}>
                <SelectItem value={ItemCategory.Snack}>snack</SelectItem>
                <SelectItem value={ItemCategory.Drink}>drink</SelectItem>
              </SelectContent>
            </Select>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form {...nameLocationImageForm}>
          <form
            onSubmit={handleSubmit(handleValidSubmit, handleValidationError)}
            className="grid gap-y-4"
            id="new-snack-form"
          >
            {step === 1 && (
              <>
                <SnackNameFormField newSnackFormState={createSnackFormState} />
                <SnackBrandFormField newSnackFormState={createSnackFormState} />
              </>
            )}
            {step === 2 && (
              <>
                <SnackLocationFormField control={control} />
                <AisleFormField control={control} />
                <SnackImageFormField control={control} />
              </>
            )}
          </form>
        </Form>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1}
            >
              Previous
            </Button>

            {step < 2 ? (
              <Button
                key="next-button"
                type="button"
                onClick={() => setStep((s) => s + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                key="submit-button"
                type="submit"
                form="new-snack-form"
                disabled={isLoading}
              >
                {isLoading ? "Submitting…" : "Submit"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
