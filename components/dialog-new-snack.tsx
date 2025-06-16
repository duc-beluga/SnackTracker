"use client";

// Custom components
import { FormNavigation } from "./form-navigation";
import { SnackNameFormField } from "./snack-name-form-field";

//Custom hooks
import { useNewSnackForm } from "@/app/hooks/useMultistepSnackForm";
import { SnackLocationFormField } from "./snack-location-form-field";
import { SnackImageFormField } from "./snack-image-form-field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { z } from "zod";
import { handleValidationError } from "@/utils/exceptionHandler";

const TOTAL_STEPS = 2;

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
    steps: { currentStep, setCurrentStep },
    snack: { isNewSnack },
    form: {
      control,
      nameLocationImageForm,
      handleSubmit,
      onNameLocationImageSubmit,
    },
  } = createSnackFormState;

  const handleValidSubmit = async (
    values: z.infer<typeof SnackNameLocationSchemaType>
  ) => {
    await onNameLocationImageSubmit(values);
    handleModalClose();
  };

  return (
    <Dialog open={open} onOpenChange={onDialogOpenChange}>
      <DialogContent className="w-2/3 md:w-1/2">
        <DialogHeader>
          <DialogTitle>
            {!isNewSnack && currentStep === 1
              ? "Adding existing snack"
              : "Adding new snack"}
          </DialogTitle>
          <DialogDescription>Step {currentStep + 1}</DialogDescription>
        </DialogHeader>
        <Form {...nameLocationImageForm}>
          <form
            onSubmit={handleSubmit(handleValidSubmit, handleValidationError)}
            className="grid gap-y-4"
          >
            {currentStep === 0 ? (
              <SnackNameFormField
                multipleStepSnackFormState={createSnackFormState}
              />
            ) : (
              <>
                <SnackLocationFormField control={control} />

                <SnackImageFormField control={control} />
              </>
            )}

            <FormNavigation
              totalSteps={TOTAL_STEPS}
              step={currentStep}
              setStep={setCurrentStep}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
