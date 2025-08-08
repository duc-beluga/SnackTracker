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

export function DialogNewSnack() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<number>(1);

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
    await onNameLocationImageSubmit(values);
    handleModalClose();
  };

  return (
    <FormProvider {...nameLocationImageForm}>
      <Dialog open={open} onOpenChange={onDialogOpenChange}>
        <DialogContent className="w-11/12 md:w-1/2">
          <DialogHeader>
            <DialogTitle>
              Add new <CategorySelect />
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
                  <SnackNameFormField
                    newSnackFormState={createSnackFormState}
                  />
                  <SnackBrandFormField
                    newSnackFormState={createSnackFormState}
                  />
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

              {step < 2 && isNewSnack ? (
                <Button
                  key="next-button"
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                >
                  Next
                </Button>
              ) : step == 2 ? (
                <Button
                  key="submit-button"
                  type="submit"
                  form="new-snack-form"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting…" : "Submit"}
                </Button>
              ) : (
                <></>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
