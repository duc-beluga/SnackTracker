import React from "react";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import SnackLocationSearch from "./snack-location-search";
import { UseFormReturn } from "react-hook-form/dist/types/form";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";

interface LocationImageFormProps {
  footerSlot: React.ReactNode;
  headerSlot: React.ReactNode;
  reactHookSnackLocationForm: UseFormReturn<
    {
      snackLocation: {
        address: string;
        place_id: string;
      };
      snackImage: File;
      snackId: number;
    },
    unknown,
    undefined
  >;
  onSnackLocationSubmit: (
    values: z.infer<typeof SnackLocationSchemaType>
  ) => Promise<void>;
}

interface FormVal {
  snackId: number;
  snackLocation: {
    address: string;
    place_id: string;
  };
  snackImage: File;
}

const SnackLocationForm = ({
  footerSlot,
  headerSlot,
  reactHookSnackLocationForm,
  onSnackLocationSubmit,
}: LocationImageFormProps) => {
  return (
    <Form {...reactHookSnackLocationForm}>
      <form
        onSubmit={reactHookSnackLocationForm.handleSubmit(
          onSnackLocationSubmit
        )}
        className="space-y-6"
      >
        {headerSlot}
        <FormField
          control={reactHookSnackLocationForm.control}
          name="snackLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search location</FormLabel>
              <FormControl>
                <SnackLocationSearch<FormVal, "snackLocation"> field={field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={reactHookSnackLocationForm.control}
          name="snackImage"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Upload image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                  }}
                  {...fieldProps}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {footerSlot}
      </form>
    </Form>
  );
};

export default SnackLocationForm;
