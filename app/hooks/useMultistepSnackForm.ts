import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { getSnackNameLocationForm } from "@/utils/zod/forms/SnackNameLocationForm";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import {
  addSnackLocation,
  createSnack,
} from "@/app/server-actions/snacks/actions";
import { catchError } from "@/utils/exceptionHandler";

export function useNewSnackForm() {
  //#region { State }

  const [step, setStep] = useState<number>(0);
  const [isNewSnack, setIsNewSnack] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedSnackId, setSelectedSnackId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //#endregion

  //#region { Dependencies }

  const nameLocationImageForm = getSnackNameLocationForm();
  const { handleSubmit, control, reset } = nameLocationImageForm;

  //#endregion

  //#region { Event handler }

  const onNameLocationImageSubmit = async (
    values: z.infer<typeof SnackNameLocationSchemaType>
  ) => {
    setIsLoading(true);

    let error: Error | undefined = undefined;

    if (isNewSnack) {
      [error] = await catchError(createSnack(values));
    } else {
      const snackLocationImage: z.infer<typeof SnackLocationSchemaType> = {
        snackId: selectedSnackId,
        snackLocation: values.snackLocation,
        snackImage: values.snackImage,
      };
      [error] = await catchError(addSnackLocation(snackLocationImage));
    }

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setStep(0);
    reset();
    toast.success("Form successfully submitted");
  };

  //#endregion

  return {
    steps: {
      currentStep: step,
      setCurrentStep: setStep,
    },
    snack: {
      isNewSnack,
      setIsNewSnack,
      // selectedSnackId,
      setSelectedSnackId,
    },
    typing: {
      isTyping,
      setIsTyping,
    },
    form: {
      control,
      nameLocationImageForm,
      onNameLocationImageSubmit,
      handleSubmit,
      isLoading,
    },
  };
}

export type MultipleStepSnackFormState = ReturnType<typeof useNewSnackForm>;
