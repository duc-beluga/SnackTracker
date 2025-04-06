import React, { Dispatch, SetStateAction } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { PackagePlus } from "lucide-react";
import SnackSearchInput from "./snack-search-input";
import { z } from "zod";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { Control } from "react-hook-form";

interface SnackNameFormFieldProps {
  isNewSnack: boolean;
  setIsNewSnack: Dispatch<SetStateAction<boolean>>;
  isTyping: boolean;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
  setSelectedSnackId: Dispatch<SetStateAction<number>>;
  control: Control<z.infer<typeof SnackNameLocationSchemaType>>;
}

const SnackNameFormField = ({
  isNewSnack,
  setIsNewSnack,
  isTyping,
  setIsTyping,
  setSelectedSnackId,
  control,
}: SnackNameFormFieldProps) => {
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
