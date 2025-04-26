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

export function useNewSnackForm() {
  //#region { State }

  const [step, setStep] = useState<number>(0);
  const [isNewSnack, setIsNewSnack] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedSnackId, setSelectedSnackId] = useState<number>(0);

  //#endregion

  //#region { Dependencies }

  const nameLocationImageForm = getSnackNameLocationForm();
  const { handleSubmit, control, reset } = nameLocationImageForm;

  //#endregion

  //#region { Event handler }

  const onNameLocationImageSubmit = async (
    values: z.infer<typeof SnackNameLocationSchemaType>
  ) => {
    if (isNewSnack) {
      await createSnack(values);
    } else {
      const snackLocationImage: z.infer<typeof SnackLocationSchemaType> = {
        snackId: selectedSnackId,
        snackLocation: values.snackLocation,
        snackImage: values.snackImage,
      };
      await addSnackLocation(snackLocationImage);
    }

    // Reset the form and step count after successful submission
    setStep(0);
    reset();
    toast.success("Form successfully submitted");
  };

  function handleSnackNameLocationImageSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    handleSubmit(onNameLocationImageSubmit)(event);
  }

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
      handleSnackNameLocationImageSubmit,
    },
  };
}

export type MultipleStepSnackFormState = ReturnType<typeof useNewSnackForm>;
