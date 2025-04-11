import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { getSnackNameLocationForm } from "@/utils/zod/forms/SnackNameLocationForm";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import {
  onSnackLocationSubmit,
  onSnackNameLocationSubmit,
} from "@/app/server-actions/snacks/actions";

export function useNewSnackForm() {
  const [step, setStep] = useState<number>(0);
  const [isNewSnack, setIsNewSnack] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedSnackId, setSelectedSnackId] = useState<number>(0);

  const nameLocationImageForm = getSnackNameLocationForm();
  const { handleSubmit, control, reset } = nameLocationImageForm;

  const onNameLocationImageSubmit = async (
    values: z.infer<typeof SnackNameLocationSchemaType>
  ) => {
    if (isNewSnack) {
      await onSnackNameLocationSubmit(values);
    } else {
      const snackLocationImage: z.infer<typeof SnackLocationSchemaType> = {
        snackId: selectedSnackId,
        snackLocation: values.snackLocation,
        snackImage: values.snackImage,
      };
      await onSnackLocationSubmit(snackLocationImage);
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
