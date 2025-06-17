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
  DialogHeader,
  DialogTitle,
  Form,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { z } from "zod";
import { handleValidationError } from "@/utils/exceptionHandler";

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
    <Dialog open={open} onOpenChange={onDialogOpenChange}>
      <DialogContent className="w-11/12 md:w-1/2">
        <DialogHeader>
          <DialogTitle>Adding new snack</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...nameLocationImageForm}>
          <form
            onSubmit={handleSubmit(handleValidSubmit, handleValidationError)}
            className="grid gap-y-4"
          >
            <SnackNameFormField newSnackFormState={createSnackFormState} />
            {isNewSnack && (
              <>
                <SnackLocationFormField control={control} />

                <SnackImageFormField control={control} />

                <Button type="submit" size="sm" className="font-medium">
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
