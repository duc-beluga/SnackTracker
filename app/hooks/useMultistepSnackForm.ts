import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { getSnackNameLocationForm } from "@/utils/zod/forms/SnackNameLocationForm";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { createSnack } from "@/app/server-actions/snacks/actions";
import { catchError } from "@/utils/exceptionHandler";

export function useNewSnackForm() {
  //#region { State }

  const [isNewSnack, setIsNewSnack] = useState<boolean>(false);
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

    const [error] = await catchError(createSnack(values));

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    reset();
    toast.success("Form successfully submitted");
  };

  //#endregion

  return {
    snack: {
      isNewSnack,
      setIsNewSnack,
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
