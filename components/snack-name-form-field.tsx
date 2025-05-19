import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui";
import { PackagePlus } from "lucide-react";
import SnackSearchInput from "./snack-search-input";
import { z } from "zod";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { useNewSnackForm } from "@/app/hooks/useMultistepSnackForm";

interface SnackNameFormFieldProps {
  multipleStepSnackFormState: ReturnType<typeof useNewSnackForm>;
}

const SnackNameFormField = ({
  multipleStepSnackFormState,
}: SnackNameFormFieldProps) => {
  const {
    snack: { isNewSnack, setIsNewSnack, setSelectedSnackId },
    typing: { isTyping, setIsTyping },
    form: { control },
  } = multipleStepSnackFormState;

  return (
    <FormField
      control={control}
      name="snackName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="flex justify-between">
              <span>Snack name</span>
              {isNewSnack && (
                <PackagePlus
                  className="mr-2 h-4 w-4 shrink-0 opacity-50"
                  color="#28a745"
                />
              )}
            </div>
          </FormLabel>
          <FormControl>
            <SnackSearchInput<
              z.infer<typeof SnackNameLocationSchemaType>,
              "snackName"
            >
              field={field}
              setIsNewSnack={setIsNewSnack}
              setIsTyping={setIsTyping}
              setSnackSelected={setSelectedSnackId}
              isTyping={isTyping}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default SnackNameFormField;
